<template lang="html">
  <div id="battlefield">
    <div class="board-container top-board">
      <player-board :normalCards="normalCards" :gameState="gameState" :playerData="yellowPlayerData"></player-board>
    </div>
    <div class="middle-section">
      <info-box></info-box>
      <div class="button-container">
        <h2><i class="arrow-up"></i> Player One <i class="arrow-up"></i></h2>
        <div class="btn">
          <phase-button v-if="gameState.turn === 'one'" v-on:click.native="changePhaseTurn" :gameState="gameState" :playerData="yellowPlayerData"></phase-button>
        </div>
        <h2 class="hide"></h2>
      </div>
      <battle-result></battle-result>
      <div class="button-container">
        <h2 class="hide"></h2>
        <div class="btn">
          <phase-button v-if="gameState.turn === 'two'" v-on:click.native="changePhaseTurn" :gameState="gameState" :playerData="bluePlayerData"></phase-button>
        </div>
        <h2><i class="arrow-down"></i> Player Two <i class="arrow-down"></i></h2>
      </div>
    </div>
    <div class="win-lose">
      <win-lose></win-lose>
    </div>
    <div class="board-container bottom-board">
      <player-board :normalCards="normalCards" :gameState="gameState" :playerData="bluePlayerData"></player-board>
    </div>
  </div>
</template>

<script>
import AIBoard from '@/components/AiBoard.vue';
import PlayerBoard from '@/components/PlayerBoard.vue';
import BattleResult from '@/components/BattleResult.vue';
import WinLose from '@/components/WinLose.vue';
import PhaseButton from '@/components/PhaseButton.vue';
import InfoBox from '@/components/InfoBox.vue';
import GameLogic from '@/services/game_logic.js';
import { eventBus1, eventBus2 } from '@/main.js';

export default {
  name: "battlefield",
  props: ['normalCards'],
  components: {
    "player-board": PlayerBoard,
    "ai-board": AIBoard,
    "battle-result" : BattleResult,
    "win-lose": WinLose,
    "phase-button": PhaseButton,
    "info-box": InfoBox
  },
  data() {
    return {
      gameState: {
        turn: 'one',
        phase: "Start",
      },
      yellowPlayerData: {
        player: 'one',
        eventBus: eventBus1,
        firstTurn: true,
        firstDrawAmount: 5
      },
      bluePlayerData: {
        player: 'two',
        eventBus: eventBus2,
        firstTurn: true,
        firstDrawAmount: 6
      }
    }
  },
  methods: {
    changePhaseTurn() {
      if (this.gameState.phase === "End") {
        this.gameState.phase = GameLogic.changePhase(this.gameState.phase);
        this.gameState.turn = GameLogic.changeTurn(this.gameState.turn);
      } else {
        this.gameState.phase = GameLogic.changePhase(this.gameState.phase);
      }
    }
  }
}

</script>

<style lang="css" scoped>
.middle-section {
  display: flex;
  justify-content:space-around;
  align-items: center;
  background-color: rgba(250, 140, 110, 0.85);
}

.top-board {
  background-color: rgba(200, 170, 110, 0.85);
}

.bottom-board {
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
