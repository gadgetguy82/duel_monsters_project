<template lang="html">
  <div class="player-board-container">
    <div class="top-row">
      <playing-deck :normalCards="normalCards"></playing-deck>
      <playing-hand></playing-hand>
      <life-points></life-points>
    </div>
    <div class="bottom-row">
      <battle-hand></battle-hand>
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
import { eventBus } from '@/main.js'

export default {
  name: 'player-board',
  data() {
    return{
      deck: []
    }
  },
  props: ['normalCards'],
  components: {
    "playing-deck": PlayingDeck,
    "playing-hand": PlayingHand,
    "life-points": LifePoints,
    "battle-hand": BattleHand,
    "graveyard-deck": GraveyardDeck
  },
  mounted() {
    this.randomizeCards();
    console.log(this.deck);
  },
  methods: {
    randomizeCards() {
      for (let i = 0; i < 40; i++) {
        const index = Math.floor(Math.random() * this.normalCards.length);
        this.deck.push(this.normalCards[index]);
      }
    }
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
.bottom-row{
  display: flex;
  justify-content: space-between;
}
</style>
