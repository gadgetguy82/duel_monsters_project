<template lang="html">
  <div class="battle-hand-container">
    <!-- <p>this is the battlehand</p> -->
    <playing-card v-for="(card,index) in battleArray" :card="card" :key="index" v-on:click.native="addToBattleResult(card)"></playing-card>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js';
import Card from '@/components/Card'

export default {
  name: "battlehand",
  props: ['player'],
  data(){
    return {
      battleArray: []
    }
  },
  mounted(){
    if (this.player === "one") {
      eventBus1.$on('select-card', card => {
        this.battleArray.push(card);
      })
    } else {
      eventBus2.$on('select-card', card => {
        this.battleArray.push(card);
      })
    }
  },
  methods: {
    addToBattleResult(card) {
      if (this.player === "one") {
        eventBus1.$emit('select-battlecard', card);
      } else {
        eventBus2.$emit('select-battlecard', card);
      }
    }
  },
  components: {
    "playing-card" : Card
  }
}
</script>

<style lang="css" scoped>
.battle-hand-container{
  border-width: 1px;
  border-style: solid;
  height: 150px;
  width: 500px;
  display: flex;
}
</style>
