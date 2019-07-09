<template lang="html">
  <div class="battle-hand-container" v-on:click="checkBattleHand">
    <!-- <p>this is the battlehand</p> -->
    <playing-card v-for="(card,index) in battleArray" :card="card" :key="index" :emptyhand="emptyHand" v-on:click.native="addToBattleResult(card)"></playing-card>
  </div>
</template>

<script>
import { eventBus1, eventBus2 } from '@/main.js';
import Card from '@/components/Card'

export default {
  name: "battlehand",
  props: ['player'],
  data(){
    return {
      battleArray: [],
      emptyHand: {
        atk: 0,
        def: 0
      }
    }
  },
  mounted(){
    if (this.player === "one") {
      eventBus1.$on('select-card', card => {
        this.battleArray.push(card);
      })
    } else {
      eventBus2.$on('select-card', card => {
        this.battleArray.push(card);
      })
    };

    if (this.player === "one") {
      eventBus1.$on('lose', result => {
        const index = this.battleArray.findIndex( battleCard => battleCard === result.card);
        this.battleArray.splice(index, 1);
      })
    } else {
      eventBus2.$on('lose', result => {
        const index = this.battleArray.findIndex( battleCard => battleCard === result.card);
        this.battleArray.splice(index, 1);
      })
    };


  },
  methods: {
    addToBattleResult(card) {
      if (this.player === "one") {
        eventBus1.$emit('select-battlecard', card);
      } else {
        eventBus2.$emit('select-battlecard', card);
      }
    },
    checkBattleHand() {
      if (this.battleArray.length === 0 ) {
        if (this.player === "one") {
          eventBus1.$emit('empty-battlehand', this.emptyHand);
        } else {
          eventBus2.$emit('empty-battlehand', this.emptyHand);
        }
      }
    }
  },
  components: {
    "playing-card" : Card
  }
}
</script>

<style lang="css" scoped>
.battle-hand-container{
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 150px;
  width: 510px;
  display: flex;
}
</style>
