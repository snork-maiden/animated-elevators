<script setup>
import { useElevatorsStore } from '@/stores/elevators'

const elevatorsStore = useElevatorsStore()
defineProps({
  floor: Number
})
</script>

<template>
  <div class="floor">
    <button
      class="button"
      :class="{
        isWaiting: elevatorsStore.isWaiting(floor)
      }"
      type="button"
      @click="elevatorsStore.requestElevator(floor)"
    >
      {{ floor }}
    </button>
  </div>
</template>
<style scoped>
.floor {
  display: grid;
  place-items: center;
  height: var(--floor-height);
}
.button {
  cursor: pointer;
  margin-left: min(8vw, 5em);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  line-height: 1;
  aspect-ratio: 1/1;
  font-weight: 500;
  width: clamp(25px, 6vw, 55px);
}

.button:active {
  background-color: aqua;
}

.isWaiting {
  background-color: salmon;
}
</style>
