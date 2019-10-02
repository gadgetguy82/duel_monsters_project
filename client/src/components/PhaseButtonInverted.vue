<template lang="html">
  <button type="button">{{ text }}</button>
</template>

<script>
export default {
  name: 'pretty-button-inverted',
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
  background-color: rgb(110, 140, 200);
  border: none;
  color: white;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  width: 160px;
  height: 100px;
  position: relative;
}

button:after {
  content: "";
  position: absolute;
  left: -30px;
  bottom: 0;
  width: 0;
  height: 0;
  border-right: 30px solid rgb(110, 140, 200);
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}

button:before{
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-right: 30px solid rgb(230, 130, 100);
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}
</style>
