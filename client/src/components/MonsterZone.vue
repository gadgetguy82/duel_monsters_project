<template lang="html">
  <div class="monster-zone-container" :class= "{ 'yellow' : boardData.player === 'one', 'blue' : boardData.player === 'two' }" v-on:click="checkMonsterZone">
    <monster-space :gameState="gameState" :boardData="boardData"></monster-space>
    <monster-space :gameState="gameState" :boardData="boardData"></monster-space>
    <monster-space :gameState="gameState" :boardData="boardData"></monster-space>
    <monster-space :gameState="gameState" :boardData="boardData"></monster-space>
    <monster-space :gameState="gameState" :boardData="boardData"></monster-space>
  </div>
</template>

<script>
import MonsterCardSpace from '@/components/MonsterCardSpace.vue';
import Card from '@/components/Card';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'monster-zone',
  props: ['gameState', 'boardData'],
  components: {
    "playing-card" : Card,
    "monster-space": MonsterCardSpace
  },
  data(){
    return {
      monsterZone: [],
      noCard: {
        name: "null_card",
        atk: 0,
        def: 0,
        card_images: [{ img_url_small: "" }],
        position: "atk"
      },
      summoningCard: null,
      tributeAmount: 0,
      tributes: []
    }
  },
  mounted(){
    this.boardData.eventBus.$on("lose", result => {
      GameLogic.removeCard(result.card, this.monsterZone);
    });

    this.boardData.eventBus.$on("tribute-summon", summonData => {
      this.summoningCard = summonData.card;
      this.tributeAmount = summonData.amount;
    });
  },
  watch: {
    monsterZone() {
      if (this.monsterZone.length === 5) {
        this.boardData.eventBus.$emit("monster-zone", "full");
      } else {
        this.boardData.eventBus.$emit("monster-zone", "space");
      }
    }
  },
  methods: {
    handleClick(card) {
      if (this.mainPhases.includes(this.gameState.phase)) {
        if (this.tributes.length < this.tributeAmount) {
          this.tributes.push(card);
          if (this.tributes.length === this.tributeAmount) {
            for (let monster of this.tributes) {
              GameLogic.removeCard(monster, this.monsterZone);
            }
            this.monsterZone.push(this.summoningCard);
            this.boardData.eventBus.$emit("tributes-selected", this.tributes);
            this.boardData.eventBus.$emit("summon-success", this.summoningCard);
            this.tributes = [];
            this.tributeAmount = 0;
            this.summoningCard = null;
          }
        }
      } else if (this.gameState.phase === "Battle") {
        this.boardData.eventBus.$emit("select-monster-card", card);
      }
    },

    checkMonsterZone() {
      if (this.monsterZone.length === 0 ) {
        this.boardData.eventBus.$emit("empty-monster-zone", this.noCard);
      }
    }
  }
}
</script>

<style lang="css" scoped>
.selected {
  background-color: green;
}

.unselected {
  background-color: white;
}

.monster-zone {
  margin: 2px 6px;
  opacity: 1;
}

.monster-zone-container {
  background-size: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 160px;
  width: 780px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0.7;
}

.blue {
  background-image: url('../../public/img/yugioh_obelisk.jpg');
}

.yellow {
  background-image: url('../../public/img/yugioh_ra.jpg');
}
</style>
