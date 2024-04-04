<script setup>
import { useElevatorsStore } from '../stores/elevators'

const props = defineProps({
  isMoving: Boolean,
  elevatorId: Number
})

const elevatorsStore = useElevatorsStore()

function isDoorsOpen() {
  if (props.isMoving) return false
  return elevatorsStore?.isDoorsOpen(props.elevatorId)
}
</script>

<template>
  <div class="elevator" :class="{ openDoors: isDoorsOpen() }">
    <span class="visually-hidden">Elevator is here</span>
    <template v-if="isMoving">
      {{
        (elevatorsStore.isUp(elevatorId) ? '🔼' : '🔽') +
        elevatorsStore.elevators.elevatorsData[elevatorId].goal
      }}
    </template>
  </div>
</template>

<style scoped>
.elevator {
  width: var(--floor-width);
  height: var(--floor-height);
  background-color: var(--elevator-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: min(4vw, 30px);
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
