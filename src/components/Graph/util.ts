import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


const COLORS: Record<string, THREE.Color> = {
    'positive': new THREE.Color(0x55A868),
    'negative': new THREE.Color(0xDD8452)
}


export const createRenderer = () => {
    let renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 0)

    return renderer
}

export const createCamera = () => {
    let camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        256
    )

    camera.position.z = 40

    return camera
}

export const createControls = (camera: THREE.Camera, renderer: THREE.Renderer) => {
    let controls = new OrbitControls(camera, renderer.domElement)

    controls.minDistance = 8
    controls.maxDistance = 64

    controls.enableDamping = true
    controls.dampingFactor = 0.1

    controls.autoRotate = true
    controls.autoRotateSpeed = 1

    return controls
}

export const createMesh = (point: Record<string, any>) => {

    let mesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(
            0.2,
            32,
            16,
        ),
        new THREE.MeshBasicMaterial({
            color: COLORS[point['datetime']],
            transparent: true,
            opacity: 0.8

        })
    )

    mesh.position.set(
        point['x_coord'],
        point['y_coord'],
        point['z_coord']
    )

    return mesh
}