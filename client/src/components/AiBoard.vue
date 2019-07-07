<template lang="html">
  <div class="ai-board-container">
    <playing-deck></playing-deck>
    <playing-hand></playing-hand>
    <life-points></life-points>

  </div>
</template>

<script>
import PlayingDeck from '@/components/PlayingDeck.vue'
import PlayingHand from '@/components/PlayingHand.vue'
import LifePoints from '@/components/LifePoints.vue'
export default {
  name: 'ai-board',
  components: {
    "playing-deck": PlayingDeck,
    "playing-hand": PlayingHand,
    "life-points": LifePoints
  }
}
</script>

<style lang="css" scoped>
.ai-board-container{
  border-style: solid;
  border-width: 1px;
  margin: 0px;
  width: 100%;
  height: 400px;
}
</style>
