<template lang="html">
  <div class="playing-hand-container">
    <div class="playing-hand">
      <playing-card v-for="(card,index) in playerHand" :key="index" :card="card" v-on:click.native="summonOrDiscard(card)"></playing-card>
    </div>
    <div class="button-container">
      <game-button v-if="canChoosePosition" v-on:click.native="setAttack(summoningCard)" :text="'Attack'" :colour="'red'"></game-button>
      <game-button v-if="canChoosePosition" v-on:click.native="setDefend(summoningCard)" :text="'Defend'" :colour="'blue'"></game-button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import GameButton from '@/components/GameButton.vue';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'playing-hand',
  props: ['gameState', 'playerData'],
  components: {
    "playing-card": Card,
    "game-button": GameButton
  },
  data() {
    return {
      playerHand: [],
      monsterZone: {
        spaces: 5,
        tributes: 5
      },
      canNormalSummon: false,
      summoningCard: {},
      canChoosePosition: false,
      tributeData: {},
      canDiscard: false
    }
  },
  mounted() {
    this.playerData.eventBus.$on("draw-card", card => {
      card.hidden = false;
      this.playerHand.push(card);
    });

    this.playerData.eventBus.$on("monster-zone-spaces", monsterZone => this.monsterZone = monsterZone);

    this.playerData.eventBus.$on("summon-success", card => {
      GameLogic.removeCard(card, this.playerHand);
      this.canChoosePosition = false;
      this.resetHand();
      this.canNormalSummon = false
    });
  },
  watch: {
    "gameState.phase"() {
      if (GameLogic.checkDrawPhase(this.gameState, this.playerData) || GameLogic.checkChangeTurn(this.gameState, this.playerData)) {
        for (let card of this.playerHand) {
          card.hidden = !card.hidden;
        }
        this.canNormalSummon = true;
      } else if (GameLogic.checkBattlePhase(this.gameState, this.playerData)) {
        this.canChoosePosition = false;
        this.resetHand();
      } else if (GameLogic.checkEndPhase(this.gameState, this.playerData)) {
        this.canChoosePosition = false;
        this.resetHand();
        if (this.playerHand.length > 6) {
          this.playerData.eventBus.$emit("hand-extra-cards");
          this.canDiscard = true;
        }
      }
    },

    playerHand() {
      if (this.playerData.firstTurn && this.playerHand.length === this.playerData.firstDrawAmount) {
        this.playerData.eventBus.$emit("draw-max");
      } else if (GameLogic.checkEndPhase(this.gameState, this.playerData) && this.playerHand.length < 7) {
        this.playerData.eventBus.$emit("hand-no-extra-cards");
        this.canDiscard = false;
      }
    }
  },
  methods: {
    summonOrDiscard(card) {
      if (this.canNormalSummon) {
        if (GameLogic.checkMainPhase(this.gameState, this.playerData)) {
          this.summoningCard = card;
          if (this.monsterZone.spaces > 0 && parseInt(card.level) < 5) {
            this.canChoosePosition = true;
            this.playerData.eventBus.$emit("normal-summon", this.summoningCard);
            this.tributeData = {};
          } else if (5 - this.monsterZone.tributes > 0 && 4 < parseInt(card.level) && parseInt(card.level) < 7) {
            this.tributeSummon(1);
          } else if (5 - this.monsterZone.tributes > 1 && parseInt(card.level) >= 7) {
            this.tributeSummon(2);
          }
        } else if (GameLogic.checkEndPhase(this.gameState, this.playerData)) {
          if (this.playerHand.length > 6) {
            this.playerData.eventBus.$emit("discard", card);
            GameLogic.removeCard(card, this.playerHand);
          }
        }
      }
    },

    tributeSummon(numberOfTributes) {
      this.canChoosePosition = true;
      this.tributeData.summoningCard = this.summoningCard;
      this.tributeData.amount = numberOfTributes;
      this.tributeData.tributes = [];
      this.playerData.eventBus.$emit("tribute-summon", this.tributeData);
      this.tributeData = {};
    },

    setAttack(card) {
      card.position = "atk";
      card.hidden = false;
    },

    setDefend(card) {
      card.position = "def";
      card.hidden = true;
    },

    resetHand() {
      for (let card of this.playerHand) {
        this.setAttack(card);
      }
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
