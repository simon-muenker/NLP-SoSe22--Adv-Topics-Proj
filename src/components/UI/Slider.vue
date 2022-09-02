<template>
  <Panel :title="title">
    <div class="slide-container">
      <vue-slider
          :data="options"
          :direction="direction"
          :marks="true"
          :style="style"
          tooltip="none"
          @change="val => onUpdate(val)"
      >
      </vue-slider>
    </div>
  </Panel>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import Panel from "@/components/Layout/Panel.vue"

export default {
  name: "Slider",
  components: {
    Panel,
    VueSlider
  },
  props: {
    title: {
      type: String,
      default: 'Slider Title'
    },
    options: {
      type: Array,
      default: []
    },
    onUpdate: {
      type: Function,
      default: (val) => console.log(val)
    },
    direction: {
      type: String,
      default: 'ttb',
    },
    style: Object
  }
}
</script>

<style scoped>
.slide-container {
  margin: 0 24px 24px 24px;
}
</style>