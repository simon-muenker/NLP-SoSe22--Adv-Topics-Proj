<template>
  <template v-if="isLoaded">
    <Sidebar pos="left">
      <DataSelect
          :datasets="datasets"
          :onUpdate="load_dataset"
          :value="activeDataset"
      />
      <CategorySlider
          :categories="cluster"
          :setMethod="setActiveCluster"
          direction="ltr"
          title="Cluster Slider (by DBSCAN)"
      />
      <CategorySlider
          :categories="group"
          :setMethod="setActiveGroup"
          direction="ttb"
          style="height: 768px"
          title="Group Slider (by Month)"
      />
    </Sidebar>
    <Graph
        :cluster="activeCluster"
        :data="records"
        :group="activeGroup"
    />
    <Sidebar pos="right">
      <SampleList
          :cluster="activeCluster"
          :data="records"
          :group="activeGroup"
      />
    </Sidebar>
  </template>
  <template v-else>
    <Popup>
      <GridLoader />
    </Popup>
  </template>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";
import Popup from "@/components/layout/Popup.vue";

import CategorySlider from "@/components/CategorySlider.vue";
import Graph from '@/components/graph/Graph.vue'
import SampleList from "@/components/SampleList.vue";
import DataSelect from "@/components/DataSelect.vue";

import GridLoader from 'vue-spinner/src/GridLoader.vue'


import './App.css'
import {load_data} from "@/components/data/util";

const API_URL = 'https://data.sci.xciv.de/temporal_corona_clustering/';


export default {
  name: 'App',
  components: {
    SampleList,
    Sidebar,
    Popup,
    CategorySlider,
    DataSelect,
    Graph,
    GridLoader
  },
  data() {
    return {
      datasets: [],
      records: [],
      group: [],
      cluster: [],
      activeDataset: null,
      activeGroup: "All",
      activeCluster: "All",
      isLoaded: false,

    }
  },
  mounted() {
    this.datasets = [
      {name: "mask.sample.50.coronabert"},
      {name: "mask.sample.250.coronabert"}
    ]
    this.load_dataset(this.datasets[0])
  },
  methods: {
    load_dataset(dataset) {
      this.isLoaded = false

      load_data(API_URL.concat(dataset.name, '.csv')).then((values) => {

        this.records = values
        this.cluster = ["All"].concat(Array.from(new Set(values.map(a => a.cluster))).sort())
        this.group = ["All"].concat(Array.from(new Set(values.map(a => a.datetime))))

        this.setActiveCluster("All")
        this.setActiveGroup("All")
        this.setActiveDataset(dataset.name)

        this.isLoaded = true
        console.log('> Data loaded')
        console.log(this.records)
      })
    },
    setActiveDataset(value) {
      this.activeDataset = value
    },
    setActiveCluster(value) {
      this.activeCluster = value
    },
    setActiveGroup(value) {
      this.activeGroup = value
    }
  }
}
</script>
