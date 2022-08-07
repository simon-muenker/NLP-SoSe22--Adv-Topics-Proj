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
  position: fixed;

  top: 0;
  z-index: 999;

  width: 360px;
  height: 100vh;
  overflow-y: scroll;

  background: var(--color-background-translucent);
  backdrop-filter: blur(16px);
}

.right {
  right: 0;
  direction: rtl;
  text-align: left;
}
</style>