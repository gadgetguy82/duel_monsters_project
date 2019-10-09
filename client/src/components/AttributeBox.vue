<template lang="html">
  <div class="attribute-box-container">
    <div class="attribute-container">
      <div class="attribute">
        <h4>Card attribute to add:</h4>
        <input type="text" list="attributes" value="" placeholder="Enter attribute name..." v-model="attribute" v-on:input="checkValue">
          <datalist id="attributes">
            <option disabled value="null">Select attribute...</option>
            <option v-for="(key, value) of card" :value="value">{{ key }}</option>
          </datalist>
      </div>
      <div class="value">
        <h4>Attribute value to add:</h4>
        <input type="text" value="" v-model="value">
      </div>
    </div>
    <game-button v-on:click.native="addAttribute" :text="textAdd"></game-button>
    <game-button v-on:click.native="removeAttribute" :text="textRemove"></game-button>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton.vue';

export default {
  name: 'attribute-box',
  props: ['card'],
  components: {
    "game-button": GameButton
  },
  data() {
    return {
      textAdd: "Add attribute",
      textRemove: "Remove attribute",
      attribute: "",
      value: ""
    }
  },
  methods: {
    checkValue() {
      this.value = this.card[this.attribute];
    },

    addAttribute() {
      this.$set(this.card, this.attribute, this.value);
    },

    removeAttribute() {
      delete this.card[this.attribute];
    }
  }
}
</script>

<style lang="css" scoped>
.attribute-container {
  display: flex;
}

.attribute, .value {
  margin: 5px;
  flex-grow: 1;
}

input {
  width: 100%;
}

h4, p {
  margin: 2px;
}
</style>
