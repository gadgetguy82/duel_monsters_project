<template lang="html">
  <div id="development">
    <div class="development-container">
      <game-button :text="'Update Normal Monster Cards'" :colour="'yellow'" v-on:click.native="updateNormalMonsterCards"></game-button>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton.vue';
import DBService from '@/services/db_service';

export default {
  name: 'development',
  props: ['allCards'],
  components: {
    "game-button": GameButton
  },
  data() {
    return {
      totalCards: this.allCards.length,
      normalMonsterCards: [],
      effectMonsterCards: [],
      spellCards: [],
      trapCards: []
    }
  },
  methods: {
    updateNormalMonsterCards() {
      DBService.postCards(this.normalMonsterCards, "normal_monster_cards/all");
    }
  }
}
</script>

<style lang="css" scoped>
</style>
