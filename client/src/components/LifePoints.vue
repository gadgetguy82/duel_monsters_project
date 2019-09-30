<template lang="html">
  <div class="life-points-container" v-on:click="sendMessage">
    <p :class="{ 'green' : this.points > 4000 , 'amber': this.points > 1000 , 'red' : this.points <= 1000 }">☠️Life Points☠️ <br>
    {{this.points}}</p>
  </div>
</template>

<script>
import {eventBus1, eventBus2} from '@/main.js';
import socketio from 'socket.io-client';

export default {
  name: 'life_points',
  props: ['boardData'],
  data() {
    return {
      points: 8000,
      socket : socketio('localhost:5000')
    }
  },
  mounted() {
    this.boardData.eventBus.$on('lose', result => this.points += result.damage);
    this.boardData.eventBus.$on('nowin', result => this.points += result.damage);
  },
  watch: {
    points() {
      if (this.points <= 0) {
        this.boardData.eventBus.$emit('defeat', this.boardData.player);
        if (this.boardData.player === "one") {
          eventBus2.$emit('winner', "two");
        } else {
          eventBus1.$emit('winner', "one");
        }
      }
    }
  },
  methods: {
    sendMessage() {
      this.socket.emit('SEND_MESSAGE', "hello");
    }
  }
}
</script>

<style lang="css" scoped>
.life-points-container {
  height: 70px;
  width: 150px;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  background-color: rgba(255,255,255,0.4)
}

p {
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
