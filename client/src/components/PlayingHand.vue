<template lang="html">
  <div class="playing-hand-container">
    <playing-card v-for="(card,index) in playerHand" :key="index" :card="card" v-on:click.native="addToBattleHand(card)"></playing-card>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js'
import Card from '@/components/Card'

export default {
  name: "playing-hand",
  props: ['player', 'phase', 'turn'],
  data() {
    return {
      playerHand: [],
      monsterZone: "space"
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
    if (this.player === 'one') {
      eventBus1.$on('one-card', card => {
        card.hidden = false;
        this.playerHand.push(card);
      });
      eventBus1.$on('monster-zone', full => this.monsterZone = full);
    } else {
      eventBus2.$on('one-card', card => {
        card.hidden = false;
        this.playerHand.push(card);
      });
      eventBus2.$on('monster-zone', full => this.monsterZone = full);
    }
  },
  methods: {
    addToBattleHand(card){
      if (this.player === "one") {
        eventBus1.$emit('select-card', card );
        if (this.monsterZone !== "full") {
          const index = this.playerHand.findIndex(handCard => handCard === card);
          this.playerHand.splice(index, 1);
        }
      } else {
        eventBus2.$emit('select-card', card );
        if (this.monsterZone !== "full") {
          const index = this.playerHand.findIndex(handCard => handCard === card);
          this.playerHand.splice(index, 1);
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
