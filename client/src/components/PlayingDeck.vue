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
  props: ['deck', 'gameState', 'playerData'],
  data() {
    return {
      canDraw: false
    }
  },
  mounted() {
    this.playerData.eventBus.$on("draw-max", () => {
      this.canDraw = false;
      this.playerData.firstTurn = false;
    });
  },
  watch: {
    "gameState.phase"() {
      if (GameLogic.checkTurn(this.gameState, this.playerData) && this.gameState.phase === "Draw") {
        this.canDraw = true;
        if (this.deck.length === 0) {
          this.canDraw = false;
          this.playerData.eventBus.$emit('defeat', this.playerData.player);
        }

        if (this.playerData.firstTurn) {
          for (let count = 0; count < this.playerData.firstDrawAmount; count++) {
            this.drawCard();
          }
        } else {
          this.drawCard();
        }
      } else if (GameLogic.checkTurn(this.gameState, this.playerData) && this.gameState.phase === "Standby") {
        this.canDraw = false;
      }
    }
  },
  methods: {
    drawCard() {
      if (GameLogic.checkTurn(this.gameState, this.playerData) && this.canDraw) {
        const card = this.deck.pop();
        this.playerData.eventBus.$emit('draw-card', card);
        if (!this.playerData.firstTurn) {
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
