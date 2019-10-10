<template lang="html">
  <div class="player-board-container" :class="{'top': playerData.player === 'one', 'bottom': playerData.player === 'two'}">
    <div class="first col">
      <div class="top-row">
        <playing-hand :gameState="gameState" :playerData="playerData"></playing-hand>
      </div>
      <div class="bottom-row deck-container">
        <main-deck :deck="deck" :gameState="gameState" :playerData="playerData"></main-deck>
        <extra-deck></extra-deck>
        <side-deck></side-deck>
      </div>
    </div>
    <div class="second col">
      <div class="top-row">
        <spell-trap-zone :gameState="gameState" :playerData="playerData"></spell-trap-zone>
        <field-zone :gameState="gameState" :playerData="playerData"></field-zone>
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
import MainDeck from '@/components/MainDeck'
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
  props: ['gameCards', 'gameState', 'playerData'],
  components: {
    "main-deck": MainDeck,
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
      deck: [],
      minSize: 40,
      maxRange: 15
    }
  },
  mounted() {
    this.randomizeCards();
  },
  methods: {
    randomizeCards() {
      const range = Math.floor(Math.random() * this.maxRange);
      for (let i = 0; i < this.minSize + range; i++) {
        const index = Math.floor(Math.random() * this.gameCards.length);
        const chosenCardCopy = Object.assign({}, this.gameCards[index]);
        chosenCardCopy.player = this.playerData.player;
        this.deck.push(chosenCardCopy);
      }
      for (let i = 1; i < 6; i++) {
        const lastCardCopy = Object.assign({}, this.gameCards[this.gameCards.length - i]);
        lastCardCopy.player = this.playerData.player;
        this.deck.push(lastCardCopy);
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
