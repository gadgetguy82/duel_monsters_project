<template lang="html">
  <div class="life-points-container">
    <h1>life points</h1>
    <p>{{this.points}}</p>
  </div>
</template>

<script>
import {eventBus} from '@/main.js'
export default {
  name: 'life_points',
  data() {
    return {
      points: 8000
    }
  },
 mounted() {
   // eventBus.$on('win-lose', result=>this.life_points+=result)
 }
}
</script>

<style lang="css" scoped>
.life-points-container{
  height: 50px;
  width: 150px;
  border-style: solid;
  border-width: 1px;
}
h1{
  font-size: 12px;

}
</style>
