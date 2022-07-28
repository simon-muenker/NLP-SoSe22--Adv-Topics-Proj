<template>
  <article :class="pos">
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
  z-index: 999;

  min-width: 320px;
  width: auto;
  max-width: 480px;

  height: 100vh;
  overflow-y: scroll;
}
.right {
  right: 0;
  direction: rtl;
  text-align: left;
}
</style>