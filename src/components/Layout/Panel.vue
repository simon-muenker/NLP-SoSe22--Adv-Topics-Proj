<template>
  <section>
    <h3>{{ title }}</h3>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "Panel",
  props: {
    title: {
      type: String,
      default: 'Sidebar Title'
    }
  },
}
</script>

<style scoped>
section {
  padding: 1.5rem;
}

h3 {
  font-size: 1.12rem;
  margin-bottom: 1rem;
}
</style>