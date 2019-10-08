<template lang="html">
  <div class="card-display-container">
    <h2>{{ display.title }}</h2>
    <input class="search" type="text" value="" placeholder="Enter name of card..." v-model="display.searchTerm" v-on:input="display.index = findCard">
    <img :src="display.source">
    <div class="button-select-container" v-if="display.source">
      <button class="develop-button" type="button" v-on:click="display.index = selectPrev(display)">&#8592;</button>
      <button class="develop-button" type="button" v-on:click="interactWithDB">{{ display.buttonText }}</button>
      <button class="develop-button" type="button" v-on:click="display.index = selectNext(display)">&#8594;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game-card-display',
  props: ['eventBus', 'display', 'gameSet'],
  mounted() {
    this.eventBus.$on("select-prev", display => {
      this.display.index = this.selectPrev(display);
    });
  },
  watch: {
    "display.index"() {
      this.display.card = this.display.set[this.display.index];
      this.display.source = this.display.card ? this.display.card.card_images[0].image_url : "";
    }
  },
  methods: {
    findCard() {
      return this.display.set.findIndex(card => card.name.toLowerCase().includes(this.display.searchTerm.toLowerCase()));
    },

    findCards(set, searchTerm) {
      return set.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    selectNext({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.display.subIndex = this.display.subIndex === subSet.length - 1 ? 0 : this.display.subIndex + 1;
        const subSetCard = subSet[this.display.subIndex];
        return set.findIndex(card => card === subSetCard);
      } else {
        this.display.subIndex = 0;
        return index = index === set.length - 1 ? 0 : index + 1;
      }
    },

    selectPrev({set, index, searchTerm}) {
      if (searchTerm) {
        const subSet = this.findCards(set, searchTerm);
        this.display.subIndex = this.display.subIndex === 0 ? subSet.length - 1 : this.display.subIndex - 1;
        const subSetCard = subSet[this.display.subIndex];
        return set.findIndex(card => card === subSetCard);
      } else {
        this.display.subIndex = 0;
        return index = index === 0 ? set.length - 1 : index - 1;
      }
    },

    interactWithDB() {
      if (this.display.current) {
        this.eventBus.$emit("add-card", this.display);
      } else {
        this.eventBus.$emit("delete-card", this.display);
      }
    }
  }
}
</script>

<style lang="css" scoped>
.card-display-container {
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
