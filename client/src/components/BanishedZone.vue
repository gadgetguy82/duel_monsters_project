<template lang="html">
  <div class="banished-zone-container">
    <h4>Banished Zone</h4>
    <div class="banished-zone">
      <div class="layer">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banished-zone'
}
</script>

<style lang="css" scoped>
h4 {
  margin: 0;
  padding: 0 10px;
  color: #000000;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

.banished-zone-container {
  text-align: center;
}

.banished-zone {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 145px;
  background-image: url("../../public/img/card_back.png");
  background-repeat: no-repeat;
  background-size: 100px;
  transform: rotate(-90deg);
}

.layer {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  top: 0;
  left: 0;
  width: 100%;
  height: 99.9%;
}
</style>
