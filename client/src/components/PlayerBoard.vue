<template lang="html">
  <div class="player-board-container" :class="{'top': player === 'one', 'bottom': player === 'two'}">
    <div class="top-row">
      <playing-deck :deck="deck" :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></playing-deck>
      <playing-hand :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></playing-hand>
      <life-points :player="player" :eventBus="eventBus"></life-points>
    </div>
    <div class="bottom-row">
      <div class="spell-and-trap-cards"></div>
      <monster-zone :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></monster-zone>
      <graveyard-deck :player="player" :eventBus="eventBus"></graveyard-deck>
    </div>
  </div>
</template>

<script>
import PlayingDeck from '@/components/PlayingDeck.vue'
import PlayingHand from '@/components/PlayingHand.vue'
import LifePoints from '@/components/LifePoints.vue'
import MonsterZone from '@/components/MonsterZone.vue'
import GraveyardDeck from '@/components/GraveyardDeck.vue'

export default {
  name: 'player-board',
  data() {
    return{
      deck: []
    }
  },
  props: ['normalCards', 'player', 'turn', 'phase', 'eventBus'],
  components: {
    "playing-deck": PlayingDeck,
    "playing-hand": PlayingHand,
    "life-points": LifePoints,
    "monster-zone": MonsterZone,
    "graveyard-deck": GraveyardDeck
  },
  mounted() {
    this.randomizeCards();
  },
  methods: {
    randomizeCards() {
      for (let i = 0; i < 40; i++) {
        const index = Math.floor(Math.random() * this.normalCards.length);
        const chosenCardCopy = Object.assign({}, this.normalCards[index]);
        this.deck.push(chosenCardCopy);
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
  display: flex;
  flex-direction: column;
}

.player-board-container.top {
  justify-content: space-around;
}
.player-board-container.bottom {
  flex-direction: column-reverse;
  justify-content: space-around;
}

.player-board-container.bottom .top-row {
  align-items: flex-end;
}

.top-row, .bottom-row {
  display: flex;
  justify-content: center;
}

.top-row > *, .bottom-row > * {
  margin: 5px 20px;
}

.spell-and-trap-cards{
  width: 53px;
}

</style>
