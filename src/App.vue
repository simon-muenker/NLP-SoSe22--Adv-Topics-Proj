<template>
  <template v-if="isLoaded">
    <Sidebar pos="left">
      <Select
          :onUpdate="load_dataset"
          :options="datasets"
          :value="activeDataset"
          title="Datasets"
      />
      <Slider
          :onUpdate="setActiveCluster"
          :options="cluster"
          direction="ltr"
          title="Cluster Slider (by DBSCAN)"
      />
      <Slider
          :onUpdate="setActiveGroup"
          :options="group"
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
      <GridLoader/>
    </Popup>
  </template>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";
import Popup from "@/components/layout/Popup.vue";

import Slider from "@/components/UI/Slider.vue";
import Graph from '@/components/graph/Graph.vue'
import SampleList from "@/components/SampleList.vue";
import Select from "@/components/UI/Select.vue";

import GridLoader from 'vue-spinner/src/GridLoader.vue'

import {API, DATASETS, load_data} from "@/components/Data";

import './App.css'


export default {
  name: 'App',
  components: {
    SampleList,
    Sidebar,
    Popup,
    Slider,
    Select,
    Graph,
    GridLoader
  },
  data() {
    return {
      datasets: DATASETS,
      records: [],
      group: [],
      cluster: [],
      activeDataset: null,
      activeGroup: null,
      activeCluster: null,
      isLoaded: null,
      label: {
        all: 'All',
        cluster: 'cluster',
        group: 'datetime'
      }
    }
  },
  mounted() {
    this.load_dataset(this.datasets[0])
  },
  methods: {
    load_dataset(dataset) {
      this.isLoaded = false

      load_data(API.concat(dataset.name, '.csv')).then((values) => {
        this.records = values
        this.cluster = [this.label.all].concat(Array.from(new Set(values.map(a => a[this.label.cluster]))).sort())
        this.group = [this.label.all].concat(Array.from(new Set(values.map(a => a[this.label.group]))))

        this.setActiveCluster(this.label.all)
        this.setActiveGroup(this.label.all)
        this.setActiveDataset(dataset.name)

        this.isLoaded = true
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
