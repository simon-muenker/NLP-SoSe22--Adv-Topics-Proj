<template>
  <Panel :title="'Cluster: ' + activeCluster + ' | Group: ' + activeGroup">
    <template v-for="point in this.records">
      <p v-if="point.show">
        {{ point.text }}
      </p>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Layout/Panel.vue"

import {useDataset} from "@/stores/dataset"
import {storeToRefs} from "pinia/dist/pinia"

export default {
  name: "RecordsList",
  components: {
    Panel
  },
  setup() {
    const {records, activeGroup, activeCluster} = storeToRefs(useDataset())

    return {
      records,
      activeCluster,
      activeGroup
    }
  }
}

</script>

<style scoped>
p {
  display: block;

  margin-bottom: 1rem;
  padding-bottom: 1rem;

  border-bottom: 1px solid var(--color-border);
}

p:last-of-type {
  border-bottom: 0;
}
</style>