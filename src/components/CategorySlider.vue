<template>
  <Panel title="Group Slider (by Month):">
    <vue-slider
        :data="categories"
        :direction="direction"
        :marks="true"
        adsorb="true"
        drag-on-click="true"
        style="margin-left: 48px; height: 50vh;"
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
    categories: Array,
    setMethod: Function,
    direction: {
      type: "ltr" | "rtl" | "ttb" | "btt" | undefined,
      default: "ttb"
    }
  }
}
</script>