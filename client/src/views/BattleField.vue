<template lang="html">
  <div id='battlefield'>
    <div class="board-container top-board">
      <player-board :normalCards="normalCards" :player="'one'"></player-board>
    </div>
    <div class="battle-result">
      <battle-result></battle-result>
    </div>
    <div class="win-lose">
      <win-lose></win-lose>
    </div>
    <div class="board-container bottom-board">
      <player-board :normalCards="normalCards" :player="'two'"></player-board>
    </div>

  </div>
</template>

<script>
import AIBoard from "@/components/AiBoard.vue";
import PlayerBoard from "@/components/PlayerBoard.vue";
import BattleResult from "@/components/BattleResult.vue";
import WinLose from "@/components/WinLose.vue";
export default {
  name: 'battlefield',
  components: {
    "player-board": PlayerBoard,
    "ai-board": AIBoard,
    "battle-result" : BattleResult,
    "win-lose": WinLose
  },
  props: ['normalCards']
}

</script>

<style lang="css" scoped>
.board-container{
  background-color: lightblue;
}

.battle-result {
  text-align: center;
}

.top-board {
  /* background-image: url('../../public/img/yugioh_ra_light.jpg'); */
<<<<<<< HEAD
  background-color: rgba(201, 169, 109, 0.85);
=======
  background-color: rgba(201, 169, 109, 0.7);
>>>>>>> develop
  background-size: cover;
}

.bottom-board {
  /* background-image: url('../../public/img/yugioh_obelisk_light.jpg'); */
<<<<<<< HEAD
  background-color: rgba(109, 140, 201, 0.85);
=======
  background-color: rgba(109, 140, 201, 0.7);
>>>>>>> develop
  background-size: cover;
}

</style>
