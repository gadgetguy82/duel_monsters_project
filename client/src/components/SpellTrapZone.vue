<template lang="html">
  <div :class= "{ 'yellow-magic' : player === 'one', 'blue-magic' : player === 'two' }">
    <div class="spell-trap-zone-container">

    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'spell-trap-zone',
  props: ['player', 'phase', 'turn', 'eventBus'],
  components: {
    "playing-card" : Card
  }
}
</script>

<style lang="css" scoped>
.spell-trap-zone-container {
  margin: 2px 6px;
  opacity: 1;
}

.blue-magic {
  background-image: url('../../public/img/yugioh_dark_magician.jpg');
  background-size: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 145px;
  width: 575px;
  display: flex;
  opacity: 0.7;
}

.yellow-magic {
  background-image: url('../../public/img/yugioh_exodia.jpg');
  background-size: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 145px;
  width: 575px;
  display: flex;
  opacity: 0.7;
}
</style>
