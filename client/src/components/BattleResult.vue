<template lang="html">
  <div class="result">
    <playing-card v-if="playerOneCard" :card="playerOneCard"></playing-card>
    <p>----Battle Result Area----</p>
    <playing-card v-if="playerTwoCard" :card="playerTwoCard"></playing-card>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js'
import Card from '@/components/Card'

export default {
  name: 'battle-result',
  data(){
    return{
      playerOneCard: null,
      playerTwoCard: null,

    }
  },
  components: {
    "playing-card" : Card
  },
  mounted() {
    eventBus1.$on('select-battlecard', card => {
      this.playerOneCard = card;
      this.battleWinner();
    });
    eventBus2.$on('select-battlecard', card => {
      this.playerTwoCard = card;
      this.battleWinner();
    });

  },
  methods: {
    battleWinner(){
      if ((this.playerOneCard !== null) && (this.playerTwoCard !== null)) {
        const playerOneAtk = parseInt(this.playerOneCard.atk);
        const playerTwoAtk = parseInt(this.playerTwoCard.atk);
        if (playerOneAtk < playerTwoAtk) {
          let damage = playerOneAtk - playerTwoAtk;
          console.log('if', damage);
          eventBus1.$emit('lose', {
            card: this.playerOneCard,
            damage: damage
          });
        } else {
          let damage = playerTwoAtk - playerOneAtk;
          console.log('else', damage);
          eventBus2.$emit('lose', {
            card: this.playerTwoCard,
            damage: damage
          });
        }
        this.playerOneCard = null;
        this.playerTwoCard = null;
      }
    }
  }
}
</script>

<style lang="css" scoped>

  .result {
    z-index: 1;
  }
</style>
