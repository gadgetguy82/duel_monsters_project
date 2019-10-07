<template lang="html">
  <div id="development">
    <div class="development-container">
      <div class="select-container">
        <select class="card-type" name="cardType" v-model="selectedType">
          <option disabled :value="null">Select card type...</option>
          <option :value="effectMonsters">Effect Monsters</option>
          <option :value="fusionMonsters">Fusion Monsters</option>
          <option :value="geminiMonsters">Gemini Monsters</option>
          <option :value="linkMonsters">Link Monsters</option>
          <option :value="pendulumMonsters">Pendulum Monsters</option>
          <option :value="ritualMonsters">Ritual Monsters</option>
          <option :value="spiritMonsters">Spirit Monsters</option>
          <option :value="synchroMonsters">Synchro Monsters</option>
          <option :value="toonMonsters">Toon Monsters</option>
          <option :value="tunerMonsters">Tuner Monsters</option>
          <option :value="unionMonsters">Union Monsters</option>
          <option :value="xyzMonsters">XYZ Monsters</option>
          <option :value="tokenCards">Tokens</option>
          <option :value="skillCards">Skill Cards</option>
          <option :value="spellCards">Spell Cards</option>
          <option :value="trapCards">Trap Cards</option>
        </select>
        <select class="race-type" name="raceType" v-if="spells" v-model="selectedRace">
          <option disabled value="null">Select spell type...</option>
          <option :value="'Continuous'">Continuous</option>
          <option :value="'Equip'">Equip</option>
          <option :value="'Field'">Field</option>
          <option :value="'Normal'">Normal</option>
          <option :value="'Quick-Play'">Quick-Play</option>
          <option :value="'Ritual'">Ritual</option>
        </select>
      </div>
      <div class="development-card-container">
        <div class="card-container">
          <h2>Working on current card</h2>
          <input class="search" type="text" value="" placeholder="Enter name of card..." v-if="currentSource" v-model="searchCurrentCardName" v-on:input="currentIndex = findCurrentCard(currentSet, searchCurrentCardName)">
          <img :src="currentSource">
          <div class="button-select-container" v-if="currentSource">
            <button type="button" class="develop-button" v-on:click="currentIndex = selectCurrentPrev(currentSet, currentIndex, searchCurrentCardName)">&#8592;</button>
            <button type="button" class="develop-button" v-on:click="addToGameDB(currentSet, currentIndex)">Add Card</button>
            <button type="button" class="develop-button" v-on:click="currentIndex = selectCurrentNext(currentSet, currentIndex, searchCurrentCardName)">&#8594;</button>
          </div>
        </div>
        <div class="card-info-container">
          <h2>Cards added database info</h2>
          <div class="game-info-container">
            <p>Card count of all cards: {{ totalCards }}</p>
            <p>Card count in database for game: {{ gameSet.length }}</p>
            <ul class="type-count">
              <li v-for="pair in typeCountArray">{{ pair[0] }}: {{ pair[1] }}</li>
            </ul>
            <ul class="spell-type-count">
              <li v-for="pair in spellTypeCountArray">{{ pair[0] }}: {{ pair[1] }}</li>
            </ul>
          </div>
          <h2>Card info of the current card being worked on</h2>
          <div class="current-card-container" v-if="currentCard">
            <p>Card count of the current set: {{ currentSet.length }}</p>
            <h4>Description:</h4>
            <p>{{ currentCard.desc }}</p>
          </div>
        </div>
        <div class="card-container">
          <h2>Cards added to game</h2>
          <input class="search" type="text" value="" placeholder="Enter name of card..." v-model="searchGameCardName" v-on:input="gameIndex = findCard(gameSet, searchGameCardName)">
          <img :src="gameSource">
          <div class="button-select-container">
            <button type="button" class="develop-button" v-on:click="gameIndex = selectPrev(gameSet, gameIndex, searchGameCardName)">&#8592;</button>
            <button type="button" class="develop-button" v-on:click="deleteFromGameDB(gameSet, gameIndex)">Remove Card</button>
            <button type="button" class="develop-button" v-on:click="gameIndex = selectNext(gameSet, gameIndex, searchGameCardName)">&#8594;</button>
          </div>
        </div>
      </div>
      <div class="button-update-container">
        <game-button :text="'Update first set of cards'" :colour="'brown'" v-on:click.native="updateFirstSetOfCards"></game-button>
        <game-button :text="'Update second set of cards'" :colour="'brown'" v-on:click.native="updateSecondSetOfCards"></game-button>
        <game-button :text="'Update third set of cards'" :colour="'brown'" v-on:click.native="updateThirdSetOfCards"></game-button>
        <game-button :text="'Update fourth set of cards'" :colour="'brown'" v-on:click.native="updateFourthSetOfCards"></game-button>
        <game-button :text="'Update fifth set of cards'" :colour="'brown'" v-on:click.native="updateFifthSetOfCards"></game-button>
      </div>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton.vue';
import { eventBusInfo } from '@/main.js';
import DBService from '@/services/db_service';
import * as Helpers from '@/services/helpers.js';

export default {
  name: 'development',
  props: ['allCards', 'normalMonsters'],
  computed: {
    selectedType: {
      get() {
        return null;
      },
      set(optionValue) {
        this.spells = this.spellCards === optionValue;
        this.setCurrentCard(optionValue);
      }
    },
    selectedRace: {
      get() {
        return null;
      },
      set(optionValue) {
        this.setCurrentCard(this.spellCards.filter(card => card.race === optionValue));
      }
    }
  },
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
      typeCountArray: [],
      spellTypeCount: {},
      spellTypeCountArray: [],
      spells: false,

      currentSet: [],
      currentIndex: 0,
      currentSubIndex: 0,
      currentCard: {},
      currentSource: "",
      searchCurrentCardName: "",

      gameSet: [],
      gameIndex: 0,
      gameSubIndex: 0,
      gameCard: {},
      gameSource: "",
      searchGameCardName: ""
    }
  },
  mounted() {
    this.getGameCards();

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
      } else if (card.type.includes("Skill Card")) {
        this.skillCards.push(card);
      } else if (card.type.includes("Spell Card")) {
        this.spellCards.push(card);
        this.spellTypeCount = Helpers.trackUniqueProperty(this.spellTypeCount, card.race);
      } else if (card.type.includes("Trap Card")) {
        this.trapCards.push(card);
      }

      this.typeCount = Helpers.trackUniqueProperty(this.typeCount, card.type);
      this.typeCountArray = Helpers.objToArray(this.typeCount);
      this.spellTypeCountArray = Helpers.objToArray(this.spellTypeCount);
    });

    eventBusInfo.$on("card-added", card => {
      this.gameSet.push(card);
      this.currentIndex = this.selectCurrentNext(this.currentSet, this.currentIndex, this.searchCurrentCardName);
    });
  },
  watch: {
    currentIndex() {
      this.currentCard = this.currentSet[this.currentIndex];
      this.currentSource = this.currentCard ? this.currentCard.card_images[0].image_url : "";
    },

    gameIndex() {
      this.gameCard = this.gameSet[this.gameIndex];
      this.gameSource = this.gameCard ? this.gameCard.card_images[0].image_url : "";
    }
  },
  methods: {
    setCurrentCard(set) {
      this.currentSet = set;
      this.currentIndex = 0;
      while (this.gameSet.some(card => card.id === this.currentSet[this.currentIndex].id)) {
        this.currentIndex++;
      }
      if (this.currentIndex === this.currentSet.length) {
        this.currentCard = {};
        this.currentSource = "";
      } else {
        this.currentCard = this.currentSet[this.currentIndex];
        this.currentSource = this.currentCard.card_images[0].image_url;
      }
      this.searchCurrentCardName = "";
    },

    findCard(set, searchTerm) {
      return set.findIndex(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    findCurrentCard(set, searchTerm) {
      return set.findIndex(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()) && !this.gameSet.some(gameCard => card.id === gameCard.id));
    },

    findCards(set, searchTerm) {
      return set.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    selectNext(set, index, searchTerm) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.gameSubIndex = this.gameSubIndex === subSet.length - 1 ? 0 : this.gameSubIndex + 1;
        const subSetCard = subSet[this.gameSubIndex];
        return set.findIndex(card => card === subSetCard);
      } else {
        this.gameSubIndex = 0;
        return index = index === set.length - 1 ? 0 : index + 1;
      }
    },

    selectPrev(set, index, searchTerm) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.gameSubIndex = this.gameSubIndex === 0 ? subSet.length - 1 : this.gameSubIndex - 1;
        const subSetCard = subSet[this.gameSubIndex];
        return set.findIndex(card => card === subSetCard);
      } else {
        this.gameSubIndex = 0;
        return index = index === 0 ? set.length - 1 : index - 1;
      }
    },

    selectCurrentNext(set, index, searchTerm) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.currentSubIndex = this.currentSubIndex === subSet.length - 1 ? 0 : this.currentSubIndex + 1;
        const subSetCard = subSet[this.currentSubIndex];
        index = set.findIndex(card => card === subSetCard);
        if (this.gameSet.some(card => card.id === subSetCard.id)) {
          return this.selectCurrentNext(set, index, searchTerm);
        } else {
          return index;
        }
      } else {
        this.currentSubIndex = 0;
        index = index === set.length - 1 ? 0 : index + 1;
        if (this.gameSet.some(card => card.id === set[index].id)) {
          return this.selectCurrentNext(set, index, searchTerm);
        } else {
          return index;
        }
      }
    },

    selectCurrentPrev(set, index, searchTerm) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.currentSubIndex = this.currentSubIndex === 0 ? subSet.length - 1 : this.currentSubIndex - 1;
        const subSetCard = subSet[this.currentSubIndex];
        index = set.findIndex(card => card === subSetCard);
        if (this.gameSet.some(card => card.id === subSetCard.id)) {
          return this.selectCurrentPrev(set, index, searchTerm);
        } else {
          return index;
        }
      } else {
        this.currentSubIndex = 0;
        index = index === 0 ? set.length - 1 : index - 1;
        if (this.gameSet.some(card => card.id === set[index].id)) {
          return this.selectCurrentPrev(set, index, searchTerm);
        } else {
          return index;
        }
      }
    },

    addToGameDB(set, index) {
      const card = set[index];
      DBService.postCard(card, "game_cards")
      .then(res => eventBusInfo.$emit("card-added", res));
    },

    deleteFromGameDB(set, index) {
      const card = set[index];
      DBService.deleteCard(card._id, "game_cards/");
      this.gameSet.splice(this.gameIndex, 1);
      this.gameIndex = this.selectPrev(this.gameSet, this.gameIndex, this.searchGameCardName);
      this.gameCard = this.gameSet[this.gameIndex];
      this.gameSource = this.gameCard.card_images[0].image_url;
    },

    getGameCards() {
      DBService.getAllCards("game_cards")
      .then(cards => {
        this.gameSet = cards;
        this.gameCard = this.gameSet[this.gameIndex];
        this.gameSource = this.gameCard.card_images[0].image_url;
      });
    },

    updateFirstSetOfCards() {
      this.updateGameCards(); // Only use this once to initialise developer db
      this.updateNormalMonsterCards();
      this.updateEffectMonsterCards();
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

    updateGameCards() {
      DBService.postCards(this.normalMonsters, "game_cards/all");
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
.development-container {
  display: flex;
  flex-direction: column;
}

.button-update-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 5px solid #000000;
  width: 92%;
  transform: translate(60px, 25px);
  background-color: rgba(0, 255, 255, 0.7);
}

.select-container {
  display: flex;
}

.card-type, .race-type {
  font-size: 16px;
  margin: 10px;
  width: 200px;
  transform: translateX(50px);
}

.type-count, .spell-type-count {
  border: 1px solid #000000;
  height: 50px;
  overflow: scroll;
  padding: 5px;
}

.card-container {
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  width: 420px;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
  border: 5px solid #000000;
}

.card-info-container {
  width: 420px;
  margin: 10px;
  padding: 5px;
  border: 5px solid #000000;
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
  text-align: center;
  margin: 5px 0;
}

h4, p {
  margin: 2px;
}

.search {
  font-size: 16px;
  margin: 5px 0;
}
</style>
