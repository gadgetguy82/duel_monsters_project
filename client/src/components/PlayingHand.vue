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
  props: ['player'],
  data() {
    return {
      playerHand: []
    }
  },
  mounted() {
    if (this.player === 'one') {
      eventBus1.$on('one-card', card => this.playerHand.push(card))
    } else {
      eventBus2.$on('one-card', card => this.playerHand.push(card))
    }
  },
  methods: {
    addToBattleHand(card){
      if (this.player === "one") {
        eventBus1.$emit('select-card', card );
        const index = this.playerHand.findIndex(handCard => handCard === card);
        this.playerHand.splice(index, 1);
      } else {
        eventBus2.$emit('select-card', card );
        const index = this.playerHand.findIndex(handCard => handCard === card);
        this.playerHand.splice(index, 1);
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
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 150px;
  width: 510px;
  display: flex;
}
</style>
