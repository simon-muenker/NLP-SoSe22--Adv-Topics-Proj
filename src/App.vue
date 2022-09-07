<template>
  <template v-if="isLoaded">
    <Sidebar pos="left">
      <Select
          :onUpdate="loadDataset"
          :options="datasets"
          :value="activeDataset"
          title="Datasets"
      />
      <Slider
          :onUpdate="setActiveCluster"
          :options="clusters"
          direction="ltr"
          title="Cluster Slider (by DBSCAN)"
      />
      <Slider
          :onUpdate="setActiveGroup"
          :options="groups"
          direction="ttb"
          style="height: 768px"
          title="Group Slider (by Month)"
      />
    </Sidebar>
    <Graph/>
    <Sidebar pos="right">
      <RecordsList/>
    </Sidebar>
  </template>
  <template v-else>
    <Loader/>
  </template>
</template>

<script>
import Sidebar from "@/components/Layout/Sidebar.vue"

import Slider from "@/components/UI/Slider.vue"
import Graph from '@/components/Graph/Graph.vue'
import RecordsList from "@/components/RecordsList.vue"
import Select from "@/components/UI/Select.vue"
import Loader from "@/components/UI/Loader.vue"

import {useDataset} from "@/stores/dataset"
import {storeToRefs} from "pinia/dist/pinia"

import './App.css'

import { DATASETS } from "@/config"

export default {
  name: 'App',
  components: {
    Loader,
    RecordsList,
    Sidebar,
    Slider,
    Select,
    Graph
  },
  setup() {
    const {records, groups, clusters, isLoaded, activeDataset} = storeToRefs(useDataset())
    const {loadDataset, setActiveGroup, setActiveCluster} = useDataset()

    return {
      records,
      groups,
      clusters,
      isLoaded,
      activeDataset,
      loadDataset,
      setActiveGroup,
      setActiveCluster
    }
  },
  data() {
    return {
      datasets: DATASETS
    }
  },
  mounted() {
    this.loadDataset(this.datasets[0])
  }
}
</script>
