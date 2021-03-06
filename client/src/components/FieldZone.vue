<template lang="html">
  <div class="field-zone-container" v-on:click="placeFieldCard">
    <div class="field-zone">
      <div class="layer">
        <h4>Field Zone</h4>
      </div>
      <playing-card class="card" v-if="card.name" :card="card"></playing-card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { eventBusPlayingHand } from '@/main.js';
import GameLogic from '@/services/game_logic.js';

export default {
  name: 'field-zone',
  props: ['gameState', 'playerData'],
  components: {
    "playing-card": Card
  },
  data() {
    return {
      card: {},
      fieldCard: {},
      canPlace: false
    }
  },
  mounted() {
    this.playerData.eventBus.$on("place-field", card => {
      this.canPlace = true;
      this.fieldCard = card;
    });

    this.gameState.eventBus.$on("check-field", action => {
      if (action === "summon") {
        this.addEffects(this.gameState.eventBus, "add-summon");
      } else if (action === "position") {
        this.addEffects(this.gameState.eventBus, "change-position");
      }
    });

    eventBusPlayingHand.$on("card-drawn", () => this.addEffects(eventBusPlayingHand, "add"));
  },
  methods: {
    placeFieldCard() {
      if (this.canPlace) {
        if (!GameLogic.isEmpty(this.card)) {
          this.playerData.eventBus.$emit("discard", this.card);
          this.removeEffects(this.gameState.eventBus, "remove");
        }
        this.card = this.fieldCard;
        this.playerData.eventBus.$emit("field-placed", this.card);
        this.addEffects(this.gameState.eventBus, "add");
        this.canPlace = false;
      }
    },

    addEffects(eventBus, action) {
      if(!GameLogic.isEmpty(this.card)) {
        if (this.card.affects.player === "both") {
          Object.keys(this.card.effect).forEach(key => {
            eventBus.$emit(key, {action: action, fieldCard: this.card});
          });
        }
      }
    },

    removeEffects(eventBus, action) {
      if (this.card.affects.player === "both") {
        Object.keys(this.card.effect).forEach(key => {
          eventBus.$emit(key, {action: action, fieldCard: this.card});
        });
      }
    }
  }
}
</script>

<style lang="css" scoped>
h4 {
  margin: 0;
  padding: 0 10px;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px black, 0 0 2px black, 0 0 2px black;
}

.field-zone-container {
  text-align: center;
}

.field-zone {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  width: 100px;
  height: 145px;
  background-image: url("../../public/img/card_back.png");
  background-repeat: no-repeat;
  background-size: 100px;
  position: relative;
}

.layer {
  background-color: rgba(34, 139, 34, 0.7);
  border-radius: 5px;
  top: 0;
  left: 0;
  width: 100%;
  height: 99.9%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
