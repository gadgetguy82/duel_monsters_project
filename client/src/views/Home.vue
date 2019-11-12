<template lang="html">
  <div id="home">
    <div class="instruction-container">
      <h1>Duel Monsters Card Game</h1>
      <p>Select 'update database' for the most current card collection</p>
      <game-button :text="'Update Database'" :colour="'blue'" v-on:click.native='fetchData'></game-button>
      <h2>--How to Play--</h2>
      <ul>
        <li>Click the update database button above to store a local copy of the cards</li>
        <li>Player one starts first, click on the Start button to begin</li>
        <li>Clicking the button changes the phases during your turn</li>
        <li>In the draw phase player one can start drawing cards from their playing deck</li>
        <li>You can skip the standby phase for now as effects/spells/traps are not in game yet</li>
        <li>In the first main phase you can summon monsters out to the monster zone</li>
        <li>Once summoned you should set each monster to attack/defence</li>
        <li>In the battle phase select one of your attack monsters to attack the opponent</li>
        <li>Starting player cannot attack on his first turn</li>
        <li>In the second main phase you can summon more monsters out to the monster zone</li>
        <li>Click the end phase to end your turn</li>
        <li>Pass play to your opponent</li>
        <li>Play until someone loses. Once a player’s Life Points reach zero, they lose the duel.</li>
        <li>Click begin game below to start a match</li>
      </ul>
      <button v-if="gameCards.length > 0"><router-link :to="{ name: 'game-board'}">Start Game!</router-link></button>
    </div>
    <div class="bottom-container">
      <div class="button-container">
        <div class="add-image-container">
          <label for="start">Start image index</label>
          <input type="number" id="start" min="0" :max="allCards.length - 1" v-model="startIndex">
          <label for="end">End image index</label>
          <input type="number" id="end" min="1" :max="allCards.length" v-model="endIndex">
          <game-button :text="buttonText" :colour="'brown'" v-on:click.native="downloadImages"></game-button>
        </div>
        <div class="add-button-container">
          <div class="checkbox-container">
            <input type="checkbox" id="initialise" v-model="initialise">
            <label for="initialise">Initialise game DB</label>
          </div>
          <game-button :text="'Add first set of cards'" :colour="'brown'" v-on:click.native="addSetsOfCards(0, 2)"></game-button>
          <game-button :text="'Add second set of cards'" :colour="'brown'" v-on:click.native="addSetsOfCards(2, 5)"></game-button>
          <game-button :text="'Add third set of cards'" :colour="'brown'" v-on:click.native="addSetsOfCards(5, 8)"></game-button>
          <game-button :text="'Add fourth set of cards'" :colour="'brown'" v-on:click.native="addSetsOfCards(8, 11)"></game-button>
          <game-button :text="'Add fifth set of cards'" :colour="'brown'" v-on:click.native="addSetsOfCards(11, 14)"></game-button>
          <game-button :text="'Add sixth set of cards'" :colour="'brown'" v-on:click.native="addSetsOfCards(14, 17)"></game-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton.vue';
import DBService from '@/services/db_service';

export default {
  name: 'home',
  props: ['gameCards', 'eventBus'],
  components: {
    "game-button": GameButton
  },
  data() {
    return {
      allCards: [],
      startIndex: 0,
      endIndex: 1,
      buttonText: "Get card images",
      initialise: false
    }
  },
  mounted() {
    this.eventBus.$emit("reload-game-cards");
  },
  methods: {
    fetchData() {
      fetch('https://db.ygoprodeck.com/api/v5/cardinfo.php')
      .then(res => res.json()).then(cardData => {
        this.allCards = cardData;
        DBService.postCards(this.allCards, "cards/");
      });
    },

    downloadImages() {
      DBService.downloadImages({indices: this.startIndex + "/" + this.endIndex}, "cards/");
    },

    getGameCards() {
      DBService.getAllCards("game_cards/")
      .then(cards => {
        this.game.array = cards;
        this.game.card = this.game.array[this.game.index];
        this.game.source = this.game.card.card_images[0].image_url;
      });
    },

    addSetsOfCards(start, end) {
      const subArray = this.cardTypes.slice(start, end);
      subArray.forEach(cardType => {
        DBService.postCards(cardType.array, cardType.route);
      });
      if (this.initialise) {
        this.cardTypes[0].array.forEach(card => card.game = true);
        DBService.postCards(this.cardTypes[0].array, this.cardTypes[0].altRoute);
        this.getGameCards();
        this.initialise = false;
      }
    },
  }
}
</script>

<style lang="css" scoped>
.instruction-container {
  color: #FF8C00;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  background-color: rgba(0, 0, 0, 0.8);
  height: fit-content;
  width: fit-content;
  margin: auto;
  padding: 10px;
}

.bottom-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 20%;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #000000;
  border-radius: 10px;
  width: 90%;
  background-color: rgba(0, 255, 255, 0.7);
}

.add-image-container {
  display: flex;
  padding: 5px;
}

.add-button-container {
  display: flex;
  justify-content: space-evenly;
  padding: 5px;
  width: 100%;
}

p, li {
  margin: 5px;
  font-size: 18px;
  list-style-type: decimal;
}

a {
  text-decoration: none;
  background-color: #FF0000;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

button {
  border: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #FFFFFF;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  box-shadow: 2px 2px #FFFFFF;
  background-color: #FF0000;
  padding-top: 2px;
}
</style>
