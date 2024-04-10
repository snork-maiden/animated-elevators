<script setup>
import houseConfig from '../../houseConfig'
import ElevatorShaft from './ElevatorShaft.vue'
import FloorButton from './FloorButton.vue'
import ResetButton from './ResetButton.vue'
</script>

<template>
  <div class="wrapper">
    <div class="buttons">
      <FloorButton v-for="floor in houseConfig.floorsNumber" :key="floor" :floor="floor" />
    </div>
    <div class="elevators">
      <ElevatorShaft
        :elevator-id="elevatorNumber - 1"
        :key="elevatorNumber"
        v-for="elevatorNumber in houseConfig.elevatorsCount"
      />
    </div>
  </div>
  <ResetButton class="reset"/>
</template>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.elevators {
  display: flex;
  gap: max(1em, 5vw);
}

.buttons {
  display: flex;
  flex-direction: column-reverse;
}

.reset {
  margin-top: 5vh;
  margin-left: 40vw;
}
</style>
