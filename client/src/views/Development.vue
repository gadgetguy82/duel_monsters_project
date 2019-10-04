<template lang="html">
  <div id="development">
    <div class="development-container">
      <div class="button-container">
        <game-button :text="'Update All Card Types'" :colour="'brown'" v-on:click.native="updateAllCards"></game-button>
      </div>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton.vue';
import DBService from '@/services/db_service';

export default {
  name: 'development',
  props: ['allCards', 'normalCards'],
  components: {
    "game-button": GameButton
  },
  data() {
    return {
      totalCards: this.allCards.length,
      normalMonsters: this.normalCards, // Normal Monster: 647
      effectMonsters: [], // Effect Monster: 3919
      fusionMonsters: [], // Fusion Monster: 328
      geminiMonsters: [], // Gemini Monster: 43
      linkMonsters: [], // Link Monster: 259
      pendulumMonsters: [], // Pendulum Monster: 251
      ritualMonsters: [], // Ritual Monster: 94
      spiritMonsters: [], // Spirit Monster: 30
      synchroMonsters: [], // Synchro Monster: 325
      toonMonsters: [], // Toon Monster: 15
      tunerMonsters: [], // Tuner Monster: 336
      unionMonsters: [], // Union Effect Monster: 32
      xyzMonsters: [], // XYZ Monster: 395
      tokenCards: [], // Token: 107
      skillCards: [], // Skill Card: 37
      spellCards: [], // Spell Card: 1872
      trapCards: [], // Trap Card: 1509
      typeCount: {}
    }
  },
  mounted() {
    this.allCards.forEach(card => {
      if (card.type === "Effect Monster" || card.type === "Flip Effect Monster") {
        this.effectMonsters.push(card);
      } else if (card.type.includes("Fusion Monster")) {
        this.fusionMonsters.push(card);
      } else if (card.type.includes("Gemini")) {
        this.geminiMonsters.push(card);
      } else if (card.type.includes("Link")) {
        this.linkMonsters.push(card);
      } else if (card.type.includes("Pendulum")) {
        this.pendulumMonsters.push(card);
      } else if (card.type.includes("Ritual")) {
        this.ritualMonsters.push(card);
      } else if (card.type.includes("Spirit")) {
        this.spiritMonsters.push(card);
      } else if (card.type.includes("Synchro")) {
        this.synchroMonsters.push(card);
      } else if (card.type.includes("Toon")) {
        this.toonMonsters.push(card);
      } else if (card.type.includes("Tuner")) {
        this.tunerMonsters.push(card);
      } else if (card.type.includes("Union")) {
        this.unionMonsters.push(card);
      } else if (card.type.includes("XYZ")) {
        this.xyzMonsters.push(card);
      } else if (card.type.includes("Token")) {
        this.tokenMonsters.push(card);
      } else if (card.type === "Skill Card") {
        this.skillCards.push(card);
      } else if (card.type === "Spell Card") {
        this.spellCards.push(card);
      } else if (card.type === "Trap Card") {
        this.trapCards.push(card);
      }

      if (this.typeCount.hasOwnProperty(card.type)) {
        this.typeCount[card.type]++;
      } else {
        this.typeCount[card.type] = 1;
      }
    });

    console.log(this.totalCards);
    console.log(this.typeCount);
  },
  methods: {
    updateAllCards() {
      this.updateNormalMonsterCards();
      this.updateEffectMonsterCards();
      this.updateFusionMonsterCards();
      this.updateGeminiMonsterCards();
      this.updateLinkMonsterCards();
      this.updatePendulumMonsterCards();
      this.updateRitualMonsterCards();
      this.updateSpiritMonsterCards();
      this.updateSynchroMonsterCards();
      this.updateToonMonsterCards();
      this.updateTunerMonsterCards();
      this.updateUnionMonsterCards();
      this.updateXyzMonsterCards();
      this.updateTokenCards();
      this.updateSkillCards();
      this.updateSpellCards();
      this.updateTrapCards();
    },

    updateNormalMonsterCards() {
      DBService.postCards(this.normalMonsters, "normal_monsters/all");
    },

    updateEffectMonsterCards() {
      DBService.postCards(this.effectMonsters, "effect_monsters/all");
    },

    updateFusionMonsterCards() {
      DBService.postCards(this.fusionMonsters, "fusion_monsters/all");
    },

    updateGeminiMonsterCards() {
      DBService.postCards(this.geminiMonsters, "gemini_monsters/all");
    },

    updateLinkMonsterCards() {
      DBService.postCards(this.linkMonsters, "link_monsters/all");
    },

    updatePendulumMonsterCards() {
      DBService.postCards(this.pendulumMonsters, "pendulum_monsters/all");
    },

    updateRitualMonsterCards() {
      DBService.postCards(this.ritualMonsters, "ritual_monsters/all");
    },

    updateSpiritMonsterCards() {
      DBService.postCards(this.spiritMonsters, "spirit_monsters/all");
    },

    updateSynchroMonsterCards() {
      DBService.postCards(this.synchroMonsters, "synchro_monsters/all");
    },

    updateToonMonsterCards() {
      DBService.postCards(this.toonMonsters, "toon_monsters/all");
    },

    updateTunerMonsterCards() {
      DBService.postCards(this.tunerMonsters, "tuner_monsters/all");
    },

    updateUnionMonsterCards() {
      DBService.postCards(this.unionMonsters, "union_monsters/all");
    },

    updateXyzMonsterCards() {
      DBService.postCards(this.xyzMonsters, "xyz_monsters/all");
    },

    updateTokenCards() {
      DBService.postCards(this.tokenCards, "token_cards/all");
    },

    updateSkillCards() {
      DBService.postCards(this.skillCards, "skill_cards/all");
    },

    updateSpellCards() {
      DBService.postCards(this.spellCards, "spell_cards/all");
    },

    updateTrapCards() {
      DBService.postCards(this.trapCards, "trap_cards/all");
    },
  }
}
</script>

<style lang="css" scoped>
.button-container {
  display: flex;
  flex-direction: column;
  width: 200px;
}
</style>
