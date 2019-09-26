<template lang="html">
  <div id="card" class="card">
    <img v-if="!card.hidden" :src="card.card_images[0].image_url_small" class="hover"/>
    <img v-if="card.hidden" src="../../public/img/card_back.png">
    <p class="text">{{card.name}}<br>lvl: {{card.level}}<br>atk: {{card.atk}}<br>def: {{card.def}}</p>
  </div>
</template>

<script>
export default {
  name: 'playing-card',
  props: ['card'],
  watch: {
    card: function() {
      if (this.card.hidden) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.card{
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 150px;
}

.card:last-child {
  flex: 0 0 auto;
}

img {
  height: 150px;
  border-radius: 5px;
  z-index: 1;
}

.playing-hand-container .card img {
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

#card:hover .text{
  visibility: visible;
}

</style>
