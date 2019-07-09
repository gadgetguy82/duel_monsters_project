<template lang="html">
  <div class="life-points-container">
    <p>☠️life points☠️ <br>
    {{this.points}}</p>
  </div>
</template>

<script>
import {eventBus1, eventBus2} from '@/main.js'
export default {
  name: 'life_points',
  props: ['player'],
  data() {
    return {
      points: 8000
    }
  },
  watch: {
    points: function () {
      if (this.points <= 0) {
        if (this.player === "one") {
          eventBus1.$emit('defeat', this.player);
        } else {
          eventBus2.$emit('defeat', this.player);
        }
      }
    }
  },
  mounted() {
    if ( this.player === "one") {
      eventBus1.$on('lose', result=>this.points+=result.damage)
    } else {
      eventBus2.$on('lose', result=>this.points+=result.damage)
    }
  }
}
</script>

<style lang="css" scoped>
.life-points-container{
  height: 70px;
  width: 150px;
  border-style: solid;
  border-width: 1px;
}
p{
  font-size: 17px;
  font-family: fantasy;
  margin: 5px;
  text-align: center;
  text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;

}
</style>
