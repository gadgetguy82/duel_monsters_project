<template lang="html">
  <div class="playing-deck-container" :class="{'last': lastCard}" v-on:click="addCardToPlayingHand">

  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js'

export default {
  name: 'playing-deck',
  props: ['deck', 'player', 'phase', 'turn'],
  data() {
    return {
      lastCard: false
    }
  },
  methods: {
    addCardToPlayingHand(){
      const card = this.deck.pop();
      if (this.player === this.turn && this.player === "one" && this.phase === "Draw") {
        if (this.lastCard) {
          eventBus1.$emit('defeat', this.player);
          eventBus2.$emit('winner', "two");
        } else if (this.deck.length === 0) {
          this.lastCard = true;
        }
        eventBus1.$emit('one-card', card);
      } else if (this.player === this.turn && this.player === "two" && this.phase === "Draw"){
        if (this.lastCard) {
          eventBus2.$emit('defeat', this.player);
          eventBus1.$emit('winner', "one");
        } else if (this.deck.length === 0) {
          this.lastCard = true;
        }
        eventBus2.$emit('one-card', card);
      }
    }
  }
}
</script>

<style lang="css" scoped>
div.last {
  background-image: none;
}

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
