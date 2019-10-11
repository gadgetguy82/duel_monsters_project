<template lang="html">
  <div id="game-board">
    <div class="board-container top-board">
      <player-board :gameCards="gameCards" :gameState="gameState" :playerData="yellowPlayerData"></player-board>
    </div>
    <div class="middle-section">
      <div class="phase-container">
        <h2><i class="arrow-up"></i> Player One <i class="arrow-up"></i></h2>
        <div class="button-container">
          <phase-button v-if="gameState.turn === 'one'" :gameState="gameState" :playerData="yellowPlayerData"></phase-button>
        </div>
        <div class="button-container">
          <phase-button v-if="gameState.turn === 'two'" :gameState="gameState" :playerData="bluePlayerData"></phase-button>
        </div>
        <h2><i class="arrow-down"></i> Player Two <i class="arrow-down"></i></h2>
      </div>
      <battle-field :gameState="gameState"></battle-field>
      <info-box :gameState="gameState"></info-box>
    </div>
    <div class="win-lose">
      <win-lose></win-lose>
    </div>
    <div class="board-container bottom-board">
      <player-board :gameCards="gameCards" :gameState="gameState" :playerData="bluePlayerData"></player-board>
    </div>
  </div>
</template>

<script>
import AIBoard from '@/components/AiBoard.vue';
import PlayerBoard from '@/components/PlayerBoard.vue';
import Battlefield from '@/components/Battlefield.vue';
import WinLose from '@/components/WinLose.vue';
import PhaseButton from '@/components/PhaseButton.vue';
import InfoBox from '@/components/InfoBox.vue';
import { eventBus1, eventBus2 } from '@/main.js';

export default {
  name: "game-board",
  props: ['gameCards', 'eventBus'],
  components: {
    "player-board": PlayerBoard,
    "ai-board": AIBoard,
    "battle-field" : Battlefield,
    "win-lose": WinLose,
    "phase-button": PhaseButton,
    "info-box": InfoBox
  },
  data() {
    return {
      gameState: {
        turn: 'one',
        phase: "Start",
        eventBus: this.eventBus,
        skipBattle: true
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

.phase-container {
  width: 300px;
  margin: 0 80px;
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

.button-container {
  height: 100px;
}

.hide {
  height: 25px;
}
</style>
