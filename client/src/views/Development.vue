<template lang="html">
  <div id="development">
    <div class="development-container">
      <div class="select-container">
        <select class="card-type" name="cardTypes" v-model="selectedType">
          <option disabled value="null">Select card type...</option>
          <option v-for="cardType of cardTypes" :value="cardType.array">{{ cardType.type }}</option>
        </select>
        <select class="race-type" name="raceType" v-if="type.isSpell" v-model="selectedRace">
          <option disabled value="null">Select spell type...</option>
          <option v-for="spellType of cardTypes[type.spellIndex].spellTypes" :value="spellType">{{ spellType }}</option>
        </select>
      </div>
      <div class="development-card-container">
        <card-display :eventBus="eventBus" :display="current" :gameArray="game.array"></card-display>
        <development-info :eventBus="eventBus" :type="type" :current="current" :game="game"></development-info>
        <card-display :eventBus="eventBus" :display="game" :gameArray="game.array"></card-display>
      </div>
    </div>
  </div>
</template>

<script>
import CardDisplay from '@/components/CardDisplay.vue';
import DevelopmentInfo from '@/components/DevelopmentInfo.vue';
import GameButton from '@/components/GameButton.vue';
import DBService from '@/services/db_service';
import * as Helpers from '@/services/helpers.js';

export default {
  name: 'development',
  props: ['allCards', 'eventBus'],
  components: {
    "card-display": CardDisplay,
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
      initialise: false,
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
        checkTotal: 0,
        allCount: {},
        allArray: [],
        spellCount: {},
        spellArray: [],
        spell: "Spell Card",
        isSpell: false,
        spellIndex: 15
      },

      current: {
        title: "Cards not in game",
        buttonText: "Add Card",
        array: [],
        index: 0,
        subIndex: 0,
        card: {},
        source: "",
        searchTerm: "",
        current: true
      },

      game: {
        title: "Cards in game",
        buttonText: "Remove Card",
        array: [],
        index: 0,
        subIndex: 0,
        card: {},
        source: "",
        searchTerm: "",
        current: false
      }
    }
  },
  mounted() {
    this.getGameCards();
    this.getCardTypes();

    this.type.checkTotal = this.checkSubTotals();

    this.eventBus.$on("add-card", display => {
      this.addToGameDB(display);
    });

    this.eventBus.$on("delete-card", display => {
      this.deleteFromGameDB(display);
    });

    this.eventBus.$on("update-card", card => this.updateCardInGameDB(card));

    this.eventBus.$on("card-added", card => {
      this.game.array.push(card);
      this.eventBus.$emit("select-next-current", this.current);
    });

    this.eventBus.$on("card-deleted", () => {
      this.game.array.splice(this.game.index, 1);
      this.eventBus.$emit("select-prev-game", this.game);
    });
  },
  methods: {
    checkSubTotals() {
      let total = 0;
      this.cardTypes.forEach(cardType => total += cardType.array.length);
      return total;
    },

    setCurrentCard(array) {
      this.current.array = array;
      this.current.index = 0;
      this.current.card = this.current.array[this.current.index];
      this.current.source = this.current.card.card_images[0].image_url;
      this.current.searchTerm = "";
      while (this.game.array.some(card => card.id === this.current.array[this.current.index].id)) {
        this.current.index++;
        if (this.current.index < this.current.array.length) {
          this.current.card = this.current.array[this.current.index];
          this.current.source = this.current.card.card_images[0].image_url;
        } else {
          this.current.card = {};
          this.current.source = "";
          break;
        }
      }
    },

    getGameCards() {
      DBService.getAllCards("game_cards/")
      .then(cards => {
        this.game.array = cards;
        this.game.card = this.game.array[this.game.index];
        this.game.source = this.game.card.card_images[0].image_url;
      });
    },

    getCardType(type) {
      DBService.getAllCards(type.route)
      .then(cards => type.array = cards);
      this.cardTypes.forEach(cardType => {
        if (cardType.name === type.name) {
          cardType = type;
        }
      });
    },

    getCardTypes() {
      this.allCards.forEach(card => {
        delete card._id;
        let index = this.cardTypes.findIndex(type => type.cardTypesList.includes(card.type));
        if (index >= 0) {
          this.cardTypes[index].array.push(card);
        }
        this.type.allCount = Helpers.trackUniqueProperty(this.type.allCount, card.type);
        this.type.allArray = Helpers.objToArray(this.type.allCount);
        if (card.type === this.type.spell) {
          this.type.spellCount = Helpers.trackUniqueProperty(this.type.spellCount, card.race);
        }
        this.type.spellArray = Helpers.objToArray(this.type.spellCount);
      });
    },

    addToGameDB({array, index}) {
      const card = array[index];
      card.game = true;
      DBService.postCard(card, "game_cards/")
      .then(res => this.eventBus.$emit("card-added", res));
    },

    deleteFromGameDB({array, index}) {
      const card = array[index];
      DBService.deleteCard(card._id, "game_cards/")
      .then(res => this.eventBus.$emit("card-deleted", res));
    },

    updateCardInGameDB(card) {
      DBService.updateCard(card, "game_cards/")
      .then(res => this.eventBus.$emit("card-updated", res));
    }
  }
}
</script>

<style lang="css" scoped>
.development-container {
  display: flex;
  flex-direction: column;
}

.select-container {
  display: flex;
}

.development-card-container {
  display: flex;
  justify-content: space-evenly;
}

.card-type, .race-type {
  font-size: 16px;
  margin: 10px;
  width: 200px;
  transform: translateX(50px);
}
</style>
