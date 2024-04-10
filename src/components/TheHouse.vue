<script setup>
import { useElevatorsStore } from '@/stores/elevators';
import houseConfig from '../../houseConfig'
import ElevatorShaft from './ElevatorShaft.vue'
import FloorButton from './FloorButton.vue'

const elevatorsStore = useElevatorsStore()

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
  <button type="button" @click="elevatorsStore.resetElevators()">Reset</button>
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
