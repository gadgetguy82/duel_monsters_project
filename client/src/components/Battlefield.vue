<template lang="html">
  <div class="battlefield-container">
    <div class="battlefield">
      <div class="player-one">
        <h4>Player One</h4>
        <playing-card v-if="battleCards.one" :card="battleCards.one"></playing-card>
      </div>
      <div class="battlefield-center">
        <p>----Battlefield Area----</p>
        <game-button v-if="battleCards.one && battleCards.two" v-on:click.native="battleWinner" :text="'Fight!!!'" :colour="'red'"></game-button>
      </div>
      <div class="player-two">
        <h4>Player Two</h4>
        <playing-card v-if="battleCards.two" :card="battleCards.two"></playing-card>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js';
import Card from '@/components/Card';
import GameButton from '@/components/GameButton.vue';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'battle-field',
  props: ['gameState'],
  components: {
    "playing-card" : Card,
    "game-button": GameButton
  },
  data(){
    return{
      battleCards: {
        one: null,
        two: null
      }
    }
  },
  mounted() {
    this.gameState.eventBus.$on('battle-select-monster', battleData => {
      this.battleCards[battleData.player] = battleData.card;
    });

    this.gameState.eventBus.$on('battle-select-target', battleData => {
      this.battleCards[battleData.player] = battleData.card;
    });
  },
  methods: {
    battleWinner() {
      const result = GameLogic.checkDamage(this.battleCards.one, this.battleCards.two);
      if (result.cards.length < 2) {
        if (result.cards[0] === this.battleCards.one) {
          if (this.battleCards.two.position === "atk") {
            eventBus1.$emit('lose', {
              card: result.cards[0],
              damage: result.damage
            });
          } else {
            eventBus1.$emit('no-win', {
              card: result.cards[0],
              damage: result.damage
            });
          }
        } else {
          if (this.battleCards.one.position === "atk") {
            eventBus2.$emit('lose', {
              card: result.cards[0],
              damage: result.damage
            });
          } else {
            eventBus2.$emit('no-win', {
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
      this.battleCards.one = null;
      this.battleCards.two = null;
    }
  }
}
</script>

<style lang="css" scoped>
.battlefield-container {
  margin: 20px 10px;
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

.battlefield {
  display: flex;
  align-items: center;
  margin: 10px;
}

.player-one, .player-two {
  width: 105px;
  height: 175px;
  border: 1px solid #FFFFFF;
  border-radius: 5px;
}

.battlefield-center {
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
