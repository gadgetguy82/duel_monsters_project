<template lang="html">
  <div class="info-box-container">
    <img v-if="source !== ''" :src="source"/>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import { eventBusInfo } from '@/main.js';
import * as Constants from '@/services/constants.js';
import * as Tooltips from '@/services/tooltips.js';

export default {
  name: 'info-box',
  props: ['gameState'],
  data() {
    return {
      eventBusInfo: eventBusInfo,
      source: "",
      text: ""
    }
  },
  mounted() {
    this.eventBusInfo.$on("display-card", card => {
      if (this.gameState.turn === card.player || !card.hidden) {
        this.source = card.card_images[0].image_url;
      }
    });

    this.eventBusInfo.$on("cancel", () => this.source = "");
  },
  watch: {
    "gameState.phase"() {
      if (this.gameState.phase === Constants.DRAW) {
        this.text = Tooltips.tips.draw;
      }
    }
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
