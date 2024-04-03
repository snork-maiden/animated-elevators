<script setup>
import houseConfig from '../../houseConfig'
import ElevatorItem from './ElevatorItem.vue'
import FloorButton from './FloorButton.vue';
</script>

<template>
  <div class="wrapper">
    <div class="elevators">
      <ElevatorItem
        :elevator-id="elevatorNumber"
        v-bind:key="elevatorNumber"
        v-for="elevatorNumber in houseConfig.elevatorsCount"
      />
    </div>
    <div class="buttons-wrapper">
      <FloorButton v-for="floor in houseConfig.floorsNumber" :key="floor">
        {{ floor }}
      </FloorButton>
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

.button {
  margin-left: min(8vw, 5em);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  line-height: 1;
  aspect-ratio: 1/1;
  font-weight: 500;
  width: clamp(25px, 4vw, 35px);
}

.isWaiting {
  background-color: salmon;
}
</style>
