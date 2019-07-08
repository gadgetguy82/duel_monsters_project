<template lang="html">
  <div class="card">
    <h4>{{card.name}}</h4>
    <p>atk: {{card.atk}} </p>
    <p>def: {{card.def}} </p>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  name: 'card',
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
</style>
