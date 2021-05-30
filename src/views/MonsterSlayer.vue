<template>
  <div>
    <component :is="selectedComponent"></component>
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
    };
  },
};
</script>
