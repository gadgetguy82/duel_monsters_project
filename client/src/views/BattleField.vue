<template lang="html">
  <div id='battlefield'>
    <p>Battlefield View</p>
    <div class="player-board-container">
      <player-board :normalCards="normalCards"></player-board>
    </div>
    <div class="ai-board-container">
      <ai-board></ai-board>
    </div>
  </div>
</template>

<script>
import AIBoard from "@/components/AiBoard.vue"
import PlayerBoard from "@/components/PlayerBoard.vue"
export default {
  name: 'battlefield',
  components: {
    "player-board": PlayerBoard,
    "ai-board": AIBoard
  },
  props: ['normalCards']
}

</script>

<style lang="css" scoped>
.player-board-container{
  background-color: lightblue;
}
.ai-board-container{
  background-color: lightgreen;
}
</style>
