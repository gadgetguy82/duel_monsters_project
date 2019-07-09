<template lang="html">
  <div id='battlefield'>
    <div class="board-container top-board">
      <player-board :normalCards="normalCards" :player="'one'" :turn="turn" :phase="phase"></player-board>
    </div>
    <div class="battle-result">
      <div class="button-container">
        <phase-button v-if="turn === 'playerOne'" v-on:click.native="changePhase" :text="phase"></phase-button>
      </div>
      <battle-result></battle-result>
      <div class="button-container">
        <phase-button v-if="turn === 'playerTwo'" v-on:click.native="changePhase" :text="phase"></phase-button>
      </div>
    </div>
    <div class="win-lose">
      <win-lose></win-lose>
    </div>
    <div class="board-container bottom-board">
      <player-board :normalCards="normalCards" :player="'two'" :turn="turn" :phase="phase"></player-board>
    </div>
  </div>
</template>

<script>
import AIBoard from "@/components/AiBoard.vue";
import PlayerBoard from "@/components/PlayerBoard.vue";
import BattleResult from "@/components/BattleResult.vue";
import WinLose from "@/components/WinLose.vue";
import PhaseButton from "@/components/PhaseButton.vue";
import GameLogic from "@/services/game_logic.js";

export default {
  name: 'battlefield',
  data() {
    return {
      turn: "playerOne",
      phase: "draw"
    }
  },
  props: ['normalCards'],
  components: {
    "player-board": PlayerBoard,
    "ai-board": AIBoard,
    "battle-result" : BattleResult,
    "win-lose": WinLose,
    "phase-button": PhaseButton
  },
  methods: {
    changePhase() {
      if (this.phase === "end") {
        this.phase = "draw";
        this.turn = GameLogic.changeTurn(this.turn);
      } else {
        this.phase = GameLogic.changePhase(this.phase);
      }
    }
  }
}

</script>

<style lang="css" scoped>
.board-container{
  background-color: lightblue;
}

.battle-result {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(250, 140, 110, 0.85);
}

.top-board {
  /* background-image: url('../../public/img/yugioh_ra_light.jpg'); */
  /* background-size: cover; */
  background-color: rgba(200, 170, 110, 0.85);
}

.bottom-board {
  /* background-image: url('../../public/img/yugioh_obelisk_light.jpg'); */
  /* background-size: cover; */
  background-color: rgba(110, 140, 200, 0.85);
}

.button-container {
  width: 260px;
}

</style>
