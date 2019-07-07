<template lang="html">
  <div class="ai-board-container">

    <playing-deck></playing-deck>
  </div>
</template>

<script>
import PlayingDeck from '@/components/PlayingDeck.vue'
export default {
  name: 'ai-board',
  components: {
    "playing-deck": PlayingDeck
  }
}
</script>

<style lang="css" scoped>
.ai-board-container{
  border-style: solid;
  border-width: 1px;
  margin: 0px;
  width: 100%;
  height: 400px;
}
</style>
