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
  background-color: #FF3030;
  color: #000000;
  text-shadow: 0 0 3px #FF0000;
  cursor: pointer;
}

.development-container button {
  margin: 5px;
}

.blue {
  background-color: #0000FF;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.red {
  background-color: #FF4C4C;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.green {
  background-color: #00FF00;
}

.brown {
  background-color: #654321;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.yellow {
  background-color: #FFFF00;
}

.orange {
  background-color: #FFA500;
}

.violet {
  background-color: #8A2BE2;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.light-blue {
  background-color: #ADD8E6;
}

.dark-blue {
  background-color: #000080;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.purple {
  background-color: #551A8B;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.white {
  background-color: #FFFFFF;
}

.black {
  background-color: #000000;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
}

.gray {
  background-color: #D3D3D3;
}
</style>
