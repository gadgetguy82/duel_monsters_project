<template lang="html">
  <div class="battle-hand-container">
    <!-- <p>this is the battlehand</p> -->
    <playing-card v-for="(card,index) in battleArray" :card="card" :key="index" v-on:click.native="addToBattleResult(card)"></playing-card>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import Card from '@/components/Card'

export default {
  name: "battlehand",
  data(){
    return {
      battleArray: []
    }
  },
  mounted(){
    eventBus.$on('select-card', card => {
      this.battleArray.push(card);
    })
  },
  methods: {
    addToBattleResult(card) {
      eventBus.$emit('select-battlecard', card);
    }
  }
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
