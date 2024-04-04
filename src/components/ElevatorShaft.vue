<script setup>
import houseConfig from '../../houseConfig'
import ElevatorElement from './ElevatorElement.vue'
import ElevatorShaftStop from './ElevatorShaftStop.vue'

defineProps({
  elevatorId: Number
})

</script>

<template>
  <div class="shaft">
    <ElevatorShaftStop
      :key="floor"
      v-for="floor in houseConfig.floorsNumber"
    />
    <ElevatorElement class="elevator" :elevator-id="elevatorId" />
  </div>
</template>

<style scoped>
.shaft {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--shaft-bg-color);
}

.elevator {
  position: absolute;
  bottom: 0;
  transform: translateY(calc(-100% * 4));
}
</style>
