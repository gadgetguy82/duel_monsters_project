<template lang="html">
  <button type="button" :class="colour">{{ text }}</button>
</template>

<script>
export default {
  name: 'game-button',
  props: ['text', 'colour'],
  methods: {
    handleClick(event) {
      event.preventDefault();
    }
  }
}
</script>

<style lang="css" scoped>
button {
  border: none;
  color: #FFFFFF;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}

.blue {
  background-color: #0000FF;
}

.red {
  background-color: #FF0000;
}

.green {
  background-color: #00FF00;
  color: #000000;
}
</style>
