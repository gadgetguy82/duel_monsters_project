<template lang="html">
  <div class="current-card-container">
    <h2>Working on current card</h2>
    <input class="search" type="text" value="" placeholder="Enter name of card..." v-model="current.searchTerm" v-on:input="current.index = findCurrentCard(current)">
    <img :src="current.source">
    <div class="button-select-container" v-if="current.source">
      <button class="develop-button" type="button" v-on:click="current.index = selectCurrentPrev(current)">&#8592;</button>
      <button class="develop-button" type="button" v-on:click="addToGameDB(current)">Add Card</button>
      <button class="develop-button" type="button" v-on:click="current.index = selectCurrentNext(current)">&#8594;</button>
    </div>
  </div>
</template>

<script>
import DBService from '@/services/db_service';

export default {
  name: 'current-card-display',
  props: ['eventBus', 'current'],
  methods: {
    findCurrentCard({set, searchTerm}) {
      return set.findIndex(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()) && !this.game.set.some(gameCard => card.id === gameCard.id));
    },

    findCards(set, searchTerm) {
      return set.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    selectCurrentNext({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.current.subIndex = this.current.subIndex === subSet.length - 1 ? 0 : this.current.subIndex + 1;
        const subSetCard = subSet[this.current.subIndex];
        index = set.findIndex(card => card === subSetCard);
        if (this.game.set.some(card => card.id === subSetCard.id)) {
          return this.selectCurrentNext({set, index, searchTerm});
        } else {
          return index;
        }
      } else {
        this.current.subIndex = 0;
        index = index === set.length - 1 ? 0 : index + 1;
        if (this.game.set.some(card => card.id === set[index].id)) {
          return this.selectCurrentNext({set, index, searchTerm});
        } else {
          return index;
        }
      }
    },

    selectCurrentPrev({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.current.subIndex = this.current.subIndex === 0 ? subSet.length - 1 : this.current.subIndex - 1;
        const subSetCard = subSet[this.current.subIndex];
        index = set.findIndex(card => card === subSetCard);
        if (this.game.set.some(card => card.id === subSetCard.id)) {
          return this.selectCurrentPrev({set, index, searchTerm});
        } else {
          return index;
        }
      } else {
        this.current.subIndex = 0;
        index = index === 0 ? set.length - 1 : index - 1;
        if (this.game.set.some(card => card.id === set[index].id)) {
          return this.selectCurrentPrev({set, index, searchTerm});
        } else {
          return index;
        }
      }
    },

    addToGameDB({set, index}) {
      const card = set[index];
      DBService.postCard(card, "game_cards")
      .then(res => this.eventBus.$emit("card-added", res));
    }
  }
}
</script>

<style lang="css" scoped>
.current-card-container {
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
