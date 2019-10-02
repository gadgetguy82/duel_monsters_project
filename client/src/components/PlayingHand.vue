<template lang="html">
  <div class="playing-hand-container">
    <div class="playing-hand">
      <playing-card v-for="(card,index) in playerHand" :key="index" :card="card" v-on:click.native="summon(card)"></playing-card>
    </div>
    <div class="button-container">
      <game-button v-if="canChoosePosition" v-on:click.native="setAttack(summoningCard)" :text="'Attack'" :colour="'red'"></game-button>
      <game-button v-if="canChoosePosition" v-on:click.native="setDefend(summoningCard)" :text="'Defend'" :colour="'blue'"></game-button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'playing-hand',
  props: ['gameState', 'playerData'],
  components: {
    "playing-card": Card,
    "game-button": Button
  },
  data() {
    return {
      playerHand: [],
      monsterZoneHasSpace: true,
      summoningCard: {},
      canChoosePosition: false,
      tributeData: {}
    }
  },
  mounted() {
    this.playerData.eventBus.$on("draw-card", card => {
      card.hidden = false;
      this.playerHand.push(card);
    });

    this.playerData.eventBus.$on("monster-zone-spaces", spaces => this.monsterZoneHasSpace = spaces);

    this.playerData.eventBus.$on("summon-success", card => {
      GameLogic.removeCard(card, this.playerHand);
      this.canChoosePosition = false;
    });
  },
  watch: {
    "gameState.phase"() {
      if ((GameLogic.checkTurn(this.playerData, this.gameState) && this.gameState.phase === "Draw") || (!GameLogic.checkTurn(this.playerData, this.gameState) && this.gameState.phase === "Start")) {
        for (let card of this.playerHand) {
          card.hidden = !card.hidden;
        }
      }
    },

    playerHand() {
      if (this.playerData.firstTurn && this.playerHand.length === this.playerData.firstDrawAmount) {
        this.playerData.eventBus.$emit("draw-max");
      }
    }
  },
  methods: {
    summon(card) {
      if (GameLogic.checkMainPhase(this.playerData, this.gameState)) {
        this.summoningCard = card;
        if (this.monsterZoneHasSpace && parseInt(card.level) < 5) {
          this.canChoosePosition = true;
          this.playerData.eventBus.$emit("normal-summon", this.summoningCard);
          this.tributeData = {};
        } else if (4 < parseInt(card.level) && parseInt(card.level) < 7) {
          this.canChoosePosition = true;
          this.tributeData.summoningCard = this.summoningCard;
          this.tributeData.amount = 1;
          this.tributeData.tributes = [];
          this.playerData.eventBus.$emit("tribute-summon", this.tributeData);
          this.tributeData = {};
        } else if (parseInt(card.level) >= 7) {
          this.canChoosePosition = true;
          this.tributeData.summoningCard = this.summoningCard;
          this.tributeData.amount = 2;
          this.tributeData.tributes = [];
          this.playerData.eventBus.$emit("tribute-summon", this.tributeData);
          this.tributeData = {};
        }
      }
    },

    setAttack(card) {
      card.position = "atk";
      card.hidden = false;
    },

    setDefend(card) {
      card.position = "def";
      card.hidden = true;
    }
  }
}
</script>

<style lang="css" scoped>
.playing-hand-container {
  background-image: url('../../public/img/playinghand_background.jpg');
  background-size: contain;
  background-position: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 170px;
  width: 510px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  opacity: 0.7;
}

.playing-hand {
  display: flex;
}

.button-container {
  display: flex;
  justify-content: space-around;
}

button {
  width: 200px;
}
</style>
