<template lang="html">
  <div class="playing-deck-container">
    <div class="playing-deck" :class="{'last': lastCard}" v-on:click="addCardToPlayingHand">
      <h4>Main Deck</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playing-deck',
  props: ['deck', 'gameState', 'boardData'],
  data() {
    return {
      lastCard: false
    }
  },
  methods: {
    addCardToPlayingHand(){
      const card = this.deck.pop();
      if (this.boardData.player === this.gameState.turn && this.gameState.phase === "Draw") {
        if (this.lastCard) {
          this.boardData.eventBus.$emit('defeat', this.boardData.player);
        } else if (this.deck.length === 0) {
          this.lastCard = true;
        }
        if (this.deck.length > 0) {
          this.boardData.eventBus.$emit('one-card', card);
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
