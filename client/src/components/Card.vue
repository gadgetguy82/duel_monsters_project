<template lang="html">
  <div class="card-container" :class="{'shown': !card.hidden, 'atk': card.position === 'atk', 'def': card.position === 'def', 'change': card.change}" v-on:mouseover="display(card)" v-on:mouseout="cancel">
    <div class="card">
      <img class="show hover" v-if="!card.hidden" :src="card.card_images[0].image_url_small"/>
      <img class="hide" v-if="card.hidden" src="../../public/img/card_back.png">
      <p class="text">{{card.name}}<br>lvl: {{card.level}}<br>atk: {{card.atk}}<br>def: {{card.def}}</p>
    </div>
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
.card-container {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-container:last-child {
  flex: 0 0 auto;
}

.card-container.shown:hover .text{
  visibility: visible;
}

.card {
  position: absolute;
  display: flex;
}

img {
  height: 150px;
  border-radius: 5px;
  z-index: 1;
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

.monster-space-container .card-container.atk.change {
  animation: rotate-portrait 0.5s ease;
}

.monster-space-container .card-container.def.change {
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
