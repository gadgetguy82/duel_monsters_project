<template lang="html">
  <div id='home'>
    <button v-on:click='fetchData'>Update Database</button>
    <!-- <button v-on:click='testData'>Test list</button> -->
  </div>
</template>

<script>
import DBService from '@/services/db_service';

export default {
  name: 'home',
  data() {
    return {
      allCards: [],
      testCardList: [
        {
          "name": "A Cat",
          "attack": "400",
          "defense": "600"
        },
        {
          "name": "A Man",
          "attack": "2000",
          "defense": "1800"
        }
      ]
    }
  },
  methods: {
    fetchData() {
      fetch('https://db.ygoprodeck.com/api/v5/cardinfo.php')
      .then(res => res.json()).then(cardData => {
        this.allCards = cardData
        DBService.postCards(this.allCards);
      });
    },
    testData() {
      DBService.postCards(this.testCardList);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
