<template lang="html">
  <div class="development-info-container">
    <h2>Cards added database info</h2>
    <div class="game-info-container">
      <p>Card count of all cards: {{ type.totalCards }}</p>
      <p>Card count in database for game: {{ game.set.length }}</p>
      <ul class="type-count list">
        <li v-for="pair in type.allArray">{{ pair[0] }}: {{ pair[1] }}</li>
      </ul>
      <ul class="spell-type-count list">
        <li v-for="pair in type.spellArray">{{ pair[0] }}: {{ pair[1] }}</li>
      </ul>
    </div>
    <h2>Card info of the current card being worked on</h2>
    <div class="current-info-container" v-if="current.card">
      <p>Card count of the current set: {{ current.set.length }}</p>
      <h4>Description:</h4>
      <p>{{ current.card.desc }}</p>
    </div>
    <div class="console-container">
      <h4>Console:</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'development-info',
  props: ['type', 'current', 'game']
}
</script>

<style lang="css" scoped>
.development-info-container {
  width: 420px;
  margin: 10px;
  padding: 5px;
  border: 5px solid #000000;
  background-color: rgba(255, 255, 255, 0.7);
}

.list {
  border: 1px solid #000000;
  height: 50px;
  overflow: scroll;
  padding: 5px;
}

h2 {
  text-align: center;
  margin: 5px 0;
}

h4, p {
  margin: 2px;
}
</style>
