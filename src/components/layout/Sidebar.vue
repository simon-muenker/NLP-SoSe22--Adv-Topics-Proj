<template>
  <article>
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "Sidebar",
  props: ['pos']
}
</script>

<style scoped>
article {
  position: absolute;
  top: 0;
  width: 20vw;
}
</style>