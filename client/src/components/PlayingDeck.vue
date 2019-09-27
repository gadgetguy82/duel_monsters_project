<template lang="html">
  <div class="playing-deck-container">
    <div class="playing-deck" :class="{'last': lastCard}" v-on:click="addCardToPlayingHand">
      <h4>Main Deck</h4>
    </div>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js';

export default {
  name: 'playing-deck',
  props: ['deck', 'player', 'phase', 'turn', 'eventBus'],
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
        if (this.deck.length > 0) {
          eventBus1.$emit('one-card', card);
        }
      } else if (this.player === this.turn && this.player === "two" && this.phase === "Draw"){
        if (this.lastCard) {
          eventBus2.$emit('defeat', this.player);
          eventBus1.$emit('winner', "one");
        } else if (this.deck.length === 0) {
          this.lastCard = true;
        }
        if (this.deck.length > 0) {
          eventBus2.$emit('one-card', card);
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
div.last {
  background-image: none;
}

h4 {
  margin: 0;
  padding: 0 10px;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

.playing-deck-container {
  text-align: center;
}

.playing-deck {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 145px;
  background-image: url("../../public/img/card_back.png");
  background-repeat: no-repeat;
  background-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
