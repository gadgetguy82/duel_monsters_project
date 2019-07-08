<template lang="html">
  <div class="playing-deck-container">
    <li v-on:click="addCardToPlayingHand" >Sample Click</li>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js'

export default {
  name: 'playing-deck',
  props: ['deck', 'player'],
  methods: {
    addCardToPlayingHand(){
      const card = this.deck.pop();
      if (this.player === "one") {
        eventBus1.$emit('one-card', card);
      } else {
        eventBus2.$emit('one-card', card);
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .playing-deck-container {
    border-style: solid;
    border-width: 1px;
    width: 100px;
    height: 150px;
    background-image: url("../../public/card_back.png");
    background-size: 100px;
    color: white;
  }
</style>
