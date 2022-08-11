<template>
  <section>
    <GridLoader/>
  </section>
</template>

<script>
import GridLoader from 'vue-spinner/src/GridLoader.vue'

export default {
  name: 'Loader',
  components: {
    GridLoader
  },
}
</script>

<style scoped>
section {
  height: 100vh;
  width: 100vw;

  align-items: center;
  display: flex;
  justify-content: center;
}
</style>