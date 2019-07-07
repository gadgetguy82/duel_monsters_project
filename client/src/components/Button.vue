<template lang="html">
  <button type="button"></button>
</template>

<script>
export default {
  name: 'pretty-button',
  methods: {
    handleClick(event){
      event.preventDefault()
    }
  }
}
</script>

<style lang="css" scoped>

button{
  background-color: lightblue;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}

</style>
