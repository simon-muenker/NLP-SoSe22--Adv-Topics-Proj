import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


const COLORS: Record<string, THREE.Color> = {
    '-1': new THREE.Color(0xCCCCCC),
    '0': new THREE.Color(0x4C72B0),
    '1': new THREE.Color(0xDD8452),
    '2': new THREE.Color(0x55A868),
    '3': new THREE.Color(0x8172B3),
    '4': new THREE.Color(0x937860),
    '5': new THREE.Color(0xDA8BC3),
    '6': new THREE.Color(0x8C8C8C),
    '7': new THREE.Color(0xCCB974),
    '8': new THREE.Color(0x64B5CD)
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

    camera.position.z = 32

    return camera
}

export const createControls = (camera: THREE.Camera, renderer: THREE.Renderer) => {
    let controls = new OrbitControls(camera, renderer.domElement)

    controls.minDistance = 2
    controls.maxDistance = 32

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
            color: COLORS[point['cluster']],
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