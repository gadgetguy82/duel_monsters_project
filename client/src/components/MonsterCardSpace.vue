<template lang="html">
  <div class="monster-space-container" v-on:click="handleClick()">
    <div class="space-portrait">
      <playing-card v-if="card && card.position === 'atk'" :card="card"></playing-card>
    </div>
    <div class="space-landscape">
      <playing-card v-if="card && card.position === 'def'" :card="card"></playing-card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'monster-card-space',
  props: ['gameState', 'boardData'],
  components: {
    "playing-card": Card
  },
  data() {
    return {
      card: {},
      summon: {},
      canSummon: false,
      canTribute: false,
      tributeData: {},
      canChangePosition: false
    }
  },
  mounted() {
    this.boardData.eventBus.$on("normal-summon", card => {
      if (GameLogic.isEmpty(this.card)) {
        this.canSummon = true;
        this.summon = card;
      }
    });

    this.boardData.eventBus.$on("tribute-summon", tributeData => {
      if (!GameLogic.isEmpty(this.card)) {
        this.canTribute = true;
        this.tributeData = tributeData;
      }
    });

    this.boardData.eventBus.$on("tributes-selected", () => {
      this.canTribute = false;
    });

    this.boardData.eventBus.$on("summon-success", () => {
      this.canSummon = false;
      this.summon = {};
      this.tributeData = {};
    });

    this.boardData.eventBus.$on("lose", result => {
      if (this.card === result.card) {
        this.card = {};
      }
    });
  },
  watch: {
    "gameState.phase"() {
      if (GameLogic.checkTurn(this.boardData, this.gameState) && this.gameState.phase === "Start" && !GameLogic.isEmpty(this.card)) {
        this.canChangePosition = true;
      }
    }
  },
  methods: {
    handleClick() {
      if (GameLogic.checkMainPhase(this.boardData, this.gameState)) {
        if (this.canSummon) {
          this.card = this.summon;
          this.boardData.eventBus.$emit("summon-success", this.card);
        } else if (this.canTribute) {
          this.tributeData.tributes.push(this.card);
          this.card = {};
          this.canTribute = false;
          if (this.tributeData.tributes.length === this.tributeData.amount) {
            this.card = this.tributeData.summoningCard;
            this.boardData.eventBus.$emit("tributes-selected", this.tributeData.tributes);
            this.boardData.eventBus.$emit("summon-success", this.tributeData.summoningCard);
          }
        } else if (this.canChangePosition){
          this.card.position = this.card.position === "atk" ? "def" : "atk";
          this.canChangePosition = false;
        }
      } else if (this.gameState.phase === "Battle" && !GameLogic.isEmpty(this.card)) {
        this.card.hidden = false;
        this.boardData.eventBus.$emit("battle-select-monster", this.card);
      }
    }
  }
}
</script>

<style lang="css" scoped>
.monster-space-container {
  height: 155px;
  width: 155px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-portrait {
  height: 155px;
  width: 105px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #FFFFFF;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-landscape {
  height: 155px;
  width: 105px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #FFFFFF;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
}
</style>
