<script setup>
import TheHouse from "./components/TheHouse.vue";
import { onMounted } from "vue";
import { useElevatorsStore } from "./stores/elevators";

const elevatorsStore = useElevatorsStore();

onMounted(() => {
  elevatorsStore.continueMoving();
});
</script>

<template>
  <main>
    <TheHouse />
  </main>
</template>

<style scoped></style>
