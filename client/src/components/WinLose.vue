<template lang="html">
  <div class="win-lose-container">
    <div class="winner" v-if="winner != null">
      <h1>&#x2655; Winner - Player {{winner}} &#x2655;</h1>
      <router-link :to="{ name: 'home' }">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import {eventBus1, eventBus2} from '@/main.js';

export default {
  name: 'win-lose',
  data(){
    return {
      winner: null
    }
  },
  mounted(){
    eventBus1.$on('winner', player => this.winner = player)
    eventBus2.$on('winner', player => this.winner = player)
  }
}
</script>

<style lang="css" scoped>
.winner{
  border-style: solid;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
}
</style>
