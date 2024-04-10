<script setup>
import { useElevatorsStore } from '@/stores/elevators'
import houseConfig from '../../houseConfig'
import ElevatorElement from './ElevatorElement.vue'
import ElevatorShaftStop from './ElevatorShaftStop.vue'
import { computed } from 'vue'

const props = defineProps({
  elevatorId: Number
})

const elevatorsStore = useElevatorsStore()
const floor = computed(() => elevatorsStore.elevators[props.elevatorId].currentFloor)
</script>

<template>
  <div class="shaft">
    <ElevatorShaftStop :key="floor" v-for="floor in houseConfig.floorsNumber" />
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
  transform: v-bind('`translateY(calc(-100% * ${floor-1})) `');
  transition: transform 0.3s;
}
</style>
