<script setup lang="ts"></script>
<template>
  <div class="layout">
    <div style="width: 77%; display: flex">
      <div class="main">
        <slot name="main"></slot>
      </div>

      <div class="sidebar">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  background-color: var(--color-background);
  width: 100%;
}
.main {
  width: 75%;
  /*  @media screen and (max-width: 1000px) {
    width: 100%;
  } */
}
.sidebar {
  width: 23%;
  margin-left: auto;
  /*  @media screen and (max-width: 1000px) {
    display: none;
  } */
}
</style>
