<template lang="html">
  <div class="life-points-container">
    <p :class="{ 'green' : this.points > 4000 , 'amber': this.points > 1000 , 'red' : this.points <= 1000 }">☠️life points☠️ <br>
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
          eventBus2.$emit('winner', "two");
        } else {
          eventBus2.$emit('defeat', this.player);
          eventBus1.$emit('winner', "one");
        }
      }
    }
  },
  mounted() {
    if ( this.player === "one") {
      eventBus1.$on('lose', result=>this.points+=result.damage)
      eventBus1.$on('nowin', result=>this.points+=result.damage)
    } else {
      eventBus2.$on('lose', result=>this.points+=result.damage)
      eventBus2.$on('nowin', result=>this.points+=result.damage)
    }
  }
}
</script>

<style lang="css" scoped>
.life-points-container{
  height: 70px;
  width: 150px;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  background-color: rgba(255,255,255,0.4)
}
p{
  font-size: 17px;
  font-family: fantasy;
  font-weight: bold;
  margin: 5px;
  text-align: center;
  /* text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF; */

}

.red {
  color : red;
}

.amber {
  color: orange;
}

.green {
  color: green;
}
</style>
