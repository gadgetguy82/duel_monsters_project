<template lang="html">
  <div class="game-card-container">
    <h2>Cards added to game</h2>
    <input class="search" type="text" value="" placeholder="Enter name of card..." v-model="game.searchTerm" v-on:input="game.index = findCard(game)">
    <img :src="game.source">
    <div class="button-select-container" v-if="game.source">
      <button class="develop-button" type="button"  v-on:click="game.index = selectPrev(game)">&#8592;</button>
      <button class="develop-button" type="button" v-on:click="deleteFromGameDB(game)">Remove Card</button>
      <button class="develop-button" type="button" v-on:click="game.index = selectNext(game)">&#8594;</button>
    </div>
  </div>
</template>

<script>
import DBService from '@/services/db_service';

export default {
  name: 'game-card-display',
  props: ['eventBus', 'game'],
  mounted() {
    this.eventBus.$on("card-added", card => {

    });
  },
  methods: {
    findCard({set, searchTerm}) {
      return set.findIndex(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    findCards(set, searchTerm) {
      return set.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    selectNext({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.game.subIndex = this.game.subIndex === subSet.length - 1 ? 0 : this.game.subIndex + 1;
        const subSetCard = subSet[this.game.subIndex];
        return set.findIndex(card => card === subSetCard);
      } else {
        this.game.subIndex = 0;
        return index = index === set.length - 1 ? 0 : index + 1;
      }
    },

    selectPrev({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.game.subIndex = this.game.subIndex === 0 ? subSet.length - 1 : this.game.subIndex - 1;
        const subSetCard = subSet[this.game.subIndex];
        return set.findIndex(card => card === subSetCard);
      } else {
        this.game.subIndex = 0;
        return index = index === 0 ? set.length - 1 : index - 1;
      }
    },

    deleteFromGameDB({set, index}) {
      const card = set[index];
      DBService.deleteCard(card._id, "game_cards/");
      this.game.set.splice(this.game.index, 1);
      this.game.index = this.selectPrev(this.game);
      this.game.card = this.game.set[this.game.index];
      this.game.source = this.game.card.card_images[0].image_url;
    }
  }
}
</script>

<style lang="css" scoped>
.game-card-container {
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  width: 420px;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
  border: 5px solid #000000;
}

.search {
  font-size: 16px;
  margin: 5px 0;
}

.button-select-container {
  display: flex;
  justify-content: space-evenly;
}

.develop-button {
  border: solid;
  border-width: 1px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 2px 2px;
  background-color: #00FF00;
  color: #000000;
  margin: 5px;
  flex-grow: 1;
  cursor: pointer;
}

h2 {
  text-align: center;
  margin: 5px 0;
}
</style>
