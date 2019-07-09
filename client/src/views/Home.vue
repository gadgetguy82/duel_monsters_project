<template lang="html">
  <div id='home'>
    <div id="background">
    <button v-on:click='fetchData'>Update Database</button>
  </div>
  </div>
</template>

<script>
import DBService from '@/services/db_service';

export default {
  name: 'home',
  data() {
    return {
      allCards: []
    }
  },
  methods: {
    fetchData() {
      fetch('https://db.ygoprodeck.com/api/v5/cardinfo.php')
      .then(res => res.json()).then(cardData => {
        this.allCards = cardData;
        DBService.postCards(this.allCards);
      });
    }
  }
}
</script>

<style lang="css" scoped>
#background{
  height: 1000px;
}
</style>
