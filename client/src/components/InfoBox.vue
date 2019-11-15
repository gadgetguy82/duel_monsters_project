<template lang="html">
  <div class="info-box-container">
    <transition name="text-bounce" class="text-container">
      <p class="text" v-if="!source">{{ text }}</p>
    </transition>
    <transition name="image-fade">
      <img v-if="source" :src="source"/>
    </transition>
  </div>
</template>

<script>
import * as Constants from '@/services/constants.js';
import * as Tooltips from '@/services/tooltips.js';

export default {
  name: 'info-box',
  props: ['gameState'],
  data() {
    return {
      source: "",
      text: Tooltips.phases.start
    }
  },
  mounted() {
    this.gameState.eventBus.$on("display-card", card => {
      if (this.gameState.turn === card.player || !card.hidden) {
        this.source = card.large_image || card.card_images[0].image_url;
      }
    });

    this.gameState.eventBus.$on("cancel", () => this.source = "");
  },
  watch: {
    "gameState.phase"() {
      switch(this.gameState.phase) {
        case Constants.START:
          this.text = Tooltips.phases.start;
          break;
        case Constants.DRAW:
          this.text = Tooltips.phases.draw;
          break;
        case Constants.STANDBY:
          this.text = Tooltips.phases.standby;
          break;
        case Constants.FIRST_MAIN:
          this.text = Tooltips.phases.firstMain;
          break;
        case Constants.BATTLE:
          this.text = Tooltips.phases.battle;
          break;
        case Constants.SECOND_MAIN:
          this.text = Tooltips.phases.secondMain;
          break;
        case Constants.END:
          this.text = Tooltips.phases.end;
          break;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.info-box-container {
  border-style: solid;
  border-width: 1px;
  background-color: rgba(255, 255, 255, 0.5);
  width: 180px;
  height: 220px;
  padding: 5px;
  position: relative;
}

.text-container {
  height: 100%;
  overflow: scroll;
  padding: 2px;
}

img {
  position: absolute;
  width: auto;
  height: 400px;
  top: -90px;
  left: -25px;
  z-index: 2;
}

.image-fade-enter, .image-fade-leave-active {
  opacity: 0;
}

.image-fade-enter-active, .image-fade-leave-active {
  transition: opacity 1s ease
}

.text-bounce-enter-active {
  animation: bounce-in .5s;
}

.text-bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
