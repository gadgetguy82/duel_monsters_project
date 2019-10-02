<template lang="html">
  <div class="playing-hand-container">
    <div class="playing-hand">
      <playing-card v-for="(card,index) in playerHand" :key="index" :card="card" v-on:click.native="summon(card)"></playing-card>
    </div>
    <div class="button-container">
      <button v-if="canChoosePosition" v-on:click="setAttack(summoningCard)">Attack</button>
      <button v-if="canChoosePosition" v-on:click="setDefend(summoningCard)">Defend</button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'playing-hand',
  props: ['gameState', 'boardData'],
  components: {
    "playing-card": Card
  },
  data() {
    return {
      playerHand: [],
      monsterZone: "space",
      summoningCard: {},
      canChoosePosition: false,
      tributeData: {}
    }
  },
  mounted() {
    this.boardData.eventBus.$on("draw-card", card => {
      card.hidden = false;
      this.playerHand.push(card);
    });

    this.boardData.eventBus.$on("monster-zone", full => this.monsterZone = full);

    this.boardData.eventBus.$on("summon-success", card => {
      GameLogic.removeCard(card, this.playerHand);
      this.canChoosePosition = false;
    });
  },
  watch: {
    "gameState.phase"() {
      if ((GameLogic.checkTurn(this.boardData, this.gameState) && this.gameState.phase === "Draw") || (!GameLogic.checkTurn(this.boardData, this.gameState) && this.gameState.phase === "Start")) {
        for (let card of this.playerHand) {
          card.hidden = !card.hidden;
        }
      }
    },

    playerHand() {
      if (this.boardData.firstTurn && this.playerHand.length === this.boardData.firstDrawAmount) {
        this.boardData.eventBus.$emit("draw-max");
      }
    }
  },
  methods: {
    summon(card) {
      if (GameLogic.checkMainPhase(this.boardData, this.gameState)) {
        this.summoningCard = card;
        if (this.monsterZone !== "full" && parseInt(card.level) < 5) {
          this.canChoosePosition = true;
          this.boardData.eventBus.$emit("normal-summon", this.summoningCard);
          this.tributeData = {};
        } else if (4 < parseInt(card.level) && parseInt(card.level) < 7) {
          this.canChoosePosition = true;
          this.tributeData.summoningCard = this.summoningCard;
          this.tributeData.amount = 1;
          this.tributeData.tributes = [];
          this.boardData.eventBus.$emit("tribute-summon", this.tributeData);
          this.tributeData = {};
        } else if (parseInt(card.level) >= 7) {
          this.canChoosePosition = true;
          this.tributeData.summoningCard = this.summoningCard;
          this.tributeData.amount = 2;
          this.tributeData.tributes = [];
          this.boardData.eventBus.$emit("tribute-summon", this.tributeData);
          this.tributeData = {};
        }
      }
    },

    setAttack(card) {
      card.position = "atk";
      card.hidden = false;
      this.canChoosePosition = false;
    },

    setDefend(card) {
      card.position = "def";
      card.hidden = true;
      this.canChoosePosition = false;
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
  height: 180px;
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
