<script setup>
import houseConfig from '../../houseConfig'
import ElevatorStop from './ElevatorStop.vue'

defineProps({
  elevatorId: Number
})
</script>

<template>
  <div class="elevator">
    <ElevatorStop
      v-bind:key="floor"
      v-for="floor in houseConfig.floorsNumber"
      :elevator-id="elevatorId"
    />
  </div>
</template>

<style scoped>
.elevator {
  display: flex;
  flex-direction: column;
  background-color: var(--shaft-bg-color);
}
</style>
