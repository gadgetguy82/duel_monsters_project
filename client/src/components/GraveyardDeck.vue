<template lang="html">
  <div class="graveyard-deck-container">
    <div class="graveyard-deck">
      <playing-card v-if="cards.length > 0" :card="cards[cards.length-1]"></playing-card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';

export default {
  name: 'graveyard-deck',
  props: ['player', 'eventBus'],
  components: {
    "playing-card" : Card
  },
  data() {
    return {
      cards: []
    }
  },
  mounted() {
    this.eventBus.$on('lose', result => {
      if (result.card.name !== "null_card") {
        this.cards.push(result.card);
      }
    });

    this.eventBus.$on('tributes-selected', tributes => {
      for (let card of tributes) {
        this.cards.push(card);
      }
    });
  }
}
</script>

<style lang="css" scoped>
h4 {
  margin: 0;
  padding: 0 10px;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

.graveyard-deck-container {
  text-align: center;
}

.graveyard-deck {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 150px;
  background-image: url("../../public/img/gravestone.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.7;
  margin: 15px;
}
</style>
