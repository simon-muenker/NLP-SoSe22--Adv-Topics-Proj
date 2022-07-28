<template>
  <Panel :title="'Cluster: ' + cluster + ' | Group: ' + group">
    <p v-for="item in this.points" :class="item.state">
      {{ item.text }}
    </p>
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
  created() {
    this.points = this.data.map(obj => ({ ...obj, state: 'show' }))
  },
  updated() {
    this.points.forEach((point) => {
      if (
          (this.cluster === "All Cluster" && this.group === "All Groups") ||
          (point.cluster === this.cluster && this.group === "All Groups") ||
          (this.cluster === "All Cluster" && point.datetime === this.group) ||
          (point.cluster === this.cluster && point.datetime === this.group)
      ) {
        point.state = "show"
      } else {
        point.state = "hide"
      }
    })
  }
}

</script>

<style scoped>
p {
  display: block;

  margin-bottom: 16px;
  padding-bottom: 8px;

  border-bottom: 1px solid  #282828;
}
.show {
  display: block;
}
.hide {
  display: None;
}
</style>