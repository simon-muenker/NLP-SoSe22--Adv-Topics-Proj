<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "Popup",
}
</script>

<style scoped>
section {
  height: 100vh;

  align-items: center;
  display: flex;
  justify-content: center;
}
</style>