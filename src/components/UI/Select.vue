<template>
  <Panel :title="title">
    <v-select
        :options="options"
        :placeholder="value"
        label="name"
        @option:selected="val => onUpdate(val)"
    ></v-select>
  </Panel>
</template>

<script>
import vSelect from 'vue-select'
import Panel from '@/components/Layout/Panel.vue'

import 'vue-select/dist/vue-select.css'

export default {
  name: 'Select',
  components: {
    Panel,
    vSelect
  },
  props: {
    title: {
      type: String,
      default: 'Select Title'
    },
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: []
    },
    onUpdate: {
      type: Function,
      default: (val) => console.log(val)
    }
  }
}
</script>

<style scoped>
>>> {
  --vs-font-size: 1em;
  --vs-controls-color: var(--color-text);
  --vs-border-color: var(--color-border);
  --vs-dropdown-bg: var(--color-background-soft);
}
</style>