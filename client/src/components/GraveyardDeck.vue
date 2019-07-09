<template lang="html">
  <div class="graveyard-deck-container">
    <playing-card v-if="cards.length > 0" :card="cards[cards.length-1]"></playing-card>
  </div>
</template>

<script>
import {eventBus1, eventBus2} from '@/main.js'
import Card from '@/components/Card'

export default {
  name: "graveyard-deck",
  props: ['player'],
  data() {
    return {
      cards: []
    }
  },
  mounted() {
    if ( this.player === "one") {
      eventBus1.$on('lose', result=>this.cards.push(result.card))
    } else {
      eventBus2.$on('lose', result=>this.cards.push(result.card))
    }

  },
  components: {
    "playing-card" : Card
  }
}
</script>

<style lang="css" scoped>
.graveyard-deck-container{
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 150px;
}
</style>
