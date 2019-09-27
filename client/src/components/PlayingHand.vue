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
  props: ['player', 'phase', 'turn', 'eventBus'],
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
    this.eventBus.$on("one-card", card => {
      card.hidden = false;
      this.playerHand.push(card);
    });

    this.eventBus.$on("monster-zone", full => this.monsterZone = full);

    this.eventBus.$on("sacrifice-success", card => {
      GameLogic.removeCard(card, this.playerHand);
    });
  },
  watch: {
    phase() {
      if (this.phase === "Draw" && this.player === this.turn) {
        for (let card of this.playerHand) {
          card.hidden = !card.hidden;
        }
      } else if (this.phase === "Start" && this.player !== this.turn) {
        for (let card of this.playerHand) {
          card.hidden = !card.hidden;
        }
      }
    }
  },
  methods: {
    summon(card) {
      if (this.player === this.turn && this.mainPhases.includes(this.phase)) {
        if (this.monsterZone !== "full" && parseInt(card.level) < 5) {
          this.eventBus.$emit("normal-summon", card);
          GameLogic.removeCard(card, this.playerHand);
        } else if (parseInt(card.level) < 7){
          this.summonData.card = card;
          this.summonData.amount = 1;
          this.eventBus.$emit("sacrifice-summon", this.summonData);
          this.summonData = {};
        } else if (parseInt(card.level) >= 7){
          this.summonData.card = card;
          this.summonData.amount = 2;
          this.eventBus.$emit("sacrifice-summon", this.summonData);
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
