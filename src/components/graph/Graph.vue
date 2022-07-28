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
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 256),
      renderer: new THREE.WebGLRenderer({antialias: true}),
      controls: null,
      points: []
    }
  },
  created() {
    window.addEventListener('resize', this.onWindowResize, false)

    this.camera.position.z = 32

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
          (this.cluster === "All Cluster" && this.group === "All Groups") ||
          (point.userData.cluster === this.cluster && this.group === "All Groups") ||
          (this.cluster === "All Cluster" && point.userData.group === this.group) ||
          (point.userData.cluster === this.cluster && point.userData.group === this.group)
      ) {
        point.material.opacity = 1.0
      } else {
        point.material.opacity = 0.1
      }
    })
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
      requestAnimationFrame(this.animate)
      this.controls.update()
      this.render()
    }
  }
}
</script>


