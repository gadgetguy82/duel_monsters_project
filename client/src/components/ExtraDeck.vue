<template lang="html">
  <div class="extra-deck-container">
    <h4>Extra Deck</h4>
  </div>
</template>

<script>
export default {
  name: 'extra-deck'
}
</script>

<style lang="css" scoped>
h4 {
  margin: 0;
  padding: 0 10px;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

.extra-deck-container {
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 145px;
  background-image: url("../../public/img/card_back.png");
  background-repeat: no-repeat;
  background-size: 100px;
}
</style>
