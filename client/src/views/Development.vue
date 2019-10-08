<template lang="html">
  <div id="development">
    <div class="development-container">
      <div class="select-container">
        <select class="card-type" name="cardTypes" v-model="selectedType">
          <option disabled :value="null">Select card type...</option>
          <option v-for="cardType of cardTypes" :value="cardType.array">{{ cardType.type }}</option>
        </select>
        <select class="race-type" name="raceType" v-if="type.isSpell" v-model="selectedRace">
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
          <input class="search" type="text" value="" placeholder="Enter name of card..." v-model="current.searchTerm" v-on:input="current.index = findCurrentCard(current)">
          <img :src="current.source">
          <div class="button-select-container" v-if="current.source">
            <button type="button" class="develop-button" v-on:click="current.index = selectCurrentPrev(current)">&#8592;</button>
            <button type="button" class="develop-button" v-on:click="addToGameDB(current)">Add Card</button>
            <button type="button" class="develop-button" v-on:click="current.index = selectCurrentNext(current)">&#8594;</button>
          </div>
        </div>
        <development-info :type="type" :current="current" :game="game"></development-info>
        <div class="card-container">
          <h2>Cards added to game</h2>
          <input class="search" type="text" value="" placeholder="Enter name of card..." v-model="game.searchTerm" v-on:input="game.index = findCard(game)">
          <img :src="game.source">
          <div class="button-select-container" v-if="game.source">
            <button type="button" class="develop-button" v-on:click="game.index = selectPrev(game)">&#8592;</button>
            <button type="button" class="develop-button" v-on:click="deleteFromGameDB(game)">Remove Card</button>
            <button type="button" class="develop-button" v-on:click="game.index = selectNext(game)">&#8594;</button>
          </div>
        </div>
      </div>
      <div class="button-update-container">
        <game-button :text="'Update first set of cards'" :colour="'brown'" v-on:click.native="updateSetsOfCards(0, 2)"></game-button>
        <game-button :text="'Update second set of cards'" :colour="'brown'" v-on:click.native="updateSetsOfCards(2, 5)"></game-button>
        <game-button :text="'Update third set of cards'" :colour="'brown'" v-on:click.native="updateSetsOfCards(5, 9)"></game-button>
        <game-button :text="'Update fourth set of cards'" :colour="'brown'" v-on:click.native="updateSetsOfCards(9, 13)"></game-button>
        <game-button :text="'Update fifth set of cards'" :colour="'brown'" v-on:click.native="updateSetsOfCards(13, 17)"></game-button>
      </div>
    </div>
  </div>
</template>

<script>
import DevelopmentInfo from '@/components/DevelopmentInfo.vue';
import GameButton from '@/components/GameButton.vue';
import { eventBusInfo } from '@/main.js';
import DBService from '@/services/db_service';
import * as Helpers from '@/services/helpers.js';

export default {
  name: 'development',
  props: ['allCards', 'normalMonsters'],
  components: {
    "development-info": DevelopmentInfo,
    "game-button": GameButton
  },
  computed: {
    selectedType: {
      get() {
        return null;
      },
      set(optionValue) {
        this.type.isSpell = this.cardTypes[this.type.spellIndex].array === optionValue;
        this.setCurrentCard(optionValue);
      }
    },
    selectedRace: {
      get() {
        return null;
      },
      set(optionValue) {
        this.setCurrentCard(this.cardTypes[this.type.spellIndex].array.filter(card => card.race === optionValue));
      }
    }
  },
  data() {
    return {
      cardTypes: [
        {
          name: "normalMonsters",
          array: [],
          type: "Normal Monsters",
          cardTypesList: ["Normal Monster"],
          route: "normal_monsters/",
          altRoute: "game_cards/"
        },
        {
          name: "effectMonsters",
          array: [],
          type: "Effect Monsters",
          cardTypesList: ["Effect Monster", "Flip Effect Monster"],
          route: "effect_monsters/"
        },
        {
          name: "fusionMonsters",
          array: [],
          type: "Fusion Monsters",
          cardTypesList: ["Fusion Monster"],
          route: "fusion_monsters/"
        },
        {
          name: "geminiMonsters",
          array: [],
          type: "Gemini Monsters",
          cardTypesList: ["Gemini Monster"],
          route: "gemini_monsters/"
        },
        {
          name: "linkMonsters",
          array: [],
          type: "Link Monsters",
          cardTypesList: ["Link Monster"],
          route: "link_monsters/"
        },
        {
          name: "pendulumMonsters",
          array: [],
          type: "Pendulum Monsters",
          cardTypesList: ["Pendulum Effect Fusion Monster", "Pendulum Effect Monster", "Pendulum Flip Effect Monster", "Pendulum Normal Monster", "Pendulum Tuner Effect Monster"],
          route: "pendulum_monsters/"
        },
        {
          name: "ritualMonsters",
          array: [],
          type: "Ritual Monsters",
          cardTypesList: ["Ritual Effect Monster", "Ritual Monster"],
          route: "ritual_monsters/"
        },
        {
          name: "spiritMonsters",
          array: [],
          type: "Spirit Monsters",
          cardTypesList: ["Spirit Monster"],
          route: "spirit_monsters/"
        },
        {
          name: "synchroMonsters",
          array: [],
          type: "Synchro Monsters",
          cardTypesList: ["Synchro Monster", "Synchro Pendulum Effect Monster", "Synchro Tuner Monster"],
          route: "synchro_monsters/"
        },
        {
          name: "toonMonsters",
          array: [],
          type: "Toon Monsters",
          cardTypesList: ["Toon Monster"],
          route: "toon_monsters/"
        },
        {
          name: "tunerMonsters",
          array: [],
          type: "Tuner Monsters",
          cardTypesList: ["Tuner Monster", "Normal Tuner Monster"],
          route: "tuner_monsters/"
        },
        {
          name: "unionMonsters",
          array: [],
          type: "Union Monsters",
          cardTypesList: ["Union Effect Monster"],
          route: "union_monsters/"
        },
        {
          name: "xyzMonsters",
          array: [],
          type: "XYZ Monsters",
          cardTypesList: ["XYZ Monster", "XYZ Pendulum Effect Monster"],
          route: "xyz_monsters/"
        },
        {
          name: "tokenCards",
          array: [],
          type: "Tokens",
          cardTypesList: ["Token"],
          route: "token_cards/"
        },
        {
          name: "skillCards",
          array: [],
          type: "Skill Cards",
          cardTypesList: ["Skill Card"],
          route: "skill_cards/"
        },
        {
          name: "spellCards",
          array: [],
          type: "Spell Cards",
          cardTypesList: ["Spell Card"],
          route: "spell_cards/",
          spellTypes: ["Continuous", "Equip", "Field", "Normal", "Quick-Play", "Ritual"]
        },
        {
          name: "trapCards",
          array: [],
          type: "Trap Cards",
          cardTypesList: ["Trap Card"],
          route: "trap_cards/"
        },
      ],

      type: {
        totalCards: this.allCards.length,
        allCount: {},
        allArray: [],
        spellCount: {},
        spellArray: [],
        isSpell: false,
        spellIndex: 15
      },

      current: {
        set: [],
        index: 0,
        subIndex: 0,
        card: {},
        source: "",
        searchTerm: ""
      },

      game: {
        set: [],
        index: 0,
        subIndex: 0,
        card: {},
        source: "",
        searchTerm: ""
      }
    }
  },
  mounted() {
    this.getGameCards();

    this.allCards.forEach(card => {
      delete card._id;
      let index = this.cardTypes.findIndex(type => type.cardTypesList.includes(card.type));
      if (index >= 0) {
        this.cardTypes[index].array.push(card);
      }

      this.type.allCount = Helpers.trackUniqueProperty(this.type.allCount, card.type);
      this.type.allArray = Helpers.objToArray(this.type.allCount);
      if (card.type === "Spell Card") {
        this.type.spellCount = Helpers.trackUniqueProperty(this.type.spellCount, card.race);
      }
      this.type.spellArray = Helpers.objToArray(this.type.spellCount);
    });

    eventBusInfo.$on("card-added", card => {
      this.game.set.push(card);
      this.current.index = this.selectCurrentNext(this.current);
    });
  },
  watch: {
    "current.index"() {
      this.current.card = this.current.set[this.current.index];
      this.current.source = this.current.card ? this.current.card.card_images[0].image_url : "";
    },

    "game.index"() {
      this.game.card = this.game.set[this.game.index];
      this.game.source = this.game.card ? this.game.card.card_images[0].image_url : "";
    }
  },
  methods: {
    setCurrentCard(set) {
      this.current.set = set;
      this.current.index = 0;
      while (this.game.set.some(card => card.id === this.current.set[this.current.index].id)) {
        this.current.index++;
      }
      if (this.current.index === this.current.set.length) {
        this.current.card = {};
        this.current.source = "";
      } else {
        this.current.card = this.current.set[this.current.index];
        this.current.source = this.current.card.card_images[0].image_url;
      }
      this.current.searchTerm = "";
    },

    findCard({set, searchTerm}) {
      return set.findIndex(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    findCurrentCard({set, searchTerm}) {
      return set.findIndex(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()) && !this.game.set.some(gameCard => card.id === gameCard.id));
    },

    findCards(set, searchTerm) {
      return set.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    selectNext({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.game.subIndex = this.game.subIndex === subSet.length - 1 ? 0 : this.game.subIndex + 1;
        const subSetCard = subSet[this.game.subIndex];
        return set.findIndex(card => card === subSetCard);
      } else {
        this.game.subIndex = 0;
        return index = index === set.length - 1 ? 0 : index + 1;
      }
    },

    selectPrev({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.game.subIndex = this.game.subIndex === 0 ? subSet.length - 1 : this.game.subIndex - 1;
        const subSetCard = subSet[this.game.subIndex];
        return set.findIndex(card => card === subSetCard);
      } else {
        this.game.subIndex = 0;
        return index = index === 0 ? set.length - 1 : index - 1;
      }
    },

    selectCurrentNext({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.current.subIndex = this.current.subIndex === subSet.length - 1 ? 0 : this.current.subIndex + 1;
        const subSetCard = subSet[this.current.subIndex];
        index = set.findIndex(card => card === subSetCard);
        if (this.game.set.some(card => card.id === subSetCard.id)) {
          return this.selectCurrentNext({set, index, searchTerm});
        } else {
          return index;
        }
      } else {
        this.current.subIndex = 0;
        index = index === set.length - 1 ? 0 : index + 1;
        if (this.game.set.some(card => card.id === set[index].id)) {
          return this.selectCurrentNext({set, index, searchTerm});
        } else {
          return index;
        }
      }
    },

    selectCurrentPrev({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.current.subIndex = this.current.subIndex === 0 ? subSet.length - 1 : this.current.subIndex - 1;
        const subSetCard = subSet[this.current.subIndex];
        index = set.findIndex(card => card === subSetCard);
        if (this.game.set.some(card => card.id === subSetCard.id)) {
          return this.selectCurrentPrev({set, index, searchTerm});
        } else {
          return index;
        }
      } else {
        this.current.subIndex = 0;
        index = index === 0 ? set.length - 1 : index - 1;
        if (this.game.set.some(card => card.id === set[index].id)) {
          return this.selectCurrentPrev({set, index, searchTerm});
        } else {
          return index;
        }
      }
    },

    addToGameDB({set, index}) {
      const card = set[index];
      DBService.postCard(card, "game_cards")
      .then(res => eventBusInfo.$emit("card-added", res));
    },

    deleteFromGameDB({set, index}) {
      const card = set[index];
      DBService.deleteCard(card._id, "game_cards/");
      this.game.set.splice(this.game.index, 1);
      this.game.index = this.selectPrev(this.game);
      this.game.card = this.game.set[this.game.index];
      this.game.source = this.game.card.card_images[0].image_url;
    },

    getGameCards() {
      DBService.getAllCards("game_cards")
      .then(cards => {
        this.game.set = cards;
        this.game.card = this.game.set[this.game.index];
        this.game.source = this.game.card.card_images[0].image_url;
      });
    },

    updateSetsOfCards(start, end) {
      const subArray = this.cardTypes.slice(start, end);
      subArray.forEach(cardType => this.updateCards(cardType));
      // this.updateCards({cardTypes[0].array, cardTypes[0].altRoute}); // Only use this once to initialise developer db
    },

    updateCards(cardSet) {
      DBService.postCards(cardSet.array, cardSet.route);
    }
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

.card-container {
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  width: 420px;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
  border: 5px solid #000000;
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
