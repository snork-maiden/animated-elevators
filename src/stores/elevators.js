import { ref } from 'vue'
import { defineStore } from 'pinia'
import houseConfig from "../../houseConfig";
import { useLocalStorage } from "@vueuse/core";

const STORE_NAME = 'elevatorsData';
export const useElevatorsStore = defineStore('elevator', () => {
  const elevators = ref(useLocalStorage(STORE_NAME, {
    goalsQueue: [],
    elevatorsData: setupElevators()
  }))

  function setupElevators() {
    let elevators = [];
    for (let i = 0; i < houseConfig.elevatorsCount; i++) {
      elevators.push({
        id: i,
        currentFloor: 1,
        goal: null,
      })
    }
    return elevators;
  }

  function continueMoving() {
    elevators.value.elevatorsData.forEach((elevator) => {
      if (elevator.goal === null) return;
      if (elevator.goal === elevator.currentFloor) {
        elevator.goal = null;
      } else {
        moveElevator(elevator.id);
      }
    })
  }

  function bestOptionElevator() {
    const goal = elevators.value.goalsQueue[0];
    if (!goal) return null;

    const freeElevators = elevators.value.elevatorsData.filter(elevator => elevator.goal === null);
    if (freeElevators.length === 0) return null;
    if (freeElevators.length === 1) return freeElevators[0];

    const floorDifference = ((a, b) => Math.abs(a - b));
    freeElevators.sort((a, b) => floorDifference(a.currentFloor, goal) - floorDifference(b.currentFloor, goal));
    return freeElevators[0];
  }

  function arrangeRide() {
    if (bestOptionElevator() === null) return;
    const elevator = elevators.value.elevatorsData[bestOptionElevator().id];
    const goal = elevators.value.goalsQueue.shift();
    elevator.goal = goal;
    moveElevator(elevator.id);
  }

  function moveElevator(elevatorId) {
    let intervalID = setInterval(function () {

      changeFloor(elevatorId);
      const elevator = elevators.value.elevatorsData[elevatorId];

      const floorsDifference = Math.abs(elevator.currentFloor - elevator.goal);
      if (0 === floorsDifference) {
        window.clearInterval(intervalID);
      }
    }, 1000);
  }

  function requestElevator(floor) {
    if (elevators.value.goalsQueue.includes(floor)) return;

    const ifElevatorOnFloor = !!elevators.value.elevatorsData.find(elevator => {
      if (elevator.currentFloor !== floor) return false;
      return elevator.currentFloor === elevator.goal || elevator.goal === null
    })
    if (ifElevatorOnFloor) return;

    elevators.value.goalsQueue.push(floor);
    arrangeRide()
  }

  function endRide(elevatorId) {
    elevators.value.elevatorsData[elevatorId].goal = null;
    arrangeRide()
  }

  function changeFloor(elevatorId) {
    const elevator = elevators.value.elevatorsData[elevatorId];
    if (elevator.goal === null) return;
    (isUp(elevatorId)) ? elevator.currentFloor++ : elevator.currentFloor--;
    if (elevator.currentFloor === elevator.goal) {
      setTimeout(() => {
        endRide(elevatorId)
      }, 3000);
    }
  }

  function isUp(elevatorId) {
    const elevator = elevators.value.elevatorsData[elevatorId];
    return (elevator.goal - elevator.currentFloor) > 0;
  }

  function isDoorsOpen(elevatorId) {
    const elevator = elevators.value.elevatorsData[elevatorId];
    return elevator.currentFloor === elevator.goal;
  }

  return { elevators, requestElevator, isDoorsOpen, isUp, continueMoving }
})