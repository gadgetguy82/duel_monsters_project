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
    this.playerData.eventBus.$on("tribute-selected", () => this.canClick = false);
    this.playerData.eventBus.$on("summon-success", () => this.canClick = true);

    this.playerData.eventBus.$on("hand-extra-cards", () => this.canClick = false);
    this.playerData.eventBus.$on("hand-no-extra-cards", () => this.canClick = true);
  },
  methods: {
    changePhaseTurn() {
      if (this.canClick) {
        this.gameState = GameLogic.changePhase(this.gameState);
        if (GameLogic.checkEndPhase(this.gameState, this.playerData)) {
          if (this.playerData.firstTurn) {
            this.playerData.firstTurn = false;
          }
          this.gameState.skipBattle = true;
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
  height: 80px;
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
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent;
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
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent;
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
