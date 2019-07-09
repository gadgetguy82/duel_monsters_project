<template lang="html">
  <button type="button">{{ text }}</button>
</template>

<script>
export default {
  name: 'pretty-button',
  props: ['text'],
  methods: {
    handleClick(event){
      event.preventDefault()
    }
  }
}
</script>

<style lang="css" scoped>

button{
  background-color: rgba(100, 250, 140, 0.85);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 200px;
  height: 100px;
  position: relative;
}

button:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 30px solid rgba(230, 130, 100, 0.85);
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}

button:before {
  content: "";
  position: absolute;
  right: -30px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 30px solid rgba(100, 250, 140, 0.85);
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}
</style>
