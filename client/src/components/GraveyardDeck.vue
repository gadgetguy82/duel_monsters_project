<template lang="html">
  <div class="graveyard-deck-container">
    <p>this is the graveyard deck</p>
  </div>
</template>

<script>
// import {eventBus1, eventBus2} from '@/main.js'
export default {
  name: "graveyard-deck",
  props: ['player']
  data() {
    return {
      cards: []
    }
  },
  mounted() {
    // eventBus1.$on('win-lose-card', card=>this.cards.push(card))
  }
}
</script>

<style lang="css" scoped>
.graveyard-deck-container{
  border-style: solid;
  border-width: 1px;
  width: 100px;
  height: 150px;
}
</style>
