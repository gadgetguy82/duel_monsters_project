<template lang="html">
  <div class="field-zone-container">
    <div class="field-zone">
      <div class="layer">
        <h4>Field Zone</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'field-zone'
}
</script>

<style lang="css" scoped>
h4 {
  margin: 0;
  padding: 0 10px;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

.field-zone-container {
  text-align: center;
}

.field-zone {
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
  background-color: rgba(34, 139, 34, 0.7);
  border-radius: 5px;
  top: 0;
  left: 0;
  width: 100%;
  height: 99.9%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
