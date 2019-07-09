<template lang="html">
  <div class="result">
    <playing-card v-if="playerOneCard" :card="playerOneCard"></playing-card>
    <p>----Battle Result Area----</p>
    <playing-card v-if="playerTwoCard" :card="playerTwoCard"></playing-card>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js'
import Card from '@/components/Card'

export default {
  name: 'battle-result',
  data(){
    return{
      playerOneCard: null,
      playerTwoCard: null,

    }
  },
  components: {
    "playing-card" : Card
  },
  mounted() {
    eventBus1.$on('select-battlecard', card => {
      this.playerOneCard = card;
    });
    eventBus2.$on('select-battlecard', card => {
      this.playerTwoCard = card;
    });
  }

}
</script>

<style lang="css" scoped>

  .result {
    z-index: 1;
  }
</style>
