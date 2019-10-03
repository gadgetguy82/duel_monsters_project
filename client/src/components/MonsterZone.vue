<template lang="html">
  <div class="monster-zone-container" :class= "{ 'yellow' : playerData.player === 'one', 'blue' : playerData.player === 'two' }" v-on:click="checkMonsterZone">
    <monster-space :gameState="gameState" :playerData="playerData"></monster-space>
    <monster-space :gameState="gameState" :playerData="playerData"></monster-space>
    <monster-space :gameState="gameState" :playerData="playerData"></monster-space>
    <monster-space :gameState="gameState" :playerData="playerData"></monster-space>
    <monster-space :gameState="gameState" :playerData="playerData"></monster-space>
  </div>
</template>

<script>
import MonsterCardSpace from '@/components/MonsterCardSpace.vue';
import Card from '@/components/Card';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'monster-zone',
  props: ['gameState', 'playerData'],
  components: {
    "playing-card" : Card,
    "monster-space": MonsterCardSpace
  },
  data(){
    return {
      monsterZoneSpaces: 5,
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
    this.playerData.eventBus.$on("summon-success", () => {
      this.monsterZoneSpaces--;
    });

    this.playerData.eventBus.$on("tribute-summon", tributeData => {
      this.summoningCard = tributeData.summoningCard;
      this.tributeAmount = tributeData.amount;
    });

    this.playerData.eventBus.$on("tributes-selected", tributes => {
      this.monsterZoneSpaces += tributes.length;
    });

    this.playerData.eventBus.$on("lose", () => {
      if (this.monsterZoneSpaces < 5) {
        this.monsterZoneSpaces++;
      }
    });
  },
  watch: {
    monsterZoneSpaces() {
      this.playerData.eventBus.$emit("monster-zone-spaces", this.monsterZoneSpaces > 0);
    }
  },
  methods: {
    checkMonsterZone() {
      if (GameLogic.checkBattlePhase(this.gameState, this.playerData) && this.monsterZoneSpaces === 5 ) {
        this.gameState.eventBus.$emit("battle-select-target", {card: this.noCard, player: this.playerData.player});
      }
    }
  }
}
</script>

<style lang="css" scoped>
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
