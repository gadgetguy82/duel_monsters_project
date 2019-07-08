<template lang="html">
  <div class="playing-hand-container">
    <!-- <p>this is the playing hand</p> -->
    <playing-card v-for="(card,index) in playerHand" :key="index" :card="card"></playing-card>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import Card from '@/components/Card'

export default {
  name: "playing-hand",
  data() {
    return {
      playerHand: []
    }
  },
  mounted() {
    eventBus.$on('one-card', card => this.playerHand.push(card))

    eventBus.$on('select-card', card => {
      const index = this.playerHand.findIndex(handCard => handCard === card);
      this.playerHand.splice(index, 1);
    })
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
  height: 150px;
  width: 500px;
  display: flex;
}
</style>
