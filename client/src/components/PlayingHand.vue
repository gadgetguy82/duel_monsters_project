<template lang="html">
  <div class="playing-hand-container">
    <div class="playing-hand">
      <playing-card v-for="(card,index) in playerHand" :key="index" :card="card" v-on:click.native="placeOrDiscard(card)"></playing-card>
    </div>
    <div class="button-container" v-if="canChoosePosition">
      <game-button v-on:click.native="setAttack(summoningCard)" :text="'Attack'" :colour="'red'"></game-button>
      <game-button v-on:click.native="setDefend(summoningCard)" :text="'Defend'" :colour="'blue'"></game-button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import GameButton from '@/components/GameButton.vue';
import { eventBusPlayingHand } from '@/main.js';
import GameLogic from '@/services/game_logic.js';
import * as FieldEffects from '@/services/field_effects.js';
import * as Constants from '@/services/constants.js';

export default {
  name: 'playing-hand',
  props: ['gameState', 'playerData'],
  components: {
    "playing-card": Card,
    "game-button": GameButton
  },
  data() {
    return {
      eventBus: eventBusPlayingHand,
      playerHand: [],
      monsterZone: {
        spaces: Constants.MAX_SPACES,
        tributes: Constants.MAX_SPACES
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
      card.buff = {};
      this.playerHand.push(card);
      eventBusPlayingHand.$emit("card-drawn", card);
    });

    eventBusPlayingHand.$on()

    this.playerData.eventBus.$on("monster-zone-spaces", monsterZone => this.monsterZone = monsterZone);

    this.playerData.eventBus.$on("summon-success", card => {
      GameLogic.removeCard(card, this.playerHand);
      this.canChoosePosition = false;
      this.resetHand();
      this.canNormalSummon = false
    });

    this.playerData.eventBus.$on("field-placed", fieldCard => {
      GameLogic.removeCard(fieldCard, this.playerHand);
    });

    this.gameState.eventBus.$on("monster-zone-atk", eventData => {
      const event = "monster-zone-atk";
      FieldEffects.addToCardBuffInArray(eventData, event, this.playerHand);
      // this.playerHand.forEach(handCard => {
      //   if (handCard[card.affects.on] === card.affects[card.affects.on]) {
      //     if (action === "add") {
      //       handCard.buff.atk = handCard.buff.atk ? handCard.buff.atk + parseInt(card.effect["monster-zone-atk"]) : parseInt(card.effect["monster-zone-atk"]);
      //     } else if (action === "remove") {
      //       handCard.buff.atk -= parseInt(card.effect["monster-zone-atk"]);
      //     }
      //   }
      // });
    });

    this.gameState.eventBus.$on("monster-zone-def", eventData => {
      const event = "monster-zone-def";
      FieldEffects.addToCardBuffInArray(eventData, event, this.playerHand);
      // this.playerHand.forEach(handCard => {
      //   if (handCard[card.affects.on] === card.affects[card.affects.on]) {
      //     if (action === "add") {
      //       handCard.buff.def = handCard.buff.def ? handCard.buff.def + parseInt(card.effect["monster-zone-def"]) : parseInt(card.effect["monster-zone-def"]);
      //     } else if (action === "remove") {
      //       handCard.buff.def -= parseInt(card.effect["monster-zone-def"]);
      //     }
      //   }
      // });
    });

    this.gameState.eventBus.$on("playing-hand-level", eventData => {
      const event = "playing-hand-level";
      FieldEffects.alterCardStatInArray(eventData, event, this.playerHand);
      // this.playerHand.forEach(handCard => {
      //   if (handCard[card.affects.on] === card.affects[card.affects.on]) {
      //     if (action === "add") {
      //       handCard.level = parseInt(handCard.level) + parseInt(card.effect["playing-hand-level"]);
      //     } else if (action === "remove") {
      //       handCard.level -= parseInt(card.effect["playing-hand-level"]);
      //     }
      //   }
      // });
    });

    eventBusPlayingHand.$on("monster-zone-atk", eventData => {
      const event = "monster-zone-atk";
      const handCard = this.playerHand[this.playerHand.length - 1]
      FieldEffects.addToCardBuff(eventData, event);
      // if (this.playerHand[this.playerHand.length - 1][card.affects.on] === card.affects[card.affects.on]) {
      //   if (action === "add") {
      //     this.playerHand[this.playerHand.length - 1].buff.atk = this.playerHand[this.playerHand.length - 1].buff.atk ? this.playerHand[this.playerHand.length - 1].buff.atk + parseInt(card.effect["monster-zone-atk"]) : parseInt(card.effect["monster-zone-atk"]);
      //   }
      // }
    });

    eventBusPlayingHand.$on("monster-zone-def", eventData => {
      const event = "monster-zone-def";
      const handCard = this.playerHand[this.playerHand.length - 1]
      FieldEffects.addToCardBuff(eventData, event);
      // if (this.playerHand[this.playerHand.length - 1][card.affects.on] === card.affects[card.affects.on]) {
      //   if (action === "add") {
      //     this.playerHand[this.playerHand.length - 1].buff.def = this.playerHand[this.playerHand.length - 1].buff.def ? this.playerHand[this.playerHand.length - 1].buff.def + parseInt(card.effect["monster-zone-def"]) : parseInt(card.effect["monster-zone-def"]);
      //   }
      // }
    });

    eventBusPlayingHand.$on("playing-hand-level", eventData => {
      const event = "playing-hand-level";
      const handCard = this.playerHand[this.playerHand.length - 1]
      FieldEffects.alterCardStat(eventData, event);
      // if (this.playerHand[this.playerHand.length - 1][card.affects.on] === card.affects[card.affects.on]) {
      //   if (action === "add") {
      //     this.playerHand[this.playerHand.length - 1].level = parseInt(this.playerHand[this.playerHand.length - 1].level) + parseInt(card.effect["playing-hand-level"]);
      //   }
      // }
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
        if (this.playerHand.length > Constants.MAX_CARDS) {
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
    placeOrDiscard(card) {
      if (GameLogic.checkMainPhase(this.gameState, this.playerData)) {
        if (this.canNormalSummon) {
          this.summoningCard = card;
          if (this.monsterZone.spaces > 0 && parseInt(card.level) < 5) {
            this.canChoosePosition = true;
            this.playerData.eventBus.$emit("normal-summon", this.summoningCard);
            this.tributeData = {};
          } else if (Constants.MAX_SPACES - this.monsterZone.tributes > 0 && 4 < parseInt(card.level) && parseInt(card.level) < 7) {
            this.tributeSummon(1);
          } else if (Constants.MAX_SPACES - this.monsterZone.tributes > 1 && parseInt(card.level) > 6) {
            this.tributeSummon(2);
          }
        }
        if (card.type === "Trap Card") {
          this.playerData.eventBus.$emit("place-trap", card);
        } else if (card.type === "Spell Card") {
          if (card.race === "Field") {
            this.playerData.eventBus.$emit("place-field", card);
          } else {
            this.playerData.eventBus.$emit("place-spell", card);
          }
        }
      } else if (GameLogic.checkEndPhase(this.gameState, this.playerData)) {
        if (this.canDiscard) {
          this.playerData.eventBus.$emit("discard", card);
          GameLogic.removeCard(card, this.playerHand);
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
      card.position = Constants.ATTACK;
      card.hidden = false;
    },

    setDefend(card) {
      card.position = Constants.DEFEND;
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
