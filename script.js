
import './style.css'
import * as THREE from 'three'
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls" 

var scene, camera, skyLight, renderer,
HEIGHT,WIDTH,aspectRatio, nearPlane, farPlane

var val = 0
var gameArray = [[]]

const fieldSize = {
    field_x: 4,
    field_y: 6
}

var Colors = [
    0x399123,
    0x237d91,
    0x233591,
    0x5f2391,
    0x91232b,
    0xd4c719,]
var diseSize = 20
var diseHeight = 10
var offset = diseSize+0.5*2
var planeZ = 0
var camPos = {x:30,y:50,z:200}
var camTarget = {x:30,y:50,z:0}
var startTime

const init = function(){

startTime = Date.now();
//scene
scene = new THREE.Scene()

//camera
HEIGHT = window.innerHeight
WIDTH = window.innerWidth
aspectRatio = WIDTH/HEIGHT
nearPlane = .1
farPlane = 1000

camera = new THREE.PerspectiveCamera(55, aspectRatio,nearPlane,farPlane)
//const camera = new THREE.OrthographicCamera(WIDTH/-20,WIDTH/20, HEIGHT/20, HEIGHT/-20,0.1,500)
camera.position.set(camPos.x,camPos.y,camPos.z)
camera.lookAt(camTarget.x,camTarget.y,camTarget.z)
scene.add(camera)
console.log(camera.position)
console.log(camTarget)
//object
// const geometry = new THREE.BoxGeometry(5,5,5)
// const material = new THREE.MeshPhongMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)


const planeG = new THREE.PlaneGeometry(440,440)
const planeM = new THREE.MeshPhongMaterial(0xffffff)
const pM = new THREE.Mesh(planeG, planeM)
pM.castShadow = true
pM.receiveShadow = true
pM.position.z = planeZ
//pM.rotation.x = - Math.PI / 2
//console.log(pM.rotation.x)
scene.add(pM)


//light

const skyLight = new THREE.HemisphereLight(0xAAAAAA, 0x000000, 0.5)
scene.add(skyLight)


//shadowLight = new THREE.PointLight(0x000000, 2)
const shadowLight = new THREE.DirectionalLight(0xFFFFFF, .5)
shadowLight.position.set(30,30,50)
shadowLight.target.position.set(0,0,-50)
shadowLight.castShadow = true

shadowLight.shadow.camera.left = -400
shadowLight.shadow.camera.right = 400
shadowLight.shadow.camera.top = 400
shadowLight.shadow.camera.bottom = -400
shadowLight.shadow.camera.near = 1
shadowLight.shadow.camera.far = 1000

shadowLight.shadow.mapSize.width = 2048
shadowLight.shadow.mapSize.height = 2048

scene.add(shadowLight)
scene.add(shadowLight.target)

// const helper = new THREE.DirectionalLightHelper(shadowLight);
// scene.add(helper);

createGameArray()


//render
renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
})
//renderer.shadowMap.enabled = true
renderer.setSize(WIDTH, HEIGHT)
document.body.appendChild( renderer.domElement );
//camera.position.set(40,60,200)

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.set( 40, 60, 0 );
// controls.update();


}

const createGameArray = function(){
    for (var y=0; y < fieldSize.field_y; y++){
        gameArray[y]=[]
        for (var x=0; x < fieldSize.field_x; x++){
            var _dice = new Dice(y,x)
            _dice.mesh.position.set(x*offset,y*offset,3)
            scene.add(_dice.mesh)
            gameArray[y][x] = _dice  
            
           
        }
    }
}

const Dice = function(x,y){
    this.coord = new THREE.Vector2(y,x)
    this.mesh = new THREE.Object3D()
    var geom = new THREE.BoxGeometry(diseSize,diseSize,diseHeight)
    var mat = new THREE.MeshPhongMaterial({
       color: Colors[Math.floor(Math.random() * Colors.length)]
    })
    
    var m = new THREE.Mesh(geom,mat)
    m.castShadow = true
    //_dice.mesh.receiveShadow = true
    this.mesh.add(m)
}

const swapSomeElement = function(){
    tmp = gameArray[0][0]
    gameArray[0][0]= gameArray[5][5]
    gameArray[5][5] = tmp
}




init()
//animate()
//renderer.render(scene,camera)



function animate() {

    const currentTime = Date.now();
    const time = ( currentTime - startTime ) / 1000;

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

}

renderer.render( scene, camera );