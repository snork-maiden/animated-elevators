<script setup></script>

<template>
  <div class="floor">
    <button class="button" type="button">
      <slot></slot>
    </button>
  </div>
</template>
<style scoped>
.floor {
  display: grid;
  place-items: center;
  height: var(--floor-height);
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
