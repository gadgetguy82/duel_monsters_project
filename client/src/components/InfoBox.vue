<template lang="html">
  <div class="info-box-container">
    <img v-if="source !== ''" src="source"/>
  </div>
</template>

<script>
import { eventBusInfo } from '@/main.js';

export default {
  name: 'info-box',
  data() {
    return {
      eventBusInfo: eventBusInfo,
      source: ""
    }
  },
  mounted() {
    this.eventBusInfo.$on("display-card", card => this.source = card.card_images[0].image_url);

    this.eventBusInfo.$on("cancel", () => this.source = "");
  }
}
</script>

<style lang="css" scoped>
.info-box-container {
  background-color: rgba(255, 255, 255, 0.5);
  width: 180px;
  height: 240px;
}
</style>
