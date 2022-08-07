<template></template>

<script>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import {COLORS} from "./util";
import {toRaw} from "vue";

export default {
  name: 'Graph',
  props: {
    data: Array,
    cluster: String,
    group: String,
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      points: [],
      __requestID: null
    }
  },
  mounted() {
    console.log('> Mount Graph, create DataPoints')
    window.addEventListener('resize', this.onWindowResize, false)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 256)
    this.camera.position.z = 32

    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 0)

    document.body.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.scene.add(new THREE.AmbientLight(0x404040))

    const scene = toRaw(this.scene)
    const points = toRaw(this.points)

    // data points
    this.data.forEach(function (point) {
      let mesh = new THREE.Mesh(
          new THREE.SphereGeometry(
              0.2,
              32,
              16,
          ),
          new THREE.MeshBasicMaterial({
            color: COLORS[point['cluster']],
            transparent: true,
            opacity: 0.8

          })
      )
      mesh.position.set(
          point['x_coord'],
          point['y_coord'],
          point['z_coord']
      );
      mesh.userData = {
        'group': point['datetime'],
        'cluster': point['cluster']
      }
      scene.add(mesh)
      points.push(mesh)

    })

    this.animate()
  },
  updated() {
    this.points.forEach((point) => {
      if (
          (this.cluster === "All" && this.group === "All") ||
          (point.userData.cluster === this.cluster && this.group === "All") ||
          (this.cluster === "All" && point.userData.group === this.group) ||
          (point.userData.cluster === this.cluster && point.userData.group === this.group)
      ) {
        point.material.opacity = 1.0
      } else {
        point.material.opacity = 0.1
      }
    })
  },
  unmounted() {
    window.removeEventListener('resize', this.onWindowResize, true)
    cancelAnimationFrame(this.__requestID)
    document.body.removeChild(this.renderer.domElement)

    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
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
