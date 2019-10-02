<template lang="html">
  <button type="button" :class="{'yellow': playerData.player === 'one', 'blue': playerData.player === 'two'}" v-on:click="changePhaseTurn" >{{ gameState.phase }}</button>
</template>

<script>
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'pretty-button',
  props: ['gameState', 'playerData'],
  data() {
    return {
      canClick: true
    }
  },
  mounted() {
    this.playerData.eventBus.$on("hand-extra-cards", () => canClick = false);
  },
  methods: {
    handleClick(event) {
      event.preventDefault();
    },

    changePhaseTurn() {
      if (canClick) {
        if (this.gameState.phase === "End") {
          this.gameState.turn = GameLogic.changeTurn(this.gameState.turn);
        }
        this.gameState.phase = GameLogic.changePhase(this.gameState.phase);
        this.gameState.eventBus.$emit("update-state", this.gameState);
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
