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
    <p>Total cards in game collection: {{ game.array.length }}</p>
    <div class="button-container">
      <game-button v-on:click.native="writeServerFile" :text="textWrite" :colour="'white'"></game-button>
      <game-button v-on:click.native="readServerFile" :text="textRead" :colour="'red'"></game-button>
    </div>
    <attribute-box :eventBus="eventBus" :card="game.card"></attribute-box>
    <hr>
    <h2>Cards not in game collection</h2>
    <div class="current-info-container" v-if="current.card.name">
      <p>Current set is {{ current.card.type }}</p>
      <p>Total cards in current set collection: {{ current.array.length }}</p>
      <attribute-box :eventBus="eventBus" :card="current.card"></attribute-box>
      <h4>Description:</h4>
      <p class="description">{{ current.card.desc }}</p>
    </div>
  </div>
</template>

<script>
import AttributeBox from '@/components/AttributeBox.vue';
import ListBox from '@/components/ListBox.vue';
import GameButton from '@/components/GameButton.vue';
import DBService from '@/services/db_service';

export default {
  name: 'development-info',
  props: ['eventBus', 'type', 'current', 'game'],
  components: {
    "attribute-box": AttributeBox,
    "list-box": ListBox,
    "game-button": GameButton
  },
  data() {
    return {
      textWrite: "Write DB to file",
      textRead: "Read DB from file"
    }
  },
  methods: {
    writeServerFile() {
      DBService.writeFile("game_cards/");
    },

    readServerFile() {
      // console.log(gameCards);
    }
  }
}
</script>

<style lang="css" scoped>
.development-info-container {
  width: 420px;
  margin: 10px;
  padding: 5px;
  border: 5px solid #000000;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7);
}

.list-container {
  display: flex;
}

.card-type, .spell-type {
  flex-grow: 1;
}

.button-container {
  display: flex;
}

.description {
  height: 150px;
  overflow: scroll;
}

h2 {
  text-align: center;
  margin: 5px 0;
}

h4, p {
  margin: 2px;
}

hr {
    overflow: visible;
    height: 30px;
    border-style: solid;
    border-color: #000000;
    border-width: 1px 0 0 0;
    border-radius: 20px;
    margin-bottom: 0;
}
hr:before {
    display: block;
    content: "";
    height: 30px;
    margin-top: -30px;
    border-style: solid;
    border-color: #000000;
    border-width: 0 0 1px 0;
    border-radius: 20px;
}
</style>
