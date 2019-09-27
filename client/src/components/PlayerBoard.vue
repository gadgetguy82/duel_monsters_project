<template lang="html">
  <div class="player-board-container" :class="{'top': player === 'one', 'bottom': player === 'two'}">
    <div class="first col">
      <div class="top-row">
        <playing-hand :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></playing-hand>
      </div>
      <div class="bottom-row">
        <playing-deck :deck="deck" :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></playing-deck>
        <extra-deck></extra-deck>
        <side-deck></side-deck>
      </div>
    </div>
    <div class="second col">
      <div class="top-row">
        <spell-trap-zone :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></spell-trap-zone>
        <field-zone></field-zone>
      </div>
      <div class="bottom-row">
        <monster-zone :player="player" :phase="phase" :turn="turn" :eventBus="eventBus"></monster-zone>
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
import PlayingDeck from '@/components/PlayingDeck'
import ExtraDeck from '@/components/ExtraDeck'
import SideDeck from '@/components/SideDeck'
import PlayingHand from '@/components/PlayingHand'
import SpellTrapZone from '@/components/SpellTrapZone'
import FieldZone from '@/components/FieldZone'
import MonsterZone from '@/components/MonsterZone'
import ExtraMonsterZone from '@/components/ExtraMonsterZone'
import LifePoints from '@/components/LifePoints'
import GraveyardDeck from '@/components/GraveyardDeck'

export default {
  name: 'player-board',
  props: ['normalCards', 'player', 'turn', 'phase', 'eventBus'],
  components: {
    "playing-deck": PlayingDeck,
    "extra-deck": ExtraDeck,
    "side-deck": SideDeck,
    "playing-hand": PlayingHand,
    "spell-trap-zone": SpellTrapZone,
    "field-zone": FieldZone,
    "monster-zone": MonsterZone,
    "extra-monster-zone": ExtraMonsterZone,
    "life-points": LifePoints,
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

.first {
  justify-content: space-evenly;
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
  align-items: center;
}

.top-row > *, .bottom-row > * {
  margin: 5px 20px;
}
</style>
