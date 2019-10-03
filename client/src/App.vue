<template lang="html">
  <div id='app'>
    <nav>
      <router-link :to="{ name: 'home' }"> HOME </router-link>
      <router-link :to="{ name: 'game-board' }" v-if="normalMonsterCards.length > 0"> BOARD </router-link>
      <router-link :to="{ name: 'store' }"> STORE </router-link>
    </nav>
    <div class="view">
      <router-view id='view' :normalCards="normalMonsterCards"></router-view>
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
    DBService.getAllCards()
    .then(cards => { this.allDatabaseCards = cards
      this.allDatabaseCards.forEach((card) => {
        if (card.type === "Normal Monster") {
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

nav {
  margin: 0;
  padding: 0;
}

a {
  margin:0;
  padding:0 20px;
  text-decoration: none;
  color: rgb(100, 250, 140);
  font-weight: bold;
}
</style>
