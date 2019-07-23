<template lang="html">
  <div class="result">
    <div class="result-container">
      <div class="player-one">
        <h4>Player One</h4>
        <playing-card v-if="playerOneCard" :card="playerOneCard"></playing-card>
      </div>
      <div class="result-center">
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
import GameLogic from '@/services/game_logic.js'

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
    battleWinner() {
      const result = GameLogic.checkDamage(this.playerOneCard, this.playerTwoCard);
      if (result.cards.length < 2) {
        if (result.cards[0] === this.playerOneCard) {
          if (this.playerTwoCard.position === "atk") {
            eventBus1.$emit('lose', {
              card: result.cards[0],
              damage: result.damage
            });
          } else {
            eventBus1.$emit('nowin', {
              card: result.cards[0],
              damage: result.damage
            });
          }
        } else {
          if (this.playerOneCard.position === "atk") {
            eventBus2.$emit('lose', {
              card: result.cards[0],
              damage: result.damage
            });
          } else {
            eventBus2.$emit('nowin', {
              card: result.cards[0],
              damage: result.damage
            });
          }
        }
      } else {
        if (result.cards[0].position === "atk" && result.cards[1].position === "atk") {
          eventBus1.$emit('lose', {
            card: result.cards[0],
            damage: result.damage
          });
          eventBus2.$emit('lose', {
            card: result.cards[1],
            damage: result.damage
          });
        }
      }
      this.playerOneCard = null;
      this.playerTwoCard = null;
    }
  }
}
</script>

<style lang="css" scoped>

.result {
  margin:5px;
  background-image: url('../../public/img/battleresult_background.jpg');
  background-size: contain;
  background-position: center;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 5px;
}

.result-container {
  display: flex;
  align-items: center;
  margin: 10px;
}

.player-one, .player-two {
  width: 100px;
  height: 170px;
  border: 1px solid #FFFFFF;
  border-radius: 5px;
  /* text-align:center; */
}

.result-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

h4 {
  margin: 0;
  padding: 0 10px;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

button {
  width: 60%;
}

</style>
