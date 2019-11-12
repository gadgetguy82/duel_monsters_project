<template lang="html">
  <div id="app">
    <nav id="nav-bar">
      <router-link :to="{ name: 'home' }"> HOME </router-link>
      <router-link :to="{ name: 'game-board' }" v-if="gameCards.length > 0"> BOARD </router-link>
      <router-link :to="{ name: 'store' }" v-if="allCards.length > 0"> STORE </router-link>
      <router-link :to="{ name: 'about' }"> ABOUT </router-link>
      <div class="right">
        <router-link :to="{ name: 'develop' }" v-if="allCards.length > 0"> DEVELOPMENT </router-link>
      </div>
    </nav>
    <div class="view">
      <router-view id='view' :allCards="allCards" :gameCards="gameCards" :normalMonsters="normalMonsters" :eventBus="eventBus"></router-view>
    </div>
  </div>
</template>

<script>
import { eventBusInfo } from '@/main.js';
import DBService from '@/services/db_service.js';

export default {
  name: 'app',
  data(){
    return {
      eventBus: eventBusInfo,
      allCards: [],
      gameCards: [],
      normalMonsters: []
    }
  },
  mounted() {
    this.loadAllCards();
    this.loadGameCards();

    this.eventBus.$on("reload-game-cards", () => this.loadGameCards());
  },
  methods: {
    loadAllCards() {
      DBService.getAllCards("cards/")
      .then(cards => {
        this.allCards = cards;
        this.allCards.forEach((card) => {
          this.$set(card, "small_image", '/card_images/small/' + card.id + '.jpg');
          this.$set(card, "large_image", '/card_images/large/' + card.id + '.jpg');
          this.$set(card, "game", false);
          this.$set(card, "hidden", true);
          this.$set(card, "initial", true);
          this.$set(card, "player", "");
          if (card.type.includes("Monster")) {
            delete card._id;
            this.$set(card, "position", "atk");
            this.$set(card, "afterOneChange", false);
            if (card.type.includes("Normal Monster")) {
              this.normalMonsters.push(card);
            }
          }
        });
      });
    },

    loadGameCards() {
      DBService.getAllCards("game_cards/")
      .then(cards => this.gameCards = cards);
    }
  }
}
</script>

<style lang="css" scoped>
#view {
  background-image: url('../public/img/yugioh_god_cards.jpg');
  height: 875px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.nav-bar {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
}

a {
  margin:0;
  padding:0 20px;
  text-decoration: none;
  color: rgb(100, 250, 140);
  font-weight: bold;
}

.right {
  float: right;
}
</style>
