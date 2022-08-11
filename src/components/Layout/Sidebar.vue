<template>
  <article :class="{
      left: pos === 'left',
      right: pos === 'right'
    }">
    <slot></slot>
  </article>
</template>

<script>

export default {
  name: 'Sidebar',
  props: {
    pos: {
      type: String,
      validator(value) {
        return ['left', 'right'].includes(value)
      },
      default: 'left',
    }
  }
}
</script>

<style scoped>
article {
  position: fixed;

  top: 0;
  z-index: 999;

  width: 288px;
  height: 100vh;
  overflow-y: scroll;

  background: var(--color-background-translucent);
  backdrop-filter: blur(16px);

  text-align: left;
}

@media screen and (max-width: 768px) {
  article {
    display: none
  }
}

@media screen and (min-width: 1440px) {
  article {
    width: 360px
  }
}

.left {
  left: 0;
  direction: ltr;
}

.right {
  right: 0;
  direction: rtl;
}
</style>