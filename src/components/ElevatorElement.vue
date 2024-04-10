<script setup>
import { computed } from 'vue'
import { useElevatorsStore } from '../stores/elevators'
import ArrowIcon from './icons/ArrowIcon.vue'

const props = defineProps({
  elevatorId: Number
})

const elevatorsStore = useElevatorsStore()

let isMoving = computed(() => {
  const elevator = elevatorsStore.elevators[props.elevatorId]
  return elevator.goal && elevator.goal !== elevator.currentFloor
})
let isDoorsOpen = computed(() => {
  if (props.isMoving) return false
  return elevatorsStore.isDoorsOpen(props.elevatorId)
})
</script>

<template>
  <div class="elevator" :class="{ openDoors: isDoorsOpen }">
    <span class="visually-hidden">Elevator is here</span>
    <span class="goal">
      {{ elevatorsStore.elevators[elevatorId].goal || '' }}
      <ArrowIcon v-if="isMoving" :direction="elevatorsStore.isUp(elevatorId) ? 'up' : 'down'" />
    </span>
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
  font-size: min(8vw, 30px);
}

.openDoors {
  animation: blink-animation 0.7s steps(5, start) infinite;
  animation-delay: 0.4s;
}

.goal {
  display: flex;
  font-weight: 600;
}

@keyframes blink-animation {
  to {
    background-color: transparent;
  }
}
</style>
