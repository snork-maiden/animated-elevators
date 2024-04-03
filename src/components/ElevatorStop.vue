<script setup>
import { useElevatorsStore } from "../stores/elevators";

const props = defineProps({
  isElevator: Boolean,
  isMoving: Boolean,
  elevatorId: Number,
});

const elevatorsStore = useElevatorsStore();

function isDoorsOpen() {
  if (props.isMoving || !props.isElevator) return false;
  return elevatorsStore?.isDoorsOpen(props.elevatorId);
}
</script>

<template>
  <div class="stop" :class="{ isElevator, openDoors: isDoorsOpen() }">
    <span v-if="isElevator" class="visually-hidden">Elevator is here</span>
    <template v-if="isMoving">
      {{
        (elevatorsStore.isUp(elevatorId) ? "🔼" : "🔽") +
        elevatorsStore.elevators.elevatorsData[elevatorId].goal
      }}
    </template>
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
.stop {
  width: min(100px, 15vw);
  height: var(--floor-height);
  outline: 1px solid rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: min(4vw, 30px);
}

.isElevator {
  background-color: salmon;
}

.openDoors {
  animation: blink-animation 0.7s steps(5, start) infinite;
}

@keyframes blink-animation {
  to {
    background-color: transparent;
  }
}
</style>
