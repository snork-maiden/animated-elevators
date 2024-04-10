import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import houseConfig from '../../houseConfig'
import { useLocalStorage } from '@vueuse/core'

const STORE_NAME = 'elevatorsData'

export const useElevatorsStore = defineStore('elevator', () => {
  const elevatorsData = ref(
    useLocalStorage(STORE_NAME, {
      goalsQueue: [],
      elevators: setupElevators()
    })
  )

  const elevators = computed(() => elevatorsData.value.elevators)
  const freeElevators = computed(() => elevators.value.filter((elevator) => elevator.goal === null))

  const bestOptionElevator = computed(() => {
    const goal = elevatorsData.value.goalsQueue[0]
    if (!goal || !freeElevators.value.length) return null

    if (freeElevators.value.length === 1) return freeElevators.value[0]

    freeElevators.value.sort(
      (a, b) => Math.abs(a.currentFloor - goal) - Math.abs(b.currentFloor - goal)
    )
    return freeElevators.value[0]
  })

  function setupElevators() {
    let elevators = []
    for (let i = 0; i < houseConfig.elevatorsCount; i++) {
      elevators.push({
        id: i,
        currentFloor: 1,
        goal: null
      })
    }
    return elevators
  }

  function continueMoving() {
    elevators.value.forEach((elevator) => {
      if (elevator.goal !== null) {
        moveElevator(elevator.id)
      }
    })
  }

  function arrangeRide() {
    if (bestOptionElevator.value === null) return
    const elevator = elevators.value[bestOptionElevator.value.id]
    const goal = elevatorsData.value.goalsQueue.shift()
    elevator.goal = goal
    moveElevator(elevator.id)
  }

  function moveElevator(elevatorId) {
    const ELEVATOR_ARRIVAL_DELAY = 3000

    const elevator = elevators.value[elevatorId]
    let intervalID = setInterval(() => {
      changeFloor(elevator, elevatorId)

      if (elevator.currentFloor === elevator.goal) {
        clearInterval(intervalID)
        setTimeout(() => {
          endRide(elevatorId)
        }, ELEVATOR_ARRIVAL_DELAY)
      }
    }, 1000)
  }

  function requestElevator(floor) {
    if (elevatorsData.value.goalsQueue.includes(floor)) return

    const isElevatorOnFloor = !!elevators.value.find((elevator) => {
      if (elevator.currentFloor !== floor) return false
      return elevator.currentFloor === elevator.goal || elevator.goal === null
    })
    if (isElevatorOnFloor) return

    elevatorsData.value.goalsQueue.push(floor)
    arrangeRide()
  }

  function endRide(elevatorId) {
    elevators.value[elevatorId].goal = null
    arrangeRide()
  }

  function changeFloor(elevator, elevatorId) {
    if (elevator.goal === null) return
    isUp(elevatorId) ? elevator.currentFloor++ : elevator.currentFloor--
  }

  function isUp(elevatorId) {
    const elevator = elevators.value[elevatorId]
    return elevator.goal - elevator.currentFloor > 0
  }

  function isDoorsOpen(elevatorId) {
    const elevator = elevators.value[elevatorId]
    return elevator.currentFloor === elevator.goal
  }

  function isWaiting(floor) {
    const elevatorsRunning = !!elevators.value.find((elevator) => elevator.goal === floor)
    return elevatorsData.value.goalsQueue.includes(floor) || elevatorsRunning
  }

  function resetElevators() {
    elevatorsData.value = {
      goalsQueue: [],
      elevators: setupElevators()
    }
  }

  return {
    elevators,
    requestElevator,
    isDoorsOpen,
    isUp,
    continueMoving,
    isWaiting,
    resetElevators
  }
})
