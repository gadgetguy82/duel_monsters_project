<template lang="html">
  <div id="development">
    <div class="development-container">
      <div class="button-update-container">
        <game-button :text="'Update first set of cards'" :colour="'brown'" v-on:click.native="updateFirstSetOfCards"></game-button>
        <game-button :text="'Update second set of cards'" :colour="'brown'" v-on:click.native="updateSecondSetOfCards"></game-button>
        <game-button :text="'Update third set of cards'" :colour="'brown'" v-on:click.native="updateThirdSetOfCards"></game-button>
        <game-button :text="'Update fourth set of cards'" :colour="'brown'" v-on:click.native="updateFourthSetOfCards"></game-button>
        <game-button :text="'Update fifth set of cards'" :colour="'brown'" v-on:click.native="updateFifthSetOfCards"></game-button>
      </div>
      <div class="button-type-container">
        <game-button :text="'Effect'" :colour="'orange'" v-on:click.native="setCurrentCard(effectMonsters)"></game-button>
        <game-button :text="'Fusion'" :colour="'violet'" v-on:click.native="setCurrentCard(fusionMonsters)"></game-button>
        <game-button :text="'Gemini'" :colour="'orange'" v-on:click.native="setCurrentCard(geminiMonsters)"></game-button>
        <game-button :text="'Link'" :colour="'dark-blue'" v-on:click.native="setCurrentCard(linkMonsters)"></game-button>
        <game-button :text="'Pendulum'" :colour="'green'" v-on:click.native="setCurrentCard(pendulumMonsters)"></game-button>
        <game-button :text="'Ritual'" :colour="'light-blue'" v-on:click.native="setCurrentCard(ritualMonsters)"></game-button>
        <game-button :text="'Spirit'" :colour="'orange'" v-on:click.native="setCurrentCard(spiritMonsters)"></game-button>
        <game-button :text="'Synchro'" :colour="'white'" v-on:click.native="setCurrentCard(synchroMonsters)"></game-button>
        <game-button :text="'Toon'" :colour="'orange'" v-on:click.native="setCurrentCard(toonMonsters)"></game-button>
        <game-button :text="'Tuner'" :colour="'orange'" v-on:click.native="setCurrentCard(tunerMonsters)"></game-button>
        <game-button :text="'Union'" :colour="'orange'" v-on:click.native="setCurrentCard(unionMonsters)"></game-button>
        <game-button :text="'XYZ'" :colour="'black'" v-on:click.native="setCurrentCard(xyzMonsters)"></game-button>
        <game-button :text="'Token'" :colour="'gray'" v-on:click.native="setCurrentCard(tokenCards)"></game-button>
        <game-button :text="'Skill'" :colour="'light-blue'" v-on:click.native="setCurrentCard(skillCards)"></game-button>
        <game-button :text="'Spell'" :colour="'green'" v-on:click.native="setCurrentCard(spellCards)"></game-button>
        <game-button :text="'Trap'" :colour="'purple'" v-on:click.native="setCurrentCard(trapCards)"></game-button>
      </div>
      <div class="development-card-container" v-if="currentSource !== ''">
        <div class="card-container">
          <h2>Working on current card</h2>
          <input class="search" type="text" value="" placeholder="Enter name of card..." v-model="searchCurrentCardName">
          <img :src="currentSource">
          <div class="button-select-container">
            <button type="button" class="develop-button" v-on:click="currentIndex = selectPrev(currentSet, currentIndex)">&#8592;</button>
            <button type="button" class="develop-button" v-on:click="addToDB(currentSet, currentIndex)">Add Card</button>
            <button type="button" class="develop-button" v-on:click="currentIndex = selectNext(currentSet, currentIndex)">&#8594;</button>
          </div>
        </div>
        <div class="card-info-container">
          <h2>Cards added database info</h2>
          <div class="card-added-container">
            <p>Card count in database for game: {{ devSet.length }}</p>
          </div>
          <h2>Card info of the current card being worked on</h2>
          <div class="current-card-container">
            <p>Description: {{  }}</p>
          </div>
        </div>
        <div class="developed-card-container">
          <h2>Cards added to game</h2>
          <input class="search" type="text" value="" placeholder="Enter name of card..." v-model="searchDevCardName">
          <img :src="devSource">
          <div class="button-select-container">
            <button type="button" class="develop-button" v-on:click="devIndex = selectPrev(devSet, devIndex)">&#8592;</button>
            <button type="button" class="develop-button" v-on:click="deleteFromDB(devSet, devIndex)">Remove Card</button>
            <button type="button" class="develop-button" v-on:click="devIndex = selectNext(devSet, devIndex)">&#8594;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton.vue';
import { eventBusInfo } from '@/main.js';
import DBService from '@/services/db_service';

export default {
  name: 'development',
  props: ['allCards', 'normalMonsters'],
  components: {
    "game-button": GameButton
  },
  data() {
    return {
      totalCards: this.allCards.length,
      effectMonsters: [], // Effect Monster: 3919 - 3919 orange/black
      fusionMonsters: [], // Fusion Monster: 328 - 332 violet/black
      geminiMonsters: [], // Gemini Monster: 43 - 43 orange/black
      linkMonsters: [], // Link Monster: 259 - 259 dark-blue/white
      pendulumMonsters: [], // Pendulum Monster: 251 - 256 green/black
      ritualMonsters: [], // Ritual Monster: 94 - 94 light-blue/black
      spiritMonsters: [], // Spirit Monster: 30 - 30 orange/black
      synchroMonsters: [], // Synchro Monster: 325 - 321 white/black
      toonMonsters: [], // Toon Monster: 15 - 15 orange/black
      tunerMonsters: [], // Tuner Monster: 336 - 336 orange/black
      unionMonsters: [], // Union Effect Monster: 32 - 32 orange/black
      xyzMonsters: [], // XYZ Monster: 395 - 390 black/white
      tokenCards: [], // Token: 107 - 107 gray/black
      skillCards: [], // Skill Card: 37 - 37 light-blue/black
      spellCards: [], // Spell Card: 1872 - 1872 green/white
      trapCards: [], // Trap Card: 1509 - 1509 purple/white

      typeCount: {},
      spellTypeCount: {},
      card: {},

      currentSource: "",
      currentSet: [],
      currentIndex: 0,
      currentCard: {},
      searchCurrentCardName: "",

      devSource: "",
      devSet: [],
      devIndex: 0,
      devCard: {},
      searchDevCardName: ""
    }
  },
  mounted() {
    this.getAddDBCards();

    this.allCards.forEach(card => {
      delete card._id;
      if (card.type === "Effect Monster" || card.type === "Flip Effect Monster") {
        this.effectMonsters.push(card);
      } else if (card.type.includes("Fusion Monster")) {
        this.fusionMonsters.push(card);
      } else if (card.type.includes("Gemini")) {
        this.geminiMonsters.push(card);
      } else if (card.type.includes("Link")) {
        this.linkMonsters.push(card);
      } else if (card.type.includes("Pendulum")) {
        this.pendulumMonsters.push(card);
      } else if (card.type.includes("Ritual")) {
        this.ritualMonsters.push(card);
      } else if (card.type.includes("Spirit")) {
        this.spiritMonsters.push(card);
      } else if (card.type.includes("Synchro")) {
        this.synchroMonsters.push(card);
      } else if (card.type.includes("Toon")) {
        this.toonMonsters.push(card);
      } else if (card.type.includes("Tuner")) {
        this.tunerMonsters.push(card);
      } else if (card.type.includes("Union")) {
        this.unionMonsters.push(card);
      } else if (card.type.includes("XYZ")) {
        this.xyzMonsters.push(card);
      } else if (card.type.includes("Token")) {
        this.tokenCards.push(card);
      } else if (card.type === "Skill Card") {
        this.skillCards.push(card);
      } else if (card.type === "Spell Card") {
        this.spellCards.push(card);
        if (this.spellTypeCount.hasOwnProperty(card.race)) {
          this.spellTypeCount[card.race]++;
        } else {
          this.spellTypeCount[card.race] = 1;
        }
      } else if (card.type === "Trap Card") {
        this.trapCards.push(card);
      }

      if (this.typeCount.hasOwnProperty(card.type)) {
        this.typeCount[card.type]++;
      } else {
        this.typeCount[card.type] = 1;
      }
    });

    eventBusInfo.$on("card-added", card => this.devSet.push(card));

    console.log(this.totalCards);
    console.log(this.typeCount);
    console.log(this.spellTypeCount);
  },
  watch: {
    currentIndex() {
      this.currentCard = this.currentSet[this.currentIndex]
      this.currentSource = this.currentCard.card_images[0].image_url;
    },

    devIndex() {
      this.devCard = this.devSet[this.devIndex]
      this.devSource = this.devCard.card_images[0].image_url;
    }
  },
  methods: {
    setCurrentCard(set) {
      this.currentSet = set;
      this.currentIndex = 0;
      this.currentCard = this.currentSet[this.currentIndex];
      this.currentSource = this.currentCard.card_images[0].image_url;
    },

    selectNext(set, index) {
      return index = index === set.length - 1 ? 0 : index + 1;
    },

    selectPrev(set, index) {
      return index = index === 0 ? set.length - 1 : index - 1;
    },

    addToDB(set, index) {
      this.card = set[index];
      DBService.postCard(this.card, "add_cards")
      .then(res => eventBusInfo.$emit("card-added", res));
    },

    deleteFromDB(set, index) {
      this.card = set[index];
      DBService.deleteCard(this.card._id, "add_cards/");
      this.devSet.splice(this.devIndex, 1);
      this.devIndex = this.selectPrev(this.devSet, this.devIndex);
    },

    getAddDBCards() {
      DBService.getAllCards("add_cards")
      .then(cards => {
        this.devSet = cards;
        this.devCard = this.devSet[this.devIndex];
        this.devSource = this.devCard.card_images[0].image_url;
      });
    },

    updateFirstSetOfCards() {
      this.updateEffectMonsterCards();
      this.updateNormalMonsterCards();
      this.updateAddCards(); // Only use this once to initialise developer db
    },

    updateSecondSetOfCards() {
      this.updateFusionMonsterCards();
      this.updateGeminiMonsterCards();
      this.updateLinkMonsterCards();
    },

    updateThirdSetOfCards() {
      this.updatePendulumMonsterCards();
      this.updateRitualMonsterCards();
      this.updateSpiritMonsterCards();
      this.updateSynchroMonsterCards();
    },

    updateFourthSetOfCards() {
      this.updateToonMonsterCards();
      this.updateTunerMonsterCards();
      this.updateUnionMonsterCards();
      this.updateXyzMonsterCards();
    },

    updateFifthSetOfCards() {
      this.updateTokenCards();
      this.updateSkillCards();
      this.updateSpellCards();
      this.updateTrapCards();
    },

    updateAddCards() {
      DBService.postCards(this.normalMonsters, "add_cards/all");
    },

    updateNormalMonsterCards() {
      DBService.postCards(this.normalMonsters, "normal_monsters/all");
    },

    updateEffectMonsterCards() {
      DBService.postCards(this.effectMonsters, "effect_monsters/all");
    },

    updateFusionMonsterCards() {
      DBService.postCards(this.fusionMonsters, "fusion_monsters/all");
    },

    updateGeminiMonsterCards() {
      DBService.postCards(this.geminiMonsters, "gemini_monsters/all");
    },

    updateLinkMonsterCards() {
      DBService.postCards(this.linkMonsters, "link_monsters/all");
    },

    updatePendulumMonsterCards() {
      DBService.postCards(this.pendulumMonsters, "pendulum_monsters/all");
    },

    updateRitualMonsterCards() {
      DBService.postCards(this.ritualMonsters, "ritual_monsters/all");
    },

    updateSpiritMonsterCards() {
      DBService.postCards(this.spiritMonsters, "spirit_monsters/all");
    },

    updateSynchroMonsterCards() {
      DBService.postCards(this.synchroMonsters, "synchro_monsters/all");
    },

    updateToonMonsterCards() {
      DBService.postCards(this.toonMonsters, "toon_monsters/all");
    },

    updateTunerMonsterCards() {
      DBService.postCards(this.tunerMonsters, "tuner_monsters/all");
    },

    updateUnionMonsterCards() {
      DBService.postCards(this.unionMonsters, "union_monsters/all");
    },

    updateXyzMonsterCards() {
      DBService.postCards(this.xyzMonsters, "xyz_monsters/all");
    },

    updateTokenCards() {
      DBService.postCards(this.tokenCards, "token_cards/all");
    },

    updateSkillCards() {
      DBService.postCards(this.skillCards, "skill_cards/all");
    },

    updateSpellCards() {
      DBService.postCards(this.spellCards, "spell_cards/all");
    },

    updateTrapCards() {
      DBService.postCards(this.trapCards, "trap_cards/all");
    },
  }
}
</script>

<style lang="css" scoped>
.button-update-container {
  display: flex;
  flex-direction: row;
}

.card-container, .developed-card-container {
  display: flex;
  width: 420px;
  flex-direction: column;
  margin: 10px;
}

.card-info-container {
  width: 420px;
  margin: 10px;
}

.card-added-container, .current-card-container {
  background-color: rgba(255, 255, 255, 0.7);
}

.button-select-container, .development-card-container {
  display: flex;
  justify-content: space-evenly;
}

.develop-button {
  border: solid;
  border-width: 1px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 2px 2px;
  background-color: #00FF00;
  color: #000000;
  margin: 5px;
  flex-grow: 1;
  cursor: pointer;
}

h2 {
  background-color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin: 5px 0;
}

.search {
  font-size: 16px;
  margin: 5px 0;
}
</style>
