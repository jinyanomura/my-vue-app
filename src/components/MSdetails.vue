<template>
  <div>
    <h1>Details for Monster Slayer</h1>
    <input type="text" v-model.lazy="monsterName" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      monsterName: "",
    };
  },
  watch: {
    monsterName() {
      this.$emit("monsterWasCreated", this.monsterName);
    },
  },
};
</script>
