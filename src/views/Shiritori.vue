<template>
  <div>
    <component :is="selectedComponent"></component>
    <button
      @click="selectedComponent = 'STplaying'"
      v-if="selectedComponent === 'STdetails'"
    >
      START PLAYING
    </button>
  </div>
</template>

<script>
import STdetails from "../components/STdetails";
import STplaying from "../components/STplaying";

export default {
  components: {
    STdetails,
    STplaying,
  },
  data() {
    return {
      selectedComponent: "STdetails",
    };
  },
};
</script>
