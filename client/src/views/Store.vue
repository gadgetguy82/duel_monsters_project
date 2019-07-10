<template lang="html">

  <div id="store">
    <div id="store-container">
      <h1>Duel Monsters Store</h1>
      <div class="store-cards-container">
        <div class="store-card" v-for="(card) in normalStoreCards">
          <p>{{card.name}}</p>
          <button>Buy!</button>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import DBService from '@/services/db_service'

export default {
  name: 'store',
  data() {
    return {
      allStoreCards: [],
      normalStoreCards: []
    }
  },
  mounted() {
    DBService.getAllCards()
    .then(cards => { this.allStoreCards = cards
      this.allStoreCards.forEach((card) => {
        if ((card.type === "Normal Monster") && (this.normalStoreCards.length < 100)) {
          this.normalStoreCards.push(card)
        }
      });
    });
  }
}
</script>

<style lang="css" scoped>
/* #store-container {
  height: 809px;

} */
.store-cards-container {
 display: flex;
 flex-wrap: wrap;
}

.store-card {
  background-color: rgba(255, 255, 255, 0.5);
  border-width: 1px;
  border-style: solid;
  width: 100px;
}
</style>
