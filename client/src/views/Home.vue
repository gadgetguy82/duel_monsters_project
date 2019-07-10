<template lang="html">
  <div id='home'>
    <div id="background">
      <h1>Duel Monsters Card Game</h1>
      <h2>--Rules of Play--</h2>
      <button><router-link :to="{ name: 'battlefield'}"> BEGIN GAME!</router-link></button>
      <p>Select 'update database' for the most current card collection</p>
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

  #background {
    padding: 50px;
    color: #FF8C00;
    text-shadow: 1px 1px 3px black, 0 0 2em black, 0 0 0.2em black;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 2px solid black; */

  }
</style>
