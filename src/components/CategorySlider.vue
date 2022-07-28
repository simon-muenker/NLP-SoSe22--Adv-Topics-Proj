<template>
  <Panel :title="title">
    <vue-slider
        :data="categories"
        :direction="direction"
        :style="style"
        :marks="true"
        adsorb="true"
        drag-on-click="true"
        @change="val => setMethod(val)"
    >
    </vue-slider>
  </Panel>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import Panel from "@/components/layout/Panel.vue"

export default {
  name: "CategorySlider",
  components: {
    Panel,
    VueSlider
  },
  props: {
    title: String,
    categories: Array,
    setMethod: Function,
    direction: {
      type: String,
      default: "ttb"
    },
    style: String
  }
}
</script>

<style scoped>

</style>