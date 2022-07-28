<template>
  <div id='canvas'></div>
</template>

<script>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import {COLORS} from "./util";

export default {
  name: 'Graph',
  props: ['data', 'group', 'cluster'],
  data() {
    return {}
  },
  created() {
    main(this.data)
  },
  updated() {
    update(this.group)
  }
}


let points = []

function main(data) {
  const scene = new THREE.Scene()

  // camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 256)
  camera.position.z = 32

  // renderer
  const renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 0);

  document.body.appendChild(renderer.domElement)

  // controls
  const controls = new OrbitControls(camera, renderer.domElement)

  // light
  scene.add(new THREE.AmbientLight(0x404040));

  // data points
  data.forEach(function (point) {
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
    );
    mesh.position.set(
        point['x_coord'],
        point['y_coord'],
        point['z_coord']
    );
    mesh.userData = {
      'text': point['text'],
      'datetime': point['datetime'],
      'cluster': point['cluster']
    }
    scene.add(mesh);
    points.push(mesh);
  });

  window.addEventListener('resize', onWindowResize, false)

  animate()

  // util

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
  }

  function animate() {
    requestAnimationFrame(animate)
    controls.update()

    render()
  }

  function render() {
    renderer.render(scene, camera)
  }
}

function update(group) {

  points.forEach(function (point) {
    if (point.userData.datetime === group || group === "All Groups") {
      point.material.opacity = 1.0
    } else {
      point.material.opacity = 0.1
    }
  })
}

</script>


