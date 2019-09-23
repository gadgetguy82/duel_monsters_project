<template lang="html">
  <div class="playing-hand-container">
    <playing-card v-for="(card,index) in playerHand" :key="index" :card="card" v-on:click.native="summon(card)"></playing-card>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: "playing-hand",
  props: ['player', 'phase', 'turn', 'eventBus'],
  data() {
    return {
      mainPhases: ["First Main", "Second Main"],
      playerHand: [],
      monsterZone: "space",
      summonData: {}
    }
  },
  watch: {
    phase: function() {
      if (this.phase === "Draw") {
        if (this.player === this.turn) {
          for (let card of this.playerHand) {
            card.hidden = !card.hidden;
          }
        }
      } else if (this.phase === "Start") {
        if (this.player !== this.turn) {
          for (let card of this.playerHand) {
            card.hidden = !card.hidden;
          }
        }
      }
    }
  },
  mounted() {
    this.eventBus.$on("one-card", card => {
      card.hidden = false;
      this.playerHand.push(card);
    });
    this.eventBus.$on("monster-zone", full => this.monsterZone = full);
  },
  methods: {
    summon(card){
      if (this.player === this.turn && this.mainPhases.includes(this.phase)) {
        if (this.monsterZone !== "full") {
          if (parseInt(card.level) <= 4) {
            this.eventBus.$emit("normal-summon", card );
            const index = this.playerHand.findIndex(handCard => handCard === card);
            this.playerHand.splice(index, 1);
          } else if (parseInt(card.level) <= 6){
            this.summonData.card = card;
            this.summonData.amount = 1;
            this.eventBus.$emit("sacrifice-summon", this.summonData)
          }
        }
      }
    }
  },
  components: {
    "playing-card": Card
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
  height: 150px;
  width: 510px;
  display: flex;
  opacity: 0.7;
}
</style>
