<template lang="html">
  <div class="info-box-container">
    <img v-if="source !== ''" :src="source"/>
  </div>
</template>

<script>
import { eventBusInfo } from '@/main.js';

export default {
  name: 'info-box',
  props: ['gameState'],
  data() {
    return {
      eventBusInfo: eventBusInfo,
      source: ""
    }
  },
  mounted() {
    this.eventBusInfo.$on("display-card", card => {
      if (this.gameState.turn === card.player) {
        this.source = card.card_images[0].image_url;
      }
    });

    this.eventBusInfo.$on("cancel", () => this.source = "");
  }
}
</script>

<style lang="css" scoped>
.info-box-container {
  background-color: rgba(255, 255, 255, 0.5);
  width: 180px;
  height: 220px;
  z-index: 10;
}

img {
  position: relative;
  width: auto;
  height: 400px;
  right: 60px;
  bottom: 80px;
}
</style>
