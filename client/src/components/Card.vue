<template lang="html">
  <div id="card" class="card">
    <!-- <h4>{{card.name}}</h4>
    <p>atk: {{card.atk}} </p>
    <p>def: {{card.def}} </p> -->
    <!-- <p>im: {{card.card_images[0].image_url_small}}</p> -->
    <img :src="card.card_images[0].image_url_small" class="hover"/>
    <p class="text">{{card.name}}<br>atk: {{card.atk}}<br>def: {{card.def}}</p>
  </div>
</template>

<script>
export default {
  name: 'playing-card',
  props: ['card']

}
</script>

<style lang="css" scoped>
.card{
  border-style: solid;
  border-width: 1px;
  width: 100px;
  height: 150px;
}
img {
  height: 150px;
}
#card:hover .text{
  visibility: visible;
}
.text {
  visibility: hidden;
  padding: 4px;
  border-style: solid;
  border-width: 1px;
  background-color: rgba(255, 255, 255, 0.8);
}


</style>
