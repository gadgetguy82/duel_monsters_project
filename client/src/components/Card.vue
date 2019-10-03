<template lang="html">
  <div class="card" :class="{'show': !card.hidden, 'hidden': card.hidden, 'atk': card.position === 'atk', 'def': card.position === 'def', 'change': card.change}" v-on:mouseover="display(card)" v-on:mouseout="cancel">
    <img v-if="!card.hidden" :src="card.card_images[0].image_url_small" class="hover"/>
    <img v-if="card.hidden" src="../../public/img/card_back.png">
    <p class="text">{{card.name}}<br>lvl: {{card.level}}<br>atk: {{card.atk}}<br>def: {{card.def}}</p>
  </div>
</template>

<script>
import { eventBusInfo } from '@/main.js';

export default {
  name: 'playing-card',
  props: ['card'],
  data() {
    return {
      eventBusInfo: eventBusInfo,
      timer: null,
      displayed: false
    }
  },
  methods: {
    display(card) {
      this.timer = window.setTimeout(() => {
        this.eventBusInfo.$emit("display-card", card);
        this.displayed = true;
      }, 2000);
    },

    cancel() {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      if (this.displayed) {
        this.eventBusInfo.$emit("cancel");
      }
    }
  }
}
</script>

<style lang="css" scoped>
.card {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card:last-child {
  flex: 0 0 auto;
}

.card.show:hover .text{
  visibility: visible;
}

img {
  height: 150px;
  border-radius: 5px;
  z-index: 1;
  position: absolute;
}

.text {
  visibility: hidden;
  padding: 4px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(201, 169, 109);
  background-color: rgba(201, 169, 109, 0.8);
  z-index: 2;
  position: absolute;
  width: 90px;
  text-align: center;
}

.monster-space-container .card.atk.change {
  animation: rotate-portrait 0.5s ease;
}

.monster-space-container .card.def.change {
  animation: rotate-landscape 0.5s ease;
}

@keyframes rotate-landscape {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes rotate-portrait {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
