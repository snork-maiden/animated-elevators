<script setup>
import houseConfig from '../../houseConfig'
import ElevatorShaft from './ElevatorShaft.vue'
import FloorButton from './FloorButton.vue'
</script>

<template>
  <div class="wrapper">
    <div class="elevators">
      <ElevatorShaft
        :elevator-id="elevatorNumber - 1"
        :key="elevatorNumber"
        v-for="elevatorNumber in houseConfig.elevatorsCount"
      />
    </div>
    <div class="buttons">
      <FloorButton v-for="floor in houseConfig.floorsNumber" :key="floor" :floor="floor" />
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
}
.elevators {
  display: flex;
  gap: 2em;
}

.buttons {
  display: flex;
  flex-direction: column-reverse;
}
</style>
