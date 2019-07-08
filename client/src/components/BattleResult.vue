<template lang="html">
  <div class="result">
    <playing-card>{{playerOneCard}}</playing-card>
    <p>Result</p>
    <playing-card>{{playerTwoCard}}</playing-card>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js'
import Card from '@/components/Card'

export default {
  name: 'battle-result',
  components: {
    "playing-card" : Card
  },
  computed: {
    playerOneCard(){
      eventBus1.$on('select-battlecard', card => {
        return card;
      });
    },
    playerTwoCard(){
      eventBus2.$on('select-battlecard', card => {
        return card;
      });
    }
  }
}
</script>

<style lang="css" scoped>

  .result {
    z-index: 1;
  }
</style>
