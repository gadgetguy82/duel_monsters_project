<template lang="html">
  <div id="battlefield">
    <div class="board-container top-board">
      <player-board :normalCards="normalCards" :player="'one'" :turn="turn" :phase="phase" :eventBus="eventBus1"></player-board>
    </div>
    <div class="battle-result">
      <div class="button-container">
        <h2><i class="arrow-up"></i> Player One <i class="arrow-up"></i></h2>
        <div class="btn">
          <phase-button v-if="turn === 'one'" v-on:click.native="changePhase" :text="phase"></phase-button>
        </div>
        <h2 class="hide"></h2>
      </div>
      <battle-result></battle-result>
      <div class="button-container">
        <h2 class="hide"></h2>
        <div class="btn">
          <phase-button-inverted v-if="turn === 'two'" v-on:click.native="changePhase" :text="phase" class="player-2-button"></phase-button-inverted>
        </div>
        <h2><i class="arrow-down"></i> Player Two <i class="arrow-down"></i></h2>
      </div>
    </div>
    <div class="win-lose">
      <win-lose></win-lose>
    </div>
    <div class="board-container bottom-board">
      <player-board :normalCards="normalCards" :player="'two'" :turn="turn" :phase="phase" :eventBus="eventBus2"></player-board>
    </div>
  </div>
</template>

<script>
import AIBoard from '@/components/AiBoard.vue';
import PlayerBoard from '@/components/PlayerBoard.vue';
import BattleResult from '@/components/BattleResult.vue';
import WinLose from '@/components/WinLose.vue';
import PhaseButton from '@/components/PhaseButton.vue';
import PhaseButtonInverted from '@/components/PhaseButtonInverted.vue';
import GameLogic from '@/services/game_logic.js';
import { eventBus1, eventBus2 } from '@/main.js';

export default {
  name: "battlefield",
  data() {
    return {
      turn: 'one',
      phase: "Start",
      eventBus1: eventBus1,
      eventBus2: eventBus2,
    }
  },
  props: ['normalCards'],
  components: {
    "player-board": PlayerBoard,
    "ai-board": AIBoard,
    "battle-result" : BattleResult,
    "win-lose": WinLose,
    "phase-button": PhaseButton,
    "phase-button-inverted": PhaseButtonInverted
  },
  methods: {
    changePhase() {
      if (this.phase === "End") {
        this.phase = GameLogic.changePhase(this.phase);
        this.turn = GameLogic.changeTurn(this.turn);
      } else {
        this.phase = GameLogic.changePhase(this.phase);
      }
    }
  }
}

</script>

<style lang="css" scoped>

.battle-result {
  display: flex;
  justify-content:space-evenly;
  align-items: center;
  background-color: rgba(250, 140, 110, 0.85);
}

.top-board {
  /* background-image: url("../../public/img/yugioh_ra_light.jpg"); */
  /* background-size: cover; */
  background-color: rgba(200, 170, 110, 0.85);
}

.bottom-board {
  /* background-image: url("../../public/img/yugioh_obelisk_light.jpg"); */
  /* background-size: cover; */
  background-color: rgba(110, 140, 200, 0.85);
}

.button-container {
  width: 260px;
}

h2 {
  margin: 0;
}

i {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.arrow-up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.arrow-down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.btn {
  height: 100px;
}

.hide {
  height: 25px;
}

</style>
