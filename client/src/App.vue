<template lang="html">
  <div id='app'>
    <nav>
      <router-link :to="{ name: 'home' }"> HOME </router-link>
      <router-link :to="{ name: 'battlefield' }"> BATTLEFIELD </router-link>
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
          this.normalMonsterCards.push(card)
        }
      });
    });
  }
}
</script>

<style lang="css" scoped>

#view {
  background-image: url('../public/img/yugioh_god_cards.jpg');

  /* background-repeat: repeat-y;
   */
  /* height: 600px; */
  background-size: 100%;
  height: 875px;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  background-position: center;
}

a {
  margin:0;
  padding:0 20px;
  text-decoration: none;
  color: rgb(100, 250, 140);
  font-weight: bold;
}

</style>
