<template lang="html">
  <div class="playing-deck-container" v-on:click="addCardToPlayingHand">

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
    border-radius: 5px;
    width: 100px;
    height: 145px;
    background-image: url("../../public/img/card_back.png");
    background-repeat: no-repeat;
    background-size: 100px;
  }
</style>
