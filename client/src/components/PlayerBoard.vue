<template lang="html">
  <div class="player-board-container" :class="{'top': playerData.player === 'one', 'bottom': playerData.player === 'two'}">
    <div class="first col">
      <div class="top-row">
        <playing-hand :gameState="gameState" :playerData="playerData"></playing-hand>
      </div>
      <div class="bottom-row deck-container">
        <playing-deck :deck="deck" :gameState="gameState" :playerData="playerData"></playing-deck>
        <extra-deck></extra-deck>
        <side-deck></side-deck>
      </div>
    </div>
    <div class="second col">
      <div class="top-row">
        <spell-trap-zone :gameState="gameState" :playerData="playerData"></spell-trap-zone>
        <field-zone></field-zone>
      </div>
      <div class="bottom-row">
        <monster-zone :gameState="gameState" :playerData="playerData"></monster-zone>
        <extra-monster-zone></extra-monster-zone>
      </div>
    </div>
    <div class="last col">
      <div class="top-row">
        <life-points :playerData="playerData"></life-points>
      </div>
      <div class="bottom-row">
        <graveyard-deck :playerData="playerData"></graveyard-deck>
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
  props: ['normalMonsters', 'gameState', 'playerData'],
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
        const index = Math.floor(Math.random() * this.normalMonsters.length);
        const chosenCardCopy = Object.assign({}, this.normalMonsters[index]);
        chosenCardCopy.player = this.playerData.player;
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

.deck-container {
  height: 180px;
  display: flex;
  justify-content: space-around;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.first {
  justify-content: space-around;
}

.last, .player-board-container.bottom .last {
  justify-content: space-between;
}

.player-board-container.bottom .top-row {
  align-items: flex-end;
}

.top-row, .bottom-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.top-row > *, .bottom-row > * {
  margin: 5px 5px;
}
</style>
