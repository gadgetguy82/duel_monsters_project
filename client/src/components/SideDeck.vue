<template lang="html">
  <div class="side-deck-container">
    <h4>Side Deck</h4>
    <div class="side-deck">
      <div class="layer">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'side-deck'
}
</script>

<style lang="css" scoped>
h4 {
  margin: 0;
  padding: 0 10px;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

.side-deck-container {
  text-align: center;
}

.side-deck {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 145px;
  background-image: url("../../public/img/card_back.png");
  background-repeat: no-repeat;
  background-size: 100px;
}

.layer {
  background-color: rgba(204, 204, 0, 0.7);
  border-radius: 5px;
  top: 0;
  left: 0;
  width: 100%;
  height: 99.9%;
}
</style>
