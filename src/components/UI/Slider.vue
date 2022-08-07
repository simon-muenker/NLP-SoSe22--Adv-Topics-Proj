<template>
  <Panel :title="title">
    <vue-slider
        :data="options"
        :direction="direction"
        :style="style"
        :marks="true"
        tooltip="none"
        @change="val => onUpdate(val)"
    >
    </vue-slider>
  </Panel>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import Panel from "@/components/layout/Panel.vue"

export default {
  name: "Slider",
  components: {
    Panel,
    VueSlider
  },
  props: {
    title: String,
    options: Array,
    onUpdate: Function,
    direction: {
      type: String,
      default: "ttb"
    },
    style: Object
  }
}
</script>

<style scoped>
</style>