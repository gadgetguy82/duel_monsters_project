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
  props: ['emptyHand'],
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
    });
    eventBus2.$on('select-battlecard', card => {
      this.playerTwoCard = card;
    });

    eventBus1.$on('empty-battlehand', empty => {
      this.playerOneCard = empty;
    });
    eventBus2.$on('empty-battlehand', empty => {
      this.playerTwoCard = empty;
    });
  },
  methods: {
    battleWinner(){
      if ((this.playerOneCard !== null) && (this.playerTwoCard !== null)) {
        const playerOneAtk = parseInt(this.playerOneCard.atk);
        const playerTwoAtk = parseInt(this.playerTwoCard.atk);
        const playerOneDef = parseInt(this.playerOneCard.def);
        const playerTwoDef = parseInt(this.playerTwoCard.def);
        let damage = 0;
        if (this.playerOneCard.position === "atk" && this.playerTwoCard.position === "atk") {
          if (playerOneAtk < playerTwoAtk) {
            damage = playerOneAtk - playerTwoAtk;
            eventBus1.$emit('lose', {
              card: this.playerOneCard,
              damage: damage
            });
          } else if (playerOneAtk > playerTwoAtk) {
            damage = playerTwoAtk - playerOneAtk;
            eventBus2.$emit('lose', {
              card: this.playerTwoCard,
              damage: damage
            });
          } else {
            eventBus1.$emit('lose', {
              card: this.playerOneCard,
              damage: damage
            });
            eventBus2.$emit('lose', {
              card: this.playerTwoCard,
              damage: damage
            });
          }
        } else if (this.playerOneCard.position === "atk" && this.playerTwoCard.position === "def") {
          if (playerOneAtk < playerTwoDef) {
            damage = playerOneAtk - playerTwoDef;
            eventBus1.$emit('nowin', {
              card: this.playerOneCard,
              damage: damage
            });
          } else if (playerOneAtk > playerTwoDef) {
            eventBus2.$emit('lose', {
              card: this.playerTwoCard,
              damage: damage
            });
          }
        } else {
          if (playerOneDef < playerTwoAtk) {
            eventBus1.$emit('lose', {
              card: this.playerOneCard,
              damage: damage
            });
          } else if (playerOneDef > playerTwoAtk) {
            damage = playerTwoAtk - playerOneDef;
            eventBus2.$emit('nowin', {
              card: this.playerTwoCard,
              damage: damage
            });
          }
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
}

.result-container {
  display: flex;
  align-items: center;
  margin: 5px 0;
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
