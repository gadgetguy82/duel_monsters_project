<template lang="html">
  <div class="player-board-container" :class="{'top': player === 'one', 'bottom': player === 'two'}">
    <div class="first col">
      <div class="top-row">
        <playing-hand :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></playing-hand>
      </div>
      <div class="bottom-row">
        <playing-deck :deck="deck" :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></playing-deck>
        <extra-deck></extra-deck>
      </div>
    </div>
    <div class="second col">
      <div class="top-row">
        <spell-trap-zone :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></spell-trap-zone>
      </div>
      <div class="bottom-row">
        <monster-zone :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></monster-zone>
      </div>
    </div>
    <div class="third col">
      <div class="top-row">
        <field-zone></field-zone>
      </div>
      <div class="bottom-row">
        <extra-monster-zone></extra-monster-zone>
      </div>
    </div>
    <div class="last col">
      <div class="top-row">
        <life-points :player="player" :eventBus="eventBus"></life-points>
      </div>
      <div class="bottom-row">
        <graveyard-deck :player="player" :eventBus="eventBus"></graveyard-deck>
      </div>
    </div>
  </div>
</template>

<script>
import PlayingDeck from '@/components/PlayingDeck.vue'
import PlayingHand from '@/components/PlayingHand.vue'
import LifePoints from '@/components/LifePoints.vue'
import SpellTrapZone from '@/components/SpellTrapZone.vue'
import ExtraDeck from '@/components/ExtraDeck.vue'
import FieldZone from '@/components/FieldZone.vue'
import ExtraMonsterZone from '@/components/ExtraMonsterZone.vue'
import MonsterZone from '@/components/MonsterZone.vue'
import GraveyardDeck from '@/components/GraveyardDeck.vue'

export default {
  name: 'player-board',
  props: ['normalCards', 'player', 'turn', 'phase', 'eventBus'],
  components: {
    "playing-deck": PlayingDeck,
    "playing-hand": PlayingHand,
    "life-points": LifePoints,
    "spell-trap-zone": SpellTrapZone,
    "extra-deck": ExtraDeck,
    "field-zone": FieldZone,
    "extra-monster-zone": ExtraMonsterZone,
    "monster-zone": MonsterZone,
    "graveyard-deck": GraveyardDeck
  },
  data() {
    return{
      deck: []
    }
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
  flex-direction: row;
}

.player-board-container.top {
  justify-content: space-around;
}

.player-board-container.bottom {
  flex-direction: row;
  justify-content: space-around;
}

.player-board-container.bottom .col {
  flex-direction: column-reverse;
  justify-content: space-around;
}

.col {
  display: flex;
  flex-direction: column;
}

.last, .player-board-container.bottom .last {
  justify-content: space-between;
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

</style>
