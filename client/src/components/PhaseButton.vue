<template lang="html">
  <button type="button" :class="{'yellow': playerData.player === 'one', 'blue': playerData.player === 'two'}" v-on:click="changePhaseTurn" >{{ gameState.phase }}</button>
</template>

<script>
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'phase-button',
  props: ['gameState', 'playerData'],
  data() {
    return {
      canClick: true
    }
  },
  mounted() {
    this.playerData.eventBus.$on("hand-extra-cards", () => this.canClick = false);

    this.playerData.eventBus.$on("hand-no-extra-cards", () => this.canClick = true);
  },
  methods: {
    changePhaseTurn() {
      if (this.canClick) {
        this.gameState = GameLogic.changePhase(this.gameState, this.playerData);
        if (GameLogic.checkEndPhase(this.gameState, this.playerData) && this.playerData.firstTurn) {
          this.playerData.firstTurn = false
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
button {
  border: none;
  color: white;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  width: 160px;
  height: 100px;
  position: relative;
}

button.yellow {
  background-color: rgb(200, 180, 110);
  text-align: right;
}

button.blue {
  background-color: rgb(110, 140, 200);
  text-align: left;
}

button:before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}

button.yellow:before {
  right: -30px;
  border-left: 30px solid rgb(200, 180, 110);
}

button.blue:before {
  right: 0;
  border-right: 30px solid rgb(230, 130, 100);
}

button:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}

button.yellow:after {
  left: 0;
  border-left: 30px solid rgb(230, 130, 100);
}

button.blue:after {
  left: -30px;
  border-right: 30px solid rgb(110, 140, 200);
}
</style>
