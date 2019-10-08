<template lang="html">
  <div class="development-info-container">
    <h2>Cards added in game database</h2>
    <div class="game-info-container">
      <p>Total of all cards: {{ type.totalCards }} - Check total: {{ type.checkTotal }}</p>
      <p>Total cards in game database: {{ game.set.length }}</p>
      <div class="list-container">
        <div class="card-type">
          <h4>Card types</h4>
          <ul class="type-count list">
            <li v-for="pair in type.allArray">{{ pair[0] }}: {{ pair[1] }}</li>
          </ul>
        </div>
        <div class="spell-type">
          <h4>Spell types</h4>
          <ul class="spell-count list">
            <li v-for="pair in type.spellArray">{{ pair[0] }}: {{ pair[1] }}</li>
          </ul>
        </div>
      </div>
    </div>
    <hr>
    <h2>Cards not in game database</h2>
    <div class="current-info-container" v-if="current.card">
      <p>Card count of the current set: {{ current.set.length }}</p>
      <h4>Description:</h4>
      <p>{{ current.card.desc }}</p>
    </div>
    <div class="development-container">
      <h4>Card attribute to add:</h4>
      <input type="text" name="attribute" value="">
      <h4>Attribute value/effect to add:</h4>
      <input type="text" name="valueEffect" value="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'development-info',
  props: ['eventBus', 'type', 'current', 'game']
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

.list-container {
  display: flex;
}

.list {
  border: 1px solid #000000;
  height: 50px;
  overflow: scroll;
  padding: 5px;
}

.card-type, .spell-type {
  flex-grow: 1;
}

ul {
  margin: 0;
}

h2 {
  text-align: center;
  margin: 5px 0;
}

h4, p {
  margin: 2px;
}
</style>
