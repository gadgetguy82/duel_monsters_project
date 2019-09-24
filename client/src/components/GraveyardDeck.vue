<template lang="html">
  <div class="graveyard-deck-container">
    <playing-card v-if="cards.length > 0" :card="cards[cards.length-1]"></playing-card>
  </div>
</template>

<script>
import Card from '@/components/Card'

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

    this.eventBus.$on('sacrifices-selected', sacrifices => {
      for (let card of sacrifices) {
        this.cards.push(card);
      }
    });
  }
}
</script>

<style lang="css" scoped>
.graveyard-deck-container{
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 150px;
  background-image: url("../../public/img/gravestone.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.7;
}
</style>
