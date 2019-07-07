<template lang="html">
  <div id='battlefield'>
    <p>Battlefield View</p>
    <div class="board-container">
      <player-board>this is the player board</player-board>
    </div>
    <div class="board-container">
      <ai-board>this is the ai board</ai-board>
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
  }
}

</script>

<style lang="css" scoped>

</style>
