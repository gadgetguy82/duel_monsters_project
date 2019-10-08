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
      <router-view id='view' :allCards="allCards" :gameCards="gameCards" :normalMonsters="normalMonsters"></router-view>
    </div>
  </div>
</template>

<script>
import DBService from '@/services/db_service'

export default {
  name: 'app',
  data(){
    return {
      allCards: [],
      gameCards: [],
      normalMonsters: []
    }
  },
  mounted() {
    DBService.getAllCards("cards/")
    .then(cards => {
      this.allCards = cards;
      this.allCards.forEach((card) => {
        if (card.type.includes("Monster")) {
          delete card._id;
          this.$set(card, "hidden", true);
          this.$set(card, "position", "atk");
          this.$set(card, "initial", true);
          this.$set(card, "player", "");
          this.$set(card, "change", false);
          if (card.type.includes("Normal Monster")) {
            this.normalMonsters.push(card);
          }
        }
      });
    });

    DBService.getAllCards("game_cards/")
    .then(cards => this.gameCards = cards);
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
