<template>
  <template v-if="isLoaded">
    <Sidebar pos="left">
      <CategorySlider
          :categories="cluster"
          :setMethod="setActiveCluster"
          title="Cluster Slider (by DBSCAN)"
      />
      <CategorySlider
          :categories="group"
          :setMethod="setActiveGroup"
          title="Group Slider (by Month)"
      />
    </Sidebar>
    <Graph
        :cluster="activeCluster"
        :data="records"
        :group="activeGroup"
    />
  </template>
  <template v-else>
    Loading...
  </template>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";

import CategorySlider from "@/components/CategorySlider.vue";
import Graph from '@/components/graph/Graph.vue'


import './App.css'
import {load_data} from "@/components/data/util";

const DATA_URL = 'https://data.sci.xciv.de/temporal_corona_clustering/cluster.mask.sample.50.coronabert.csv';

export default {
  name: 'App',
  components: {
    Sidebar,
    CategorySlider,
    Graph,
  },
  data() {
    return {
      records: [],
      group: [],
      cluster: [],
      activeGroup: null,
      activeCluster: null,
      isLoaded: false,

    }
  },
  async mounted() {
    load_data(DATA_URL).then((values) => {
      this.records = values
      this.isLoaded = true

      this.cluster = ["All Cluster"].concat(Array.from(new Set(values.map(a => a.cluster))))
      this.group = ["All Groups"].concat(Array.from(new Set(values.map(a => a.datetime))))
    })
  },
  methods: {
    setActiveCluster(value) {
      this.activeCluster = value
    },
    setActiveGroup(value) {
      this.activeGroup = value
    }
  }
}
</script>
