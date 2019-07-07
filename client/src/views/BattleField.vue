<template lang="html">
  <div id='battlefield'>
    <p>Battlefield View</p>
    <div class="board-container">
      <p>this is the playerboard container</p>
    </div>
    <div class="board-container">
      <p>this is the ai board container</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'battlefield'
}

</script>

<style lang="css" scoped>

.board-container{
  border-style: solid;
  border-width: 1px;
  margin: 0px;
  width: 100%;
  height: 400px;
}
</style>
