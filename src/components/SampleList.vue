<template>
  <Panel :title="'Cluster: ' + cluster + ' | Group: ' + group">
    <template v-for="point in this.points">
      <p v-if="point.show">
        {{ point.text }}
      </p>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/layout/Panel.vue"

export default {
  name: "SampleList",
  components: {
    Panel
  },
  props: {
    data: Array,
    cluster: String,
    group: String,
  },
  data() {
    return {
      points: Array
    }
  },
  mounted() {
    this.points = this.data.map(obj => ({...obj, show: true}))
  },
  updated() {
    this.points.forEach((point) => {
      point.show = (this.cluster === "All" && this.group === "All") ||
          (point.cluster === this.cluster && this.group === "All") ||
          (this.cluster === "All" && point.datetime === this.group) ||
          (point.cluster === this.cluster && point.datetime === this.group);
    })
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