<template lang="html">
  <div id='battlefield'>
    <p>Battlefield View</p>
    <div class="board-container top-board">
      <player-board :normalCards="normalCards" :player="'one'"></player-board>
    </div>
    <div class="battle-result">
      <battle-result></battle-result>
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
export default {
  name: 'battlefield',
  components: {
    "player-board": PlayerBoard,
    "ai-board": AIBoard,
    "battle-result" : BattleResult
  },
  props: ['normalCards']
}

</script>

<style lang="css" scoped>
.board-container{
  background-color: lightblue;
}

.battle-result {
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  text-align: center;
}

.top-board {
  background-image: url('../../public/img/yugioh_yami_yugi_mat.jpg');
  background-size: cover;
}

.bottom-board {
  background-image: url('../../public/img/yugioh_dark_armed_dragon_mat.png');
  background-size: cover;
}

</style>
