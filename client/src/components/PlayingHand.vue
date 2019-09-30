<template lang="html">
  <div class="playing-hand-container">
    <playing-card v-for="(card,index) in playerHand" :key="index" :card="card" v-on:click.native="summon(card)"></playing-card>
  </div>
</template>

<script>
import Card from '@/components/Card';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'playing-hand',
  props: ['gameState', 'boardData'],
  components: {
    "playing-card": Card
  },
  data() {
    return {
      mainPhases: ["First Main", "Second Main"],
      playerHand: [],
      monsterZone: "space",
      summonData: {}
    }
  },
  mounted() {
    this.boardData.eventBus.$on("one-card", card => {
      card.hidden = false;
      this.playerHand.push(card);
    });

    this.boardData.eventBus.$on("monster-zone", full => this.monsterZone = full);

    this.boardData.eventBus.$on("tribute-success", card => {
      GameLogic.removeCard(card, this.playerHand);
    });
  },
  watch: {
    "gameState.phase"() {
      if (this.gameState.phase === "Draw" && GameLogic.checkTurn(boardData, gameState)) {
        for (let card of this.playerHand) {
          card.hidden = !card.hidden;
        }
      } else if (this.gameState.phase === "Start" && !GameLogic.checkTurn(boardData, gameState)) {
        for (let card of this.playerHand) {
          card.hidden = !card.hidden;
        }
      }
    }
  },
  methods: {
    summon(card) {
      if (GameLogic.checkTurn(boardData, gameState) && this.mainPhases.includes(this.gameState.phase)) {
        if (this.monsterZone !== "full" && parseInt(card.level) < 5) {
          this.boardData.eventBus.$emit("normal-summon", card);
          GameLogic.removeCard(card, this.playerHand);
        } else if (parseInt(card.level) < 7){
          this.summonData.card = card;
          this.summonData.amount = 1;
          this.boardData.eventBus.$emit("tribute-summon", this.summonData);
          this.summonData = {};
        } else if (parseInt(card.level) >= 7){
          this.summonData.card = card;
          this.summonData.amount = 2;
          this.boardData.eventBus.$emit("tribute-summon", this.summonData);
          this.summonData = {};
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.playing-hand-container{
  background-image: url('../../public/img/playinghand_background.jpg');
  background-size: contain;
  background-position: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 151px;
  width: 510px;
  display: flex;
  opacity: 0.7;
}
</style>
