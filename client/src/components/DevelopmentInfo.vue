<template lang="html">
  <div class="development-info-container">
    <h2>Cards info from whole database</h2>
    <div class="db-info-container">
      <p>Total of all cards: {{ type.totalCards }} - Check total: {{ type.checkTotal }}</p>
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
    <h2>Cards added in game collection</h2>
    <div class="game-info-container">
      <p>Total cards in game collection: {{ game.set.length }}</p>
    </div>
    <attribute-box></attribute-box>
    <hr>
    <h2>Cards not in game collection</h2>
    <div class="current-info-container" v-if="current.card">
      <p>Current set is {{ current.card.type }}</p>
      <p>Total cards in current set collection: {{ current.set.length }}</p>
    </div>
    <attribute-box></attribute-box>
    <h4>Description:</h4>
    <p>{{ current.card.desc }}</p>
  </div>
</template>

<script>
import AttributeBox from '@/components/AttributeBox.vue';

export default {
  name: 'development-info',
  props: ['eventBus', 'type', 'current', 'game'],
  components: {
    "attribute-box": AttributeBox
  }
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
