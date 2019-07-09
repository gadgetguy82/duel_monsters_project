<template lang="html">
  <div class="result">
    <div class="result-container">
      <div class="player-one">
        <h4>Player One</h4>
        <playing-card v-if="playerOneCard" :card="playerOneCard"></playing-card>
      </div>
      <div>
        <p>----Battle Result Area----</p>
        <button v-if="playerOneCard && playerTwoCard" v-on:click="battleWinner">Fight!!!</button>
      </div>
      <div class="player-two">
        <h4>Player Two</h4>
        <playing-card v-if="playerTwoCard" :card="playerTwoCard"></playing-card>
      </div>
    </div>
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
      // this.battleWinner();
    });
    eventBus2.$on('select-battlecard', card => {
      this.playerTwoCard = card;
      // this.battleWinner();
    });

  },
  methods: {
    battleWinner(){
      if ((this.playerOneCard !== null) && (this.playerTwoCard !== null)) {
        const playerOneAtk = parseInt(this.playerOneCard.atk);
        const playerTwoAtk = parseInt(this.playerTwoCard.atk);
        if (playerOneAtk < playerTwoAtk) {
          let damage = playerOneAtk - playerTwoAtk;
          eventBus1.$emit('lose', {
            card: this.playerOneCard,
            damage: damage
          });
        } else {
          let damage = playerTwoAtk - playerOneAtk;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: rgba(251, 140, 109, 0.5);
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
}

.result-container {
  display: flex;
  align-items: center;
}

.player-one, .player-two {
  width: 100px;
  height: 170px;
  border: 1px solid #000000;
  border-radius: 5px;
}

h4 {
  margin: 0;
}

</style>
