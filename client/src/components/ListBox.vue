<template lang="html">
  <div class="list-box-container">
    <h4>{{ text }}</h4>
    <ul class="list">
      <li v-for="pair in array">{{ pair[0] }}: {{ pair[1] }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list-box',
  props: ['text', 'array']
}
</script>

<style lang="css" scoped>
.list-box-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.list {
  border: 1px solid #000000;
  height: 50px;
  overflow: scroll;
  padding: 5px;
}

ul {
  margin: 0;
}

h4 {
  margin: 2px;
}
</style>
