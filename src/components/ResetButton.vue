<script setup>
import { useElevatorsStore } from '@/stores/elevators';
const elevatorsStore = useElevatorsStore()

</script>

<template>
  <button type="button" @click="elevatorsStore.resetElevators()" class="reset">Reset</button>
</template>
<style scoped>
.reset {
  font: inherit;
  text-transform: uppercase;
  font-weight: 700;
  background-color: var(--elevator-bg-color);
  border: 1px solid;
  padding: 0.4em;
  border-radius: 10px;
}

</style>
