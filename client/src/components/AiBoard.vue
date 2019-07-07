<template lang="html">
  <div class="ai-board-container">
    <div class="top-row">
      <playing-deck></playing-deck>
      <battle-hand></battle-hand>
      <life-points></life-points>
    </div>
    <div class="bottom-row">
      <playing-hand></playing-hand>
      <graveyard-deck></graveyard-deck>
    </div>
  </div>
</template>

<script>
import PlayingDeck from '@/components/PlayingDeck.vue'
import PlayingHand from '@/components/PlayingHand.vue'
import LifePoints from '@/components/LifePoints.vue'
import BattleHand from '@/components/BattleHand.vue'
import GraveyardDeck from '@/components/GraveyardDeck.vue'

export default {
  name: 'ai-board',
  components: {
    "playing-deck": PlayingDeck,
    "playing-hand": PlayingHand,
    "life-points": LifePoints,
    'battle-hand': BattleHand,
    "graveyard-deck": GraveyardDeck
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

.top-row{
  display: flex;
  justify-content: space-between;
}

.bottom-row{
  display: flex;
  justify-content: space-between;
}

</style>
