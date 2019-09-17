<template lang="html">
  <div v-on:click="checkMonsterZone" :class= "{ 'yellow-player' : player === 'one', 'blue-player' : player === 'two' }">
    <div class="card-container" v-for="(card,index) in monsterZone" :key="index">
      <playing-card :card="card" v-on:click.native="handleClick(card)"></playing-card>
      <button v-if="card" v-on:click="setAttack(card)" :class="{ 'selected' : card.position === 'atk', 'unselected' : card.position === 'def'}">attack</button>
      <button v-if="card" v-on:click="setDefence(card)" :class="{ 'selected' : card.position === 'def', 'unselected' : card.position === 'atk'}">defend</button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: "battle-hand",
  props: ['player', 'phase', 'turn', 'eventBus'],
  data(){
    return {
      monsterZone: [],
      emptyHand: {
        name: "null_card",
        atk: 0,
        def: 0,
        card_images: [{ img_url_small: "" }],
        position: "atk"
      },
      summoningCard: null,
      sacrificeAmount: 0,
      sacrifices: []
    }
  },
  watch: {
    monsterZone: function() {
      if (this.monsterZone.length === 5) {
        this.eventBus.$emit("monster-zone", "full");
      } else {
        this.eventBus.$emit("monster-zone", "space");
      }
    }
  },
  mounted(){
    this.eventBus.$on('normal-summon', card => {
      this.monsterZone.push(card);
    });

    this.eventBus.$on('lose', result => {
      const index = this.monsterZone.findIndex(battleCard => battleCard === result.card);
      this.monsterZone.splice(index, 1);
    });

    this.eventBus.$on('sacrifice-one-summon', card => {
      this.summoningCard = card;
      this.sacrificeAmount = 1;
    });
  },
  methods: {
    handleClick(card) {
      if (this.phase === "First Main" || this.phase === "Second Main") {
        if (this.sacrifices.length < this.sacrificeAmount) {
          this.sacrifices.push(card);
        }
        if (this.sacrifices.length === this.sacrificeAmount) {
          this.eventBus.$emit('sacrifices-selected', this.sacrifices);
        }
      } else if (this.phase === "Battle") {
        this.eventBus.$emit('select-monster-card', card);
      }
    },

    setAttack(card) {
      if (this.player === this.turn && (this.phase === "First Main" || this.phase === "Second Main")) {
        card.position = "atk";
      }
    },
    setDefence(card) {
      if (this.player === this.turn && (this.phase === "First Main" || this.phase === "Second Main")) {
        card.position = "def";
      }
    },

    checkMonsterZone() {
      if (this.monsterZone.length === 0 ) {
        this.eventBus.$emit('empty-monster-zone', this.emptyHand);
      }
    }
  },
  components: {
    "playing-card" : Card
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

.card-container {
  margin: 2px 6px;
  opacity: 1;
}

.blue-player {
  background-image: url('../../public/img/yugioh_obelisk.jpg');
  background-size: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 180px;
  width: 575px;
  display: flex;
  opacity: 0.7;
}

.yellow-player {
  background-image: url('../../public/img/yellow_battle_hand_image.jpg');
  background-size: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 180px;
  width: 575px;
  display: flex;
  opacity: 0.7;
}
</style>
