<template lang="html">
  <div id='home'>
    <button v-on:click='fetchData'>Update Database</button>
  </div>
</template>

<script>
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
      .then(res => res.json()).then(cardData => this.allCards = cardData);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
