<template>
  <div style="display: none">
    {{ activeGroup }}
  </div>
</template>

<script>
import * as THREE from 'three'

import {toRaw} from "vue"
import {storeToRefs} from "pinia/dist/pinia"

import {createControls, createRenderer, createCamera, createMesh} from "./util"
import {useDataset} from "@/stores/dataset"

export default {
  name: 'Graph',
  setup() {
    const {records, activeGroup} = storeToRefs(useDataset())

    return {
      records,
      activeGroup,
    }
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      __requestID: null
    }
  },
  mounted() {
    this.scene = new THREE.Scene()
    this.camera = createCamera()
    this.renderer = createRenderer()
    this.controls = createControls(this.camera, this.renderer)
    document.body.appendChild(this.renderer.domElement)

    const scene = toRaw(this.scene)
    this.records.forEach(function (point) {
      point.mesh = createMesh(point)
      scene.add(toRaw(point.mesh))
    })

    window.addEventListener('resize', this.onWindowResize, false)
    this.animate()
  },
  updated() {
    this.records.forEach((point) => {
      if (point.show) {
        point.mesh.material.opacity = 1.0
      } else {
        point.mesh.material.opacity = 0.1
      }
    })
  },
  unmounted() {
    window.removeEventListener('resize', this.onWindowResize, true)
    cancelAnimationFrame(this.__requestID)
    document.body.removeChild(this.renderer.domElement)
  },
  methods: {
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.render()
    },
    render() {
      this.renderer.render(toRaw(this.scene), toRaw(this.camera))
    },
    animate() {
      this.__requestID = requestAnimationFrame(this.animate)
      this.controls.update()
      this.render()
    }
  }
}
</script>
