<template lang="html">
  <div class="playing-hand-container">
    <p>this is the playing hand</p>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  name: "playing-hand",
  data() {
    return {
      playerHand: []
    }
  },
  mounted() {
    eventBus.$on('one-card', card => this.playerHand.push(card))
  }
}
</script>

<style lang="css" scoped>
.playing-hand-container{
  border-width: 1px;
  border-style: solid;
  height: 150px;
  width: 500px
}
</style>
