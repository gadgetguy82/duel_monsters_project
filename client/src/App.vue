<template lang="html">
  <div id='app'>
    <nav>
      <router-link :to="{ name: 'home' }"> Home </router-link>
      <router-link :to="{ name: 'battlefield' }"> Battlefield </router-link>
    </nav>
    <router-view id='view' :normalCards="normalMonsterCards"></router-view>
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
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}

a {
  color: #FFFFFF;
}

</style>
