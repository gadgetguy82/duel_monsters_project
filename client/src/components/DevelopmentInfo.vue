<template lang="html">
  <div class="development-info-container">
    <h2>Cards info from whole database</h2>
    <div class="db-info-container">
      <p>Total of all cards: {{ type.totalCards }} - Check total: {{ type.checkTotal }}</p>
      <div class="list-container">
        <list-box :text="'Card types'" :array="type.allArray"></list-box>
        <list-box :text="'Spell types'" :array="type.spellArray"></list-box>
      </div>
    </div>
    <hr>
    <h2>Cards added in game collection</h2>
    <p>Total cards in game collection: {{ game.set.length }}</p>
    <attribute-box :card="game.card"></attribute-box>
    <hr>
    <h2>Cards not in game collection</h2>
    <div class="current-info-container" v-if="current.card.name">
      <p>Current set is {{ current.card.type }}</p>
      <p>Total cards in current set collection: {{ current.set.length }}</p>
    </div>
    <attribute-box :card="current.card"></attribute-box>
    <h4>Description:</h4>
    <p>{{ current.card.desc }}</p>
  </div>
</template>

<script>
import AttributeBox from '@/components/AttributeBox.vue';
import ListBox from '@/components/ListBox.vue';

export default {
  name: 'development-info',
  props: ['eventBus', 'type', 'current', 'game'],
  components: {
    "attribute-box": AttributeBox,
    "list-box": ListBox
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

.card-type, .spell-type {
  flex-grow: 1;
}

h2 {
  text-align: center;
  margin: 5px 0;
}

h4, p {
  margin: 2px;
}
</style>
