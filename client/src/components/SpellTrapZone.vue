<template lang="html">
  <div class="magic-container" :class= "{ 'yellow' : boardData.player === 'one', 'blue' : boardData.player === 'two' }">
    <div class="spell-trap-zone">

    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';

export default {
  name: 'spell-trap-zone',
  props: ['gameState', 'boardData'],
  components: {
    "playing-card" : Card
  }
}
</script>

<style lang="css" scoped>
.spell-trap-zone {
  margin: 2px 6px;
  opacity: 1;
}

.magic-container {
  background-size: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 155px;
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
}
</style>
