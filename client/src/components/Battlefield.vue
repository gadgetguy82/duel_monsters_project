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
        <game-button v-if="battleOver" v-on:click.native="resultCheck" :text="'Continue'" :colour="'green'"></game-button>
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
import * as Constants from '@/services/constants.js';

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
      },
      battleOver: false,
      event: {
        one: "",
        two: ""
      },
      damage: 0
    }
  },
  mounted() {
    this.gameState.eventBus.$on('battle-select-monster', battleData => {
      if (this.battleOver) {
        this.resultCheck();
      }
      this.cancelBattle(battleData.player);
      this.battleCards[battleData.player] = battleData.card;
    });

    this.gameState.eventBus.$on('battle-select-target', battleData => {
      if (this.battleOver) {
        this.resultCheck();
      }
      this.cancelBattle(battleData.player);
      this.battleCards[battleData.player] = battleData.card;
    });
  },
  watch: {
    "gameState.phase"() {
      if (this.gameState.phase === Constants.SECOND_MAIN) {
        if (this.battleOver) {
          this.resultCheck();
        } else {
          eventBus1.$emit("battle-cancelled", this.battleCards.one);
          eventBus2.$emit("battle-cancelled", this.battleCards.two);
          this.battleCards.one = null;
          this.battleCards.two = null;
        }
      }
    }
  },
  methods: {
    battleWinner() {
      this.battleCards.one.hidden = false;
      this.battleCards.two.hidden = false;
      const result = GameLogic.checkDamage(this.battleCards.one, this.battleCards.two);
      this.damage = result.damage;
      if (result.cards.length < 2) {
        if (result.cards[0] === this.battleCards.one) {
          this.event.one = this.battleCards.two.position === Constants.ATTACK ? "lose" : "no-win";
          this.event.two = "win";
        } else {
          this.event.one = "win";
          this.event.two = this.battleCards.one.position === Constants.ATTACK ? "lose" : "no-win";
        }
      } else {
        this.event.one = "lose";
        this.event.two = "lose";
      }
      this.battleOver = true;
    },

    resultCheck() {
      eventBus1.$emit(this.event.one, {card: this.battleCards.one, damage: this.damage});
      eventBus2.$emit(this.event.two, {card: this.battleCards.two, damage: this.damage});
      this.battleCards.one = null;
      this.battleCards.two = null;
      this.event.one = "";
      this.event.two = "";
      this.battleOver = false;
    },

    cancelBattle(player) {
      if (this.battleCards.one && player === Constants.ONE) {
        eventBus1.$emit("battle-cancelled", this.battleCards.one);
      } else if (this.battleCards.two && player === Constants.TWO) {
        eventBus2.$emit("battle-cancelled", this.battleCards.two);
      }
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
