<template lang="html">
  <div id="store">
    <div id="store-container">
      <h1>Duel Monsters Store</h1>
      <div class="store-cards-container">
        <div class="store-card" v-for="(card) in storeCards">
          <p class="card-title">{{card.name}}</p>
          <img :src="getImage(card.id)">
          <!-- <img :src="card.card_images[0].image_url_small"> -->
          <game-button :text="'Buy!'"></game-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton.vue';
import DBService from '@/services/db_service';
import * as Helpers from '@/services/helpers.js';

export default {
  name: 'store',
  props: ['allCards'],
  components: {
    "game-button": GameButton
  },
  data() {
    return {
      storeCards: [],
      arrayOfSetCodes: [],
      arrayOfSetNames: [],
      path: "http:localhost:3000/api/duel_monsters_game/cards/image/small/",
      folder: "small/"
    }
  },
  mounted() {
    this.storeCards = this.allCards.slice(0, 120);

    this.allCards.forEach(card => {
      if (card.card_sets) {
        card.card_sets.forEach(set => {
          if (!this.arrayOfSetCodes.includes(set.set_code)) {
            this.arrayOfSetCodes.push(set.set_code);
          }
          if (!this.arrayOfSetNames.includes(set.set_name)) {
            this.arrayOfSetNames.push(set.set_name);
          }
        });
      }
    });
  },
  methods: {
    getImage(id) {
      return DBService.getImage(id, this.folder, "cards/");
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  margin-top: 0;
  background-color: rgba(255, 255, 255, 0.7);
}

.store-cards-container {
 display: flex;
 flex-wrap: wrap;
 max-height: 800px;
 overflow: scroll;
}

.store-card {
  background-color: rgba(255, 255, 255, 0.7);
  border-width: 1px;
  border-style: solid;
  margin: 5px;
  padding: 5px
}

img, .store-card{
  width: 100px
}

.card-title{
  height: 40px
}

input {
  margin: 5px;
  font-size: 16px;
}
</style>
