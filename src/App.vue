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
          :onUpdate="setActiveGroup"
          :options="groups"
          direction="ltr"
          title="Group Slider (by Sentiment)"
      />
    </Sidebar>
    <Graph/>
  </template>
  <template v-else>
    <Loader/>
  </template>
</template>

<script>
import Sidebar from "@/components/Layout/Sidebar.vue"

import Slider from "@/components/UI/Slider.vue"
import Graph from '@/components/Graph/Graph.vue'
import Select from "@/components/UI/Select.vue"
import Loader from "@/components/UI/Loader.vue"

import {useDataset} from "@/stores/dataset"
import {storeToRefs} from "pinia/dist/pinia"

import './App.css'

const DATASETS = [
  {name: "bert-base-uncased"},
  {name: "textattack.bert-base-uncased"},
  {name: "fabriceyhc.bert-base-uncased"},
  {name: "wakaka.bert-base-uncased"}
]

export default {
  name: 'App',
  components: {
    Loader,
    Sidebar,
    Slider,
    Select,
    Graph
  },
  setup() {
    const {records, groups, isLoaded, activeDataset} = storeToRefs(useDataset())
    const {loadDataset, setActiveGroup} = useDataset()

    return {
      records,
      groups,
      isLoaded,
      activeDataset,
      loadDataset,
      setActiveGroup
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
