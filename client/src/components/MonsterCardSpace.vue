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
import * as Constants from '@/services/constants.js';

export default {
  name: 'monster-card-space',
  props: ['gameState', 'playerData'],
  components: {
    "playing-card": Card
  },
  data() {
    return {
      card: {},
      summonCard: {},
      tributeData: {
        tributes: []
      },
      canSummon: false,
      canTribute: false,
      canChangePosition: false,
      canAttack: false,
      canBeTargetted: false,
      spaceSelected: false
    }
  },
  mounted() {
    this.playerData.eventBus.$on("normal-summon", card => {
      if (GameLogic.isEmpty(this.card) && GameLogic.checkMainPhase(this.gameState, this.playerData)) {
        this.canSummon = true;
        this.summonCard = card;
      }
    });

    this.playerData.eventBus.$on("tribute-summon", tributeData => {
      if (!GameLogic.isEmpty(this.card) && GameLogic.checkMainPhase(this.gameState, this.playerData) && !this.card.initial) {
        this.canTribute = true;
        this.tributeData = tributeData;
      }
    });

    this.playerData.eventBus.$on("summon-success", () => {
      this.canSummon = false;
      this.summonCard = {};
      this.canTribute = false;
      this.tributeData = {
        tributes: []
      };
    });

    this.gameState.eventBus.$on("battle-select-attacker", () => {
      if (!GameLogic.checkTurn(this.gameState, this.playerData) && !GameLogic.isEmpty(this.card)) {
        this.canBeTargetted = true;
      }
    });

    this.gameState.eventBus.$on("battle-over", () => {
      if (!GameLogic.checkTurn(this.gameState, this.playerData) && !GameLogic.isEmpty(this.card)) {
        this.canBeTargetted = false;
      }
    });

    this.playerData.eventBus.$on("win", result => {
      this.returnCard(result.card);
    });

    this.playerData.eventBus.$on("no-win", result => {
      this.returnCard(result.card);
    });

    this.playerData.eventBus.$on("lose", () => {
      if (this.spaceSelected) {
        this.canBeTargetted = false;
        this.spaceSelected = false;
      }
    });

    this.playerData.eventBus.$on("battle-cancelled", card => {
      if (this.spaceSelected) {
        this.returnCard(card);
        if (GameLogic.checkBattlePhase(this.gameState, this.playerData)) {
          this.canAttack = true;
        } else if (this.gameState.phase === Constants.BATTLE) {
          this.canBeTargetted = true;
        }
      }
    });

    this.gameState.eventBus.$on("monster-zone-atk", card => {
      if (this.card[card.affects.on] === card.affects[card.affects.on]) {
        this.card.atk = parseInt(this.card.atk) + parseInt(card.effect["monster-zone-atk"]);
      }
    });

    this.gameState.eventBus.$on("monster-zone-def", card => {
      if (this.card[card.affects.on] === card.affects[card.affects.on]) {
        this.card.def = parseInt(this.card.def) + parseInt(card.effect["monster-zone-def"]);
      }
    });

    this.gameState.eventBus.$on("playing-hand-level", card => {
      if (this.card[card.affects.on] === card.affects[card.affects.on]) {
        this.card.level = parseInt(this.card.level) + parseInt(card.effect["playing-hand-level"]);
      }
    });
  },
  watch: {
    "gameState.phase"() {
      if (GameLogic.checkDrawPhase(this.gameState, this.playerData) && !GameLogic.isEmpty(this.card)) {
        this.canChangePosition = true;
        this.card.initial = false;
      } else if (GameLogic.checkBattlePhase(this.gameState, this.playerData) && !GameLogic.isEmpty(this.card)) {
        this.canAttack = true
        if (this.playerData.player === Constants.ONE && this.playerData.firstTurn) {
          this.canAttack = false;
        }
      } else if (GameLogic.checkMainPhase(this.gameState, this.playerData) && !GameLogic.isEmpty(this.card)) {
        this.canAttack = false;
        this.canBeTargetted = false;
      }
    }
  },
  methods: {
    handleClick() {
      switch(true) {
        case this.canSummon:
          this.summon();
          break;
        case this.canTribute:
          this.tribute();
          break;
        case this.canAttack:
          this.attack();
          break;
        case this.canBeTargetted:
          this.selectTarget();
          break;
        case this.canChangePosition:
          this.changePosition();
          break;
      }
    },

    summon() {
      this.card = this.summonCard;
      if (!GameLogic.isEmpty(this.card.buff)) {
        Object.entries(this.card.buff).forEach(([key, val]) => {
          this.card[key] = val;
        });
      }
      this.playerData.eventBus.$emit("summon-success", this.card);
    },

    tribute() {
      this.tributeData.tributes.push(this.card);
      this.playerData.eventBus.$emit("tribute-selected", this.card);
      this.card = {};
      this.canTribute = false;
      this.canChangePosition = false;
      if (this.tributeData.tributes.length === this.tributeData.amount) {
        this.card = this.tributeData.summoningCard;
        this.playerData.eventBus.$emit("summon-success", this.card);
      }
    },

    changePosition() {
      if (GameLogic.checkMainPhase(this.gameState, this.playerData)) {
        if (this.card.position === Constants.DEFEND && this.card.hidden) {
          this.card.hidden = false;
        }
        this.card.position = this.card.position === Constants.ATTACK ? Constants.DEFEND : Constants.ATTACK;
        this.card.change = true;
        this.canChangePosition = false;
      }
    },

    attack() {
      this.gameState.eventBus.$emit("battle-select-attacker", {card: this.card, player: this.playerData.player});
      this.canAttack = false;
      this.spaceSelected = true;
      this.card = {};
    },

    selectTarget() {
      this.gameState.eventBus.$emit("battle-select-target", {card: this.card, player: this.playerData.player});
      this.canBeTargetted = false;
      this.spaceSelected = true;
      this.card = {};
    },

    returnCard(card) {
      if (this.spaceSelected) {
        card.change = false;
        this.card = card;
        this.spaceSelected = false;
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
