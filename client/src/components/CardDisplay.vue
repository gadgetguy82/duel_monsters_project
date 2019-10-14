<template lang="html">
  <div class="card-display-container">
    <h2>{{ display.title }}</h2>
    <input class="search" type="text" placeholder="Enter name of card..." v-model="display.searchTerm" v-on:input="findCard">
    <img :src="display.source" v-on:click="displayInfo">
    <div class="button-select-container" v-if="display.source">
      <button class="develop-button" type="button" v-on:click="display.index = selectPrev(display)">&#8592;</button>
      <button class="develop-button" type="button" v-on:click="interactWithDB">{{ display.buttonText }}</button>
      <button class="develop-button" type="button" v-on:click="display.index = selectNext(display)">&#8594;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-display',
  props: ['eventBus', 'display', 'gameArray'],
  mounted() {
    this.eventBus.$on("select-next-current", display => {
      if (this.display.current) {
        this.display.index = this.selectNext(display);
      } else {
        this.display.index = this.display.array.length - 1;
      }
    });

    this.eventBus.$on("select-prev-game", display => {
      if (!this.display.current) {
        this.display.index = this.selectPrev(display);
      }
    });
  },
  watch: {
    "display.index"() {
      this.display.card = this.display.array[this.display.index];
      this.display.source = this.display.card ? this.display.card.card_images[0].image_url : "";
    }
  },
  methods: {
    displayInfo() {
      console.log(this.display.card);
    },

    checkName(card) {
      if (this.display.current) {
        return card.name.toLowerCase().includes(this.display.searchTerm.toLowerCase()) && !this.gameArray.some(gameCard => card.id === gameCard.id);
      } else {
        return card.name.toLowerCase().includes(this.display.searchTerm.toLowerCase());
      }
    },

    findCard() {
      this.display.index = this.display.array.findIndex(this.checkName);
    },

    findCards(array, searchTerm) {
      return array.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },

    selectNext({array, index, searchTerm}) {
      if (searchTerm) {
        const subArray = thchromeis.findCards(array, searchTerm);
        this.display.subIndex = this.display.subIndex === subArray.length - 1 ? 0 : this.display.subIndex + 1;
        const subArrayCard = subArray[this.display.subIndex];
        index = array.findIndex(card => card === subArrayCard);
        if (this.display.current) {
          if (this.gameArray.some(card => card.id === subArrayCard.id)) {
            return this.selectNext({array, index, searchTerm});
          }
        }
        return index;
      } else {
        this.display.subIndex = 0;
        index = index === array.length - 1 ? 0 : index + 1;
        if (this.display.current) {
          if (this.gameArray.some(card => card.id === array[index].id)) {
            return this.selectNext({array, index, searchTerm});
          }
        }
        return index;
      }
    },

    selectPrev({array, index, searchTerm}) {
      if (searchTerm) {
        const subArray = this.findCards(array, searchTerm);
        this.display.subIndex = this.display.subIndex === 0 ? subArray.length - 1 : this.display.subIndex - 1;
        const subArrayCard = subArray[this.display.subIndex];
        index = array.findIndex(card => card === subArrayCard);
        if (this.display.current) {
          if (this.gameArray.some(card => card.id === subArrayCard.id)) {
            return this.selectPrev({array, index, searchTerm});
          }
        }
        return index;
      } else {
        this.display.subIndex = 0;
        index = index === 0 ? array.length - 1 : index - 1;
        if (this.display.current) {
          if (this.gameArray.some(card => card.id === array[index].id)) {
            return this.selectPrev({array, index, searchTerm});
          }
        }
        return index;
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
  border-radius: 10px;
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

img {
  height: 614px;
}
</style>
