<template lang="html">
  <div class="playing-deck-container">
    <div class="playing-deck" :class="{'last': deck.length === 0}" v-on:click="drawCard">
      <h4>Main Deck</h4>
    </div>
  </div>
</template>

<script>
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'playing-deck',
  props: ['deck', 'gameState', 'boardData'],
  data() {
    return {
      canDraw: false
    }
  },
  mounted() {
    this.boardData.eventBus.$on("draw-max", () => {
      this.canDraw = false;
      this.boardData.firstTurn = false;
    });
  },
  watch: {
    "gameState.phase"() {
      if (this.gameState.phase === "Draw") {
        this.canDraw = true;
        if (GameLogic.checkTurn(this.boardData, this.gameState) && this.deck.length === 0) {
          this.canDraw = false;
          this.boardData.eventBus.$emit('defeat', this.boardData.player);
        }
      }
    }
  },
  methods: {
    drawCard() {
      if (GameLogic.checkTurn(this.boardData, this.gameState) && this.canDraw) {
        const card = this.deck.pop();
        this.boardData.eventBus.$emit('draw-card', card);
        if (!this.boardData.firstTurn) {
          this.canDraw = false;
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
