<template lang="html">
  <div class="monster-space-container">
    <div class="space-portrait">

    </div>
    <div class="space-landscape">
      
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.monster-space-container {
  height: 155px;
  width: 155px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-portrait {
  height: 155px;
  width: 105px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #FFFFFF;
  position: absolute;
}

.space-landscape {
  height: 105px;
  width: 155px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #FFFFFF;
  position: absolute;
}
</style>
