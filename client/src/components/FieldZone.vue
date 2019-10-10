<template lang="html">
  <div class="field-zone-container" v-on:click="placeFieldCard">
    <div class="field-zone">
      <div class="layer" v-if="!card.name">
        <h4>Field Zone</h4>
      </div>
      <playing-card v-if="card.name" :card="card"></playing-card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
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
  },
  methods: {
    placeFieldCard() {
      if (this.canPlace) {
        this.card = this.fieldCard;
        this.playerData.eventBus.$emit("field-placed", this.card);
        if (this.card.affects.player === "both") {
          Object.keys(this.card.effect).forEach(key => {
            this.gameState.eventBus.$emit(key, this.card);
          });
        }
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
</style>
