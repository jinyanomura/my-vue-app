<template>
  <div>
    <component
      :is="selectedComponent"
      :playerName="playerName"
      :monsterName="monsterName"
      @playerWasCreated="playerName = $event"
      @monsterWasCreated="monsterName = $event"
    ></component>
    <button
      @click="selectedComponent = 'MSplaying'"
      v-if="selectedComponent === 'MSdetails'"
    >
      START PLAYING
    </button>
  </div>
</template>

<script>
import MSdetails from "../components/MSdetails";
import MSplaying from "../components/MSplaying";

export default {
  components: {
    MSdetails,
    MSplaying,
  },
  data() {
    return {
      selectedComponent: "MSdetails",
      playerName: "You",
      monsterName: "Monster",
    };
  },
};
</script>
