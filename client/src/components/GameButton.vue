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
  border: solid;
  border-width: 1px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  box-shadow: 2px 2px;
}

.blue {
  background-color: #0000FF;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.red {
  background-color: #FF0000;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.green {
  background-color: #00FF00;
  text-shadow: 0 0 3px #FF0000;
}

.yellow {
  background-color: #FFFF00;
  text-shadow: 0 0 3px #FF0000;
}
</style>
