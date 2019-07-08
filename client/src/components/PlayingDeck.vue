<template lang="html">
  <div class="playing-deck-container">
    <li v-on:click="addCardToPlayingHand" >Sample Click</li>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  name: 'playing-deck',
  props: ['normalCards'],
  methods: {
    addCardToPlayingHand(){
      const card = this.normalCards.pop();
      eventBus.$emit('one-card', card);
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
  }
</style>
