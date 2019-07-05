<template lang="html">
  <div id='app'>
    <nav>
      <router-link :to="{ name: 'home' }"> Home </router-link>
      <router-link :to="{ name: 'battlefield' }"> Battlefield </router-link>
    </nav>
    <router-view id='view'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="css" scoped>
</style>
