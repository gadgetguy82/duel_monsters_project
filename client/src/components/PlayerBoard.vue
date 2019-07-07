<template lang="html">
  <div class="player-board-container">
    <div class="top-row">
      <playing-deck></playing-deck>
      <playing-hand></playing-hand>
      <life-points></life-points>
    </div>
  </div>
</template>

<script>
import PlayingDeck from '@/components/PlayingDeck.vue'
import PlayingHand from '@/components/PlayingHand.vue'
import LifePoints from '@/components/LifePoints.vue'
export default {
  name: 'player-board',
  components: {
    "playing-deck": PlayingDeck,
    "playing-hand": PlayingHand,
    "life-points": LifePoints
  }
}
</script>

<style lang="css" scoped>
.player-board-container{
  border-style: solid;
  border-width: 1px;
  margin: 0px;
  width: 100%;
  height: 400px;
}
.top-row{
  display: flex;
  justify-content: space-between;
}
</style>
