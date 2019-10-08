<template lang="html">
  <div id="app">
    <nav id="nav-bar">
      <router-link :to="{ name: 'home' }"> HOME </router-link>
      <router-link :to="{ name: 'game-board' }" v-if="normalMonsterCards.length > 0"> BOARD </router-link>
      <router-link :to="{ name: 'store' }"> STORE </router-link>
      <router-link :to="{ name: 'about' }"> ABOUT </router-link>
      <div class="right">
        <router-link :to="{ name: 'develop' }"> DEVELOPMENT </router-link>
      </div>
    </nav>
    <div class="view">
      <router-view id='view' :allCards="allDatabaseCards" :normalMonsters="normalMonsterCards"></router-view>
    </div>
  </div>
</template>

<script>
import DBService from '@/services/db_service'

export default {
  name: 'app',
  data(){
    return {
      allDatabaseCards: [],
      normalMonsterCards: []
    }
  },
  mounted() {
    DBService.getAllCards("cards/")
    .then(cards => {
      this.allDatabaseCards = cards;
      this.allDatabaseCards.forEach((card) => {
        if (card.type.includes("Monster")) {
          delete card._id;
          this.$set(card, "hidden", true);
          this.$set(card, "position", "atk");
          this.$set(card, "initial", true);
          this.$set(card, "player", "");
          this.$set(card, "change", false);
          this.normalMonsterCards.push(card);
        }
      });
    });
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
