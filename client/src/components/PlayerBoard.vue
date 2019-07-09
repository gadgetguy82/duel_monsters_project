<template lang="html">
  <div class="player-board-container">
    <div class="top-row">
      <playing-deck :deck="deck" :player="player"></playing-deck>
      <playing-hand :player="player"></playing-hand>
      <life-points :player="player"></life-points>
    </div>
    <div class="bottom-row">
      <div class="spell-and-trap-cards"></div>
      <battle-hand :player="player"></battle-hand>
      <graveyard-deck :player="player"></graveyard-deck>
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
  name: 'player-board',
  data() {
    return{
      deck: []
    }
  },
  props: ['normalCards', 'player'],
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
.spell-and-trap-cards{
  width: 53px;
}
</style>
