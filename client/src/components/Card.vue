<template lang="html">
  <div class="card" v-on:click="addToBattleHand">
    <h4>{{card.name}}</h4>
    <p>atk: {{card.atk}} </p>
    <p>def: {{card.def}} </p>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  name: 'card',
  props: ['card'],
  methods: {
    addToBattleHand(){
      eventBus.$emit('select-card', this.card )
    }
  }

}
</script>

<style lang="css" scoped>
.card{
  border-style: solid;
  border-width: 1px;
  width: 100px;
  height: 150px;
}
</style>
