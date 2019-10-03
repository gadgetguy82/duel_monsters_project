<template lang="html">
  <div class="card-container" :class="{'shown': !card.hidden, 'atk': card.position === 'atk', 'def': card.position === 'def', 'change': card.change}" v-on:mouseover="display(card)" v-on:mouseout="cancel">
    <div class="card">
      <img class="show hover" :class="{'show': !card.hidden, 'hide': card.hidden}" :src="card.card_images[0].image_url_small"/>
      <img :class="{'hide': !card.hidden, 'show': card.hidden}" src="../../public/img/card_back.png">
      <p class="hide text">{{card.name}}<br>lvl: {{card.level}}<br>atk: {{card.atk}}<br>def: {{card.def}}</p>
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
  width: 100px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  z-index: 1;
}

.card-container:last-child {
  flex: 0 0 auto;
}

.card {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

img {
  height: 150px;
  border-radius: 5px;
  z-index: 2;
}

.text {
  visibility: hidden;
  padding: 4px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(201, 169, 109);
  background-color: rgba(201, 169, 109, 0.8);
  z-index: 3;
  position: absolute;
  width: 90px;
  text-align: center;
}

.card-container.shown:hover .card, .card-container.shown:hover .text {
  visibility: visible;
  transform: rotateY(180deg);
}

.show, .hide {
  position: absolute;
  backface-visibility: hidden;
}

.hide {
  transform: rotateY(180deg);
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

@keyframes rotate-flip-portrait {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
