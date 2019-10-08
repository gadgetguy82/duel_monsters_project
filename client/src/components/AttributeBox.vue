<template lang="html">
  <div class="attribute-box-container">
    <div class="attribute-container">
      <div class="attribute">
        <h4>Card attribute to add:</h4>
        <input type="text" value="" v-model="attribute">
      </div>
      <div class="value">
        <h4>Attribute value to add:</h4>
        <input type="text" value="" v-model="value">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'attribute-box',
  data() {
    return {
      attribute: "",
      value: ""
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
