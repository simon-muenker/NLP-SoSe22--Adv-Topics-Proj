<template>
  <section>
    <h3>{{title}}</h3>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "Panel",
  props: ['title'],
}
</script>

<style scoped>
section {
  padding: 32px 64px;
}
h3 {
  margin-bottom: 16px;
}
</style>