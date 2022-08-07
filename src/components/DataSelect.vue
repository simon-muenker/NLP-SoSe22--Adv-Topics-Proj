<template>
  <Panel title="Datasets">
    <v-select
        :options="datasets"
        :placeholder="value"
        label="name"
        @option:selected="update"
    ></v-select>
  </Panel>
</template>

<script>
import vSelect from "vue-select";
import Panel from "@/components/layout/Panel.vue";

import 'vue-select/dist/vue-select.css';

export default {
  name: "DataSelect",
  components: {
    Panel,
    vSelect
  },
  props: {
    value: Object,
    datasets: Array,
    onUpdate: Function
  },
  data() {
    return {
      selected: Object,
    }
  },
  methods: {
    update(value) {
      console.log(value)
      this.selected = value
      this.onUpdate(value)
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