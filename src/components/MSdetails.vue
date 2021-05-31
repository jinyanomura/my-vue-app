<template>
  <div>
    <h1>Details for Monster Slayer</h1>
    <input type="text" placeholder="Your name" v-model.lazy="playerName" />
    <input type="text" placeholder="Monster name" v-model.lazy="monsterName" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",
      monsterName: "",
    };
  },
  watch: {
    playerName() {
      this.$emit("playerWasCreated", this.playerName);
    },
    monsterName() {
      this.$emit("monsterWasCreated", this.monsterName);
    },
  },
};
</script>
