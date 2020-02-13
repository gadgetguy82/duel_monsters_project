<template lang="html">
  <div class="spell-trap-container" :class= "{ 'yellow' : playerData.player === 'one', 'blue' : playerData.player === 'two' }">
    <spell-trap-space :gameState="gameState" :playerData="playerData"></spell-trap-space>
    <spell-trap-space :gameState="gameState" :playerData="playerData"></spell-trap-space>
    <spell-trap-space :gameState="gameState" :playerData="playerData"></spell-trap-space>
    <spell-trap-space :gameState="gameState" :playerData="playerData"></spell-trap-space>
    <spell-trap-space :gameState="gameState" :playerData="playerData"></spell-trap-space>
  </div>
</template>

<script>
import Card from '@/components/Card';
import SpellTrapSpace from '@/components/SpellTrapSpace';

export default {
  name: 'spell-trap-zone',
  props: ['gameState', 'playerData'],
  components: {
    "playing-card" : Card,
    "spell-trap-space" : SpellTrapSpace
  }
}
</script>

<style lang="css" scoped>
.spell-trap-zone {
  margin: 2px 6px;
  opacity: 1;
}

.spell-trap-container {
  background-size: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 170px;
  width: 780px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0.7;
}

.blue {
  background-image: url('../../public/img/yugioh_dark_magician.jpg');
}

.yellow {
  background-image: url('../../public/img/yugioh_exodia.jpg');
  background-position: center;
}
</style>
