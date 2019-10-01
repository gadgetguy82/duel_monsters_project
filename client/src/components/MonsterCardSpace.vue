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
      temp: {},
      canSummon: false
    }
  },
  mounted() {
    this.boardData.eventBus.$on("normal-summon", card => {
      this.canSummon = true;
      this.temp = card;
    });

    this.boardData.eventBus.$on("summon-success", () => {
      this.canSummon = false;
      this.temp = {};
    });

    this.boardData.eventBus.$on("lose", result => {
      this.card = {};
    });
  },
  methods: {
    handleClick() {
      if (GameLogic.checkMainPhase(this.boardData, this.gameState)) {
        if (this.card === {} && this.canSummon) {
          this.card = this.temp;
          this.boardData.eventBus.$emit("summon-success", this.card);
        } else {
          this.card.position = this.card.position === "atk" ? "def" : "atk"
        }
      } else if (this.gameState.phase === "Battle") {
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
