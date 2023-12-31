import * as THREE from '../modules/three.module.js';
// import {OrbitControls} from 'https://unpkg.com/three@0.139.1/examples/jsm/controls/OrbitControls'
import * as dat from "https://cdn.skypack.dev/dat.gui";
import {GLTFLoader} from '../modules/GLTFLoader.js'

// import {RGBELoader} from 'https://unpkg.com/three@0.139.1/examples/jsm/loaders/RGBELoader.js'
const canvas = document.querySelector('canvas.webgl');
const updateDrop= document.querySelector('.update-drop');
const arrow = document.querySelector('.arrow');
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(Timeline);
const positions = document.querySelectorAll('.positions button');

const mouse = new THREE.Vector2();

//texture
const textureLoader = new THREE.TextureLoader();
const gui = new dat.GUI();

const planeTexture = textureLoader.load('./textures/world.5292.png');
const hex = textureLoader.load('./textures/hex2.png');
// const zz = textureLoader.load('./textures/zz.png');
const zz = textureLoader.load('./textures/hexagon-removebg.png');
const cubeTexture = textureLoader.load('./textures/cube map.png');
const def = textureLoader.load('./textures/biodefence-nav-logo-red.png');
const veedeeo= document.getElementById('video-texture');
// const impactVid = document.getElementById('impactVideo');
// const impactVid1 = document.getElementById('impactVideo1');
// const impactVid2 = document.getElementById('impactVideo2');
// const impactVid3 = document.getElementById('impactVideo3');
// const impactVid4 = document.getElementById('impactVideo4');
// const impactVid5 = document.getElementById('impactVideo5');
// const mainBG= document.getElementById('mainBG');
// mainBG.play();
// mainBG.playbackRate=.4;
// impactVid.play();
// impactVid1.play();
// impactVid2.play();
// impactVid3.play();
// impactVid4.play();
// impactVid5.play();

veedeeo.currentTime =.1;
// impactVid.currentTime=.1;
// impactVid2.currentTime=.1;
// impactVid3.currentTime=.1;
// impactVid4.currentTime=.1;
// impactVid5.currentTime=.1;
let videoTexture = new THREE.VideoTexture(veedeeo);
// let videoTexture1 = new THREE.VideoTexture(impactVid1);
// let videoTexture2 = new THREE.VideoTexture(impactVid2);
// let videoTexture3 = new THREE.VideoTexture(impactVid3);
// let videoTexture4 = new THREE.VideoTexture(impactVid4);
// let videoTexture5 = new THREE.VideoTexture(impactVid5);
// let impactVideoTexture= new THREE.VideoTexture(impactVid);
// let mainBack= new THREE.VideoTexture(mainBG);
// mainBG.minFilter= THREE.LinearFilter;
// mainBG.magFilter= THREE.LinearFilter;
// videoTexture.minFilter= THREE.LinearFilter;
// videoTexture.magFilter= THREE.LinearFilter;
// videoTexture.minFilter= THREE.LinearFilter;
// videoTexture.magFilter= THREE.LinearFilter;
// impactVideoTexture.minFilter= THREE.LinearFilter;
// impactVideoTexture.magFilter= THREE.LinearFilter;
const mute = document.getElementById('mute');
const play = document.getElementById('play');
// play.classList.add('active');
veedeeo.muted=false;

play.addEventListener('click',function(){
  play.classList.toggle('active');
  if(play.classList.contains('active')){
    veedeeo.play();
    gsap.to(play,{
      background:'rgba(255,0,0,1)',
      duration:1,
      ease:'power1'


    })
    // play.textContent="Pause"
    play.children[0].src='images/pause1.png';

  }
  else if(!play.classList.contains('active')){
    veedeeo.pause();
    // play.textContent="Play"
    play.children[0].src='images/play1.png';
    gsap.to(play,{
      background:'rgba(150,150,150,.4)',
      duration:1,
      ease:'power1'
    })
  }
})
mute.addEventListener('click', function(){
  mute.classList.toggle('muted');

   if (veedeeo.muted === true) {
     veedeeo.muted = false;
     // mute.textContent="Mute";

     mute.children[0].src='images/unmute1.png'
     gsap.to(mute,{
       background:'rgba(150,150,150,.4)',
       duration:1,
       ease:'power1'
     })
   }
   else if (veedeeo.muted === false) {
     veedeeo.muted = true;
     gsap.to(mute,{
       background:'rgba(255,0,0,1)',
       duration:1,
       ease:'power1'
     })
     // mute.textContent="Unmute";
     mute.children[0].src='images/mute1.png'
   }
});
if(veedeeo.addEventListener('ended',function(){
  play.children[0].src='images/play1.png';
  play.classList.remove('active');
  gsap.to(play,{
    background:'rgba(150,150,150,.4)',
    duration:1,
    ease:'power1'
  })
  veedeeo.load();

}));

//groups
const group = new THREE.Group();
const groupTwo = new THREE.Group();
//sizes
const sizes = {
  width:window.innerWidth,
  height:window.innerHeight
}
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xffecec ,.004);
//camera
const camera= new THREE.PerspectiveCamera(75,sizes.width/sizes.height,.1,1000);
//renderer
const renderer = new THREE.WebGLRenderer({antialias:true,canvas:canvas});
renderer.localClippingEnabled=true;
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor(0xececec);

renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFShadowMap;
// renderer.shadowMap.type=THREE.VSMShadowMap;

// scene.background= new THREE.Color('rgb(189, 255, 207)');
 // scene.add(new THREE.GridHelper(16, 16, "yellow", "black"));
//clipping planes
const localPlane = new THREE.Plane( new THREE.Vector3( 0,0, .1 ),-1.65);
const presPlane = new THREE.Plane( new THREE.Vector3( 0,0, .1 ),-1.65);
const localPlane2 = new THREE.Plane(new THREE.Vector3(1,3.4,0),-.14);
const localPlane3 = new THREE.Plane(new THREE.Vector3(0.16,-.71,0),-.9);

//particles
const particlesMaterial =new THREE.PointsMaterial({
  size : 0.02,
  // map: zz,
  transparent:true,
  opacity:.48,
  // opacity:0,
  // alpha:true,
  // color: 0x85CDFD
  color:0x222222
});

const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 1000;

const posArray = new Float32Array(particlesCount*3);

for (let i=0;i<particlesCount*3;i++){
  // posArray[i] =(Math.random()-.5)*5;
  // posArray[i] =(Math.random()-.5)*10;
  // posArray[i] =(Math.random()-.5)*40;
  posArray[i] =(Math.random(Math.sin(Math.random()))-.5)*40;
  // posArray[i+2]=(Math.random())
}
particlesGeometry.setAttribute('position',new THREE.BufferAttribute(posArray,3));

const particlesMesh= new THREE.Points(particlesGeometry,particlesMaterial);

//curved panel
let params ={
	bendDepth:.5
}
let geomPar= {
  width:11,
  height:6
};
if(window.innerWidth<800 && window.innerWidth>611){
  geomPar.width=6.7;
  geomPar.height=4;
}
else if(window.innerWidth<610){
  geomPar.width=3.6;
  geomPar.height=2.2;
  params.bendDepth=.3
}
let geom = new THREE.PlaneGeometry(geomPar.width, geomPar.height, 200, 200);
planeCurve(geom, params.bendDepth);
let mat = new THREE.MeshBasicMaterial({
  // castShadow:true,
	// wireframe: true,
  map: videoTexture,
  side:THREE.FrontSide,
  color:0xffffff,
  transparent:true,
  opacity:0,
  reflectivity:1.4,
});
// if(window.innerWidth < 600){
//   geom = new THREE.PlaneGeometry(6, 4, 200, 200);
//   planeCurve(geom, params.bendDepth);
// }
let curvedPanel = new THREE.Mesh(geom, mat);
curvedPanel.receiveShadow=true;
curvedPanel.castShadow=true;
scene.add(curvedPanel);

curvedPanel.position.set(-31.5,0,-9.5);
curvedPanel.rotation.set(0,0,0);

// bending the plane
function planeCurve(g, z){

  let p = g.parameters;

  let hw = p.width * .5;


  let a = new THREE.Vector2(-hw, 0);
  let b = new THREE.Vector2(0, z);
  let c = new THREE.Vector2(hw, 0);

  let ab = new THREE.Vector2().subVectors(a, b);
  let bc = new THREE.Vector2().subVectors(b, c);
  let ac = new THREE.Vector2().subVectors(a, c);

  let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));

  let center = new THREE.Vector2(0, z - r);
  let baseV = new THREE.Vector2().subVectors(a, center);
  let baseAngle = baseV.angle() - (Math.PI * 0.5);
  let arc = baseAngle * 2;

  let uv = g.attributes.uv;
  let pos = g.attributes.position;
  let mainV = new THREE.Vector2();
  for (let i = 0; i < uv.count; i++){
  	let uvRatio = 1 - uv.getX(i);
    let y = pos.getY(i);
    mainV.copy(c).rotateAround(center, (arc * uvRatio));
    pos.setXYZ(i, mainV.x, y, -mainV.y);
  }

  pos.needsUpdate = true;

}


//world plane
const planeGeometry = new THREE.PlaneGeometry(400,200,100,100);
const planeMaterial = new THREE.MeshBasicMaterial({
  // color:0x1e6dae,
  color:0x89CFF0,
  // color:0xececec,
  // color:0xffba86,
  map:planeTexture,
  // map:mainBack,
  transparent:true,
  opacity:.4,

})
// const shadowPlaneGeo = new THREE.PlaneBufferGeometry(3,1.5,200,200);
const shadowPlaneGeo = new THREE.RingGeometry(0,.5,164);
const shadowPlaneMat =new THREE.MeshPhongMaterial({side:THREE.FrontSide,transparent:true,opacity:0,emissive:0xececec});


const shadowPlane = new THREE.Mesh(shadowPlaneGeo,shadowPlaneMat);
shadowPlane.receiveShadow=true;
shadowPlane.castShadow=true;
// console.log(shadowPlane);

shadowPlane.position.set(-0.5,-15.6,-2.4);
shadowPlane.rotation.x=-1.5;
const plane = new THREE.Mesh(planeGeometry,planeMaterial);

scene.add(plane,shadowPlane);
plane.position.set(0,0,-100);
let tor1= 1.95;
let tor2=.2;
let tor3= 30;
let tor4=120;
if(window.innerWidth<800){
  // impactVideoGeometry= new THREE.BoxGeometry(1.5,1.5,1.5,10,10,10);
  tor1=1.7;
}
if(window.innerWidth<600){
  tor1=1;
  tor2=.12;
  tor3=50;
  tor4=80;
}
//torus
let torusGeo = new THREE.TorusGeometry(tor1,tor2,tor3,tor4);
// let torusGeo2 = new THREE.TorusGeometry(1.5,.2,20,120);
let torusGeo2 = new THREE.TorusGeometry(1.4,.2,20,70);


const torusMaterial= new THREE.PointsMaterial({size:0.01,transparent:true,opacity:.6,color:0xff0000});
const torus2Material= new THREE.PointsMaterial({color:0xff0000,size:0.008,transparent:true,opacity:0});
const helper = new THREE.PlaneHelper(localPlane2,2,0x00ff00);
const helper2 = new THREE.PlaneHelper(localPlane3,2,0x0000ff);

// scene.add(helper,helper2);
const torus= new THREE.Points(torusGeo,torusMaterial);
const torus2= new THREE.Points(torusGeo2,torus2Material);
torus2.castShadow=true;
// console.log(torus2);
scene.add(torus2);
torus2.position.set(-8.8,-15,-.9);
 // x:-1.4,
 //  y:-15.5,
 //  z:-1
torus2.rotation.set=(2,2,0);


groupTwo.add(torus);
scene.add(particlesMesh);
scene.add(camera);
camera.position.set(0,0,5);


// const controls = new OrbitControls(camera,canvas);
let bio, dish, location,phone,mail,mail2;

const gLoader = new GLTFLoader();
gLoader.load('./3d/mail_icon.glb',function(gltf){
  scene.add(gltf.scene);
  // console.log(gltf.scene);
  mail=gltf.scene.children[0].children[0].children;
  mail[0].material=new THREE.MeshBasicMaterial({transparent:true,opacity:0})
  // console.log(mail[1]);
  mail2=mail[1];
// mail[1].name='icon';
// console.log(mail[1]);
  // mail[0].material.color.r=1;
  // mail[0].material.color.b=1;
  // mail[0].material.color.g=1;
  // mail[0].material.emissive=0xececec;
mail[1].castShadow=true;

  for(let i=0;i<gltf.scene.children[0].children[0].children.length;i++){
    mail[i].scale.set(.1,.1,.1);

    mail[i].material.opacity=0;
    mail[i].material.transparent=true;
    mail[i].position.set(0,-20,10);


  }
  mail[1].scale.set(.15,.15,.15);
  mail[1].rotation.set(0,0,6.2);
  mail[0].scale.set(0,0,0);
  // console.log(mail[0].material.opacity,mail[0].material.opacity);

// mail[1].scale.set(.8,.8,.8);
  // mail.scale.set(.5,.5,.5);
  // mail2.scale.set(.5,.5,.5);
  // gui.add(mail[1].position,'x',-3,2).name('loca p x');
  // gui.add(mail[1].position,'y',-3,4).name('loca p y');
  // gui.add(mail[1].position,'z',-17,4).name('loca p z');
  // gui.add(mail[1].rotation,'z',-17.5,-14).name('loca r z');

})

gLoader.load('./3d/map_pointer.glb',function(gltf){
  scene.add(gltf.scene);
  location= gltf.scene.children[0].children[0].children[0];
  location.material= new THREE.MeshPhysicalMaterial({emissive:0x121212,transparent:true,opacity:0});
    location.position.set(-19.49,20.89,10);
  // location.position.set(-1.49,.89,-15);
  location.rotation.set(0,0,-6.2);
  location.scale.set(.1,.1,.1);
  location.castShadow=true;
  // gui.add(location.position,'x',-3,2).name('loca p x');
  // gui.add(location.position,'y',-3,4).name('loca p y');
  // gui.add(location.position,'z',-17.5,-14).name('loca p z');
  // gui.add(location.rotation,'x',-3,2).name('loca r x');
  // gui.add(location.rotation,'y',-3,2).name('loca r y');
  // gui.add(location.rotation,'z',-20,2).name('loca r z');
  // console.log(location);
})
gLoader.load('./3d/telephone_receiver.glb',function(gltf){
  scene.add(gltf.scene);
  phone= gltf.scene.children[0].children[0].children[0];
  phone.material= new THREE.MeshPhysicalMaterial({emissive:0x121212,transparent:true,opacity:0});
  phone.position.set(-13,-7.7,3);
  phone.rotation.set(.1,-.08,-1.69);
  phone.scale.set(.4,.4,.4);
  // phone.rotation.set(0,0,0);
  phone.castShadow=true;
  // gui.add(phone.position,'x',-14,-12).name('phone p x');
  // gui.add(phone.position,'y',-15,2).name('phone p y');
  // gui.add(phone.position,'z',-15.5,3).name('phone p z');
  // gui.add(phone.rotation,'x',-3,2).name('phone r x');
  // gui.add(phone.rotation,'y',-3,2).name('phone r y');
  // gui.add(phone.rotation,'z',-20,2).name('phone r z');
  // console.log(phone);
})
gLoader.load('./3d/dish 2.glb',function(gltf){
  scene.add(gltf.scene);


  gltf.scene.children[0].castShadow=true;
  dish= gltf.scene.children[0].children[0].children[0].children[0].children[0];
  dish.scale.set(.04,.04,.04);
  dish.position.set(8,-15,5);
  dish.castShadow=true;
  dish.material.metalness=.2;
  // dish.material.color = new THREE.Color(0xee0000);
  // dish.receiveShadow=true;

  // dish.material= new THREE.MeshBasicMaterial({opacity:0,transparent:true});
dish.material.transparent=true;
  dish.material.opacity=0;
dish.rotation.y=6;
dish.wireframe=true;

group.add(dish,shadowPlane,torus);
scene.add(group);
// console.log(gltf.scene,dish);
  let sectionFour = gsap.timeline({
    scrollTrigger:{
      trigger:'.prods',
      start:'top top',
      end:'bottom',
      snap:1,
      scrub:true,
      ease:'none',
      duration:2,
    }

  });

if(window.innerWidth>1000){
  sectionFour
  // .to(document.body,{
  //   overflow:'hidden',
  //
  // },'simultaneously')
  .to(dirLight.color,{
    r:1,
    g:0,
    b:0,
  },'simultaneously')
  .to(dirLight.position,{
    x:2.5,
    y:2,
    z:3.5
  })

  .to(shadowPlane.material,{
    opacity:.8,
    delay:1.2,
    duration:6,
    ease:'none'
  })

  .to(dish.position,{
    x:-.4,
    y:-15.6,
    z:-2.2,
    duration:2,
    ease:'none'
  })

  .to(dish.position,{
    x:-.45,
    duration:1.8,
    ease:'power2'
  })

  .to(dish.rotation,{
    y:-.1,
    duration:5.8,
    ease:'none'
  })

  .to(dish.material,{
    opacity:.3,
    delay:1
  },'simultaneously')
  .to(torus2Material,{
    opacity:1,
    ease:'none',
    duration:2,
  },'simultaneously')
  .to(torus2.rotation,{
    x:1,
    y:-.6,
    z:-1,
    duration:20,
    ease:'none'

  })
  .to(torus2.position,{
    x:0.4,
    y:-15.4,
    z:-1.86,
    duration:40,
    ease:'none',
  })
  .to(dish.material,{
    opacity:1,
    duration:10,
    ease:'none'
  })
  .to(phone.position,{
    z:3,
    duration:1.5,
    // ease:'power1.out'
  },'simultaneously')
  .to(location.position,{
    z:3,
    duration:1.5,
    // ease:'power1.out'
  },'simultaneously')
}
else if(window.innerWidth<1000){
  sectionFour
  // .to(document.body,{
  //   overflow:'hidden',
  //
  // },'simultaneously')
  .to(dirLight.color,{
    r:1,
    g:0,
    b:0,
  },'simultaneously')
  .to(dirLight.position,{
    x:2.5,
    y:2,
    z:3.5
  })

  .to(shadowPlane.position,{
    x:-1.1,
    duration:1,
    ease:'power1',
  },'simultaneously')
  .to(shadowPlane.material,{
    opacity:.8,
    delay:1.2,
    duration:6,
    ease:'none'
  })

  .to(dish.position,{
    x:-.9,
    y:-15.6,
    z:-2.2,
    duration:2,
    ease:'none'
  })

  .to(dish.position,{
    x:-1.1,
    duration:1.8,
    ease:'power2'
  })

  .to(dish.rotation,{
    y:-.1,
    duration:5.8,
    ease:'none'
  })
  .to(camera,{
    fov:75,
  },'simultaneously')
  .to(dish.material,{
    opacity:.3,
    delay:1
  },'simultaneously')
  .to(torus2Material,{
    opacity:1,
    ease:'none',
    duration:2,
  },'simultaneously')
  .to(torus2.rotation,{
    x:1,
    y:-.6,
    z:-1,
    duration:10,

  },'simultaneously')
  .to(torus2.position,{
    x:-0.15,
    y:-15.1,
    z:-1.86,
    duration:4,
    ease:'none',
  })
  .to(dish.material,{
    opacity:1,
    duration:1,
    ease:'none'
  })
  .to(phone.position,{
    z:3,
    duration:1.5,
    ease:'power1.out'
  },'simultaneously')
  .to(location.position,{
    z:3,
    duration:1.5,
    ease:'power1.out'
  },'simultaneously')


  .to('.holder-2',{
    width:'50vw',
  },'simultaneously')

}





  // gui.add(dish.position,'x',-3,2).name('dish p x');
  // gui.add(dish.position,'y',-16,-14).name('dish p y');
  // gui.add(dish.position,'z',-3,2).name('dish p z');
  // gui.add(dish.rotation,'x',-2,2).name('dish r x');
  // gui.add(dish.rotation,'y',-2,2).name('dish r y');
  // gui.add(dish.rotation,'z',-2,2).name('dish r z');

})

let bioPres;
gLoader.load('./3d/new assets/while-c.glb',function(gltf){
  scene.add(gltf.scene);
  bio = gltf.scene.children[0];
  gltf.scene.rotation.z=-0.05;
  if(window.innerWidth<600){
  gltf.scene.scale.set(.016,.016,.016);
  gltf.scene.position.x=-0;
  gltf.scene.position.y=-.05;

  // gltf.scene.rotation.y=1.65;
  }
  else if(window.innerWidth<800 && window.innerWidth> 601){
  gltf.scene.scale.set(.026,.026,.026);
  gltf.scene.position.y=-.08;
  gltf.scene.position.x=0;

  // gltf.scene.rotation.y=1.65;
  }
  else if(window.innerWidth>801){
  gltf.scene.scale.set(.03,.03,.03);
  gltf.scene.position.x=0;
  gltf.scene.position.y=-.15;

  // gltf.scene.rotation.y=1.65;
  // gltf.scene.rotation.y=(Math.PI)/2;
  }

  // bio.rotation.z= 1.6;





  bio.material= new THREE.MeshPhongMaterial({color:0x000000,shininess:40,reflectivity:30,clippingPlanes:[whilePlane]});



})
gLoader.load('./3d/new assets/were.glb',function(gltf){
  scene.add(gltf.scene);
  bioPres = gltf.scene.children[0];
  if(window.innerWidth<600){
  gltf.scene.scale.set(.016,.016,.016);
  gltf.scene.position.x=0;
  gltf.scene.position.y=-.15;
  // gltf.scene.rotation.y=1.65;
  }
  else if(window.innerWidth<800 && window.innerWidth> 601){
  gltf.scene.scale.set(.026,.026,.026);
  gltf.scene.position.y=-.2;
  gltf.scene.position.x=0;

  // gltf.scene.rotation.y=1.65;
  }
  else if(window.innerWidth>801){
  gltf.scene.scale.set(.03,.03,.03);
  gltf.scene.position.x=0;
  gltf.scene.position.y=-.1;
  // gltf.scene.rotation.y=1.65;
  // gltf.scene.rotation.y=(Math.PI)/2;
  }

  // bioPres.rotation.z= 1.6;





  bioPres.material= new THREE.MeshPhongMaterial({color:0xff0000,shininess:40,reflectivity:30,clippingPlanes:[werePlane]});



})
const whilePlane = new THREE.Plane(new THREE.Vector3(-0.18,-.44,0),-.77);
const werePlane = new THREE.Plane(new THREE.Vector3(-2.95,-.44,0),-.77);
const helper3 = new THREE.PlaneHelper(whilePlane,3,0x0000ff);
const helper4 = new THREE.PlaneHelper(werePlane,3,0xab00ff);


// scene.add(whilePlane,werePlane);
gui.add(whilePlane.normal,'x',-4,4).name('wPlane px ');
gui.add(whilePlane.normal,'y',-.18,.35).name('wPlane py ');
gui.add(whilePlane.normal,'z',-4,4).name('wPlane pz ');
gui.add(whilePlane,'constant',-5,5).name('wplane');
gui.add(werePlane.normal,'x',-2.95,0).name('wePlane px ');
gui.add(werePlane.normal,'y',.18,-.35).name('wePlane py ');
gui.add(werePlane.normal,'z',-4,4).name('wePlane pz ');
gui.add(werePlane,'constant',-5,5).name('weplane');

// gui.add(whilePlane.rotation,'x',-4,4).name('wPlane rx ');
// gui.add(whilePlane.rotation,'y',-4,4).name('wPlane rx ');
// gui.add(whilePlane.rotation,'z',-4,4).name('wPlane rz ');
let shake,tex;
  let meshes=[];
  function hand(){


gLoader.load('./3d/new assets/handshake.glb',function(gltf){
  scene.add(gltf.scene);
  shake=gltf.scene;
  shake.scale.set(.6,.6,.6);
  shake.rotation.y=(Math.PI)/2;
  shake.position.x=-0.3;
  shake.position.z= -1;

  if(window.innerWidth<600){
    shake.scale.set(.3,.3,.3);
  }

  // shake.material= new THREE.MeshBasicMaterial({color:0x000000});

shake.traverse(e=>(e.isMesh||e.isSkinnedMesh)&&meshes.push(e))

meshes.forEach( mesh=>{
//process this mesh...
// mesh.material= new THREE.MeshLambertMaterial({reflectivity:0,emissive:false});
mesh.material.transparent=true;
mesh.material.opacity=0;

dirLight.exclude= mesh;
gsap.to(mesh.material,
{
  opacity:1,
  duration:1,
  ease:'none'
})


})

  // console.log(gltf.scene)
})
}

window.addEventListener('load',function(){
  gsap.to(dirLight.color,{
    r:1,
    g:1,
    b:1,
  })
      hand();

  setTimeout(function(){
    gsap.to(whilePlane.normal,{
      y:.45,
      duration:1.5,
      ease:'power1'
    }),
    gsap.to(werePlane.normal,{
      x:0,
      duration:1,
      delay:1.5,
      ease:'power1.Out'
    })


  },2000);
})


// groupTwo.add(torus,bio);
//lights
const light= new THREE.AmbientLight(0xffffff,.1);
const dirLight = new THREE.DirectionalLight(0xff0000,1)
// dirLight.castShadow=true;
dirLight.exclude = [meshes,bioPres];

dirLight.position.set(-1.39,-1.4,3.5);
// dirLight.decay=10;
// const pLight= new THREE.PointLight(0x0000aa,1);
const pLight= new THREE.PointLight(0xababab,1);
pLight.position.set(-3.3,-12,-1.1);
pLight.castShadow=true;
scene.add(dirLight,pLight);





gui.add(torus.rotation,'z',-5,5).name('torus rot z');
gui.add(torus.rotation,'x',-5,5).name('torus rot x');
gui.add(torus.position,'y',-5,5).name('torus pos y');


scene.add(groupTwo);
document.addEventListener('mousemove',onDocumentMouseMove)
let mouseX= 0;
let mouseY=0;

let targetX=0;
let targetY=0;
const windowX= window.innerWidth/ 2;
const windowY= window.innerHeight/2;

function onDocumentMouseMove(event){
  mouseX= (event.clientX - windowX);
  mouseY = (event.clientY-windowY);
}
//update aspect on resize
// if (screen.orientation) { // Property doesn't exist on screen in IE11
//     screen.orientation.addEventListener("change", callback);
// }
window.addEventListener("orientationchange", function(e) {

  if ( window.orientation == 90) {

    curvedPanel.scale.x=3.4;
    curvedPanel.scale.y=2.8;

    // WHEN IN PORTRAIT MODE


  } else if( window.orientation == 0 || ( window.orientation == 180)) {
    curvedPanel.scale.x=1;
    curvedPanel.scale.y=1;
    // WHEN IN LANDSCAPE MODE
// console.log(window.orientation);

  }
}, false);
// console.log(curvedPanel);

window.addEventListener('resize', () =>{
  //update sizes
  sizes.width=window.innerWidth;
  sizes.height=window.innerHeight;


  //Update camera
  camera.aspect= sizes.width/sizes.height;

  // camera.updateProjectionMatrix();
  camera.updateProjectionMatrix();

  //Update renderer

  renderer.setSize(window.innerWidth,window.innerHeight);

  renderer.setPixelRatio(devicePixelRatio);
})


// var follow = document.querySelector('.follow');
// var cursor = document.querySelector('.cursor');
// gsap.set('.follow',{xPercent:-50,yPercent:-50});
// gsap.set('.cursor',{xPercent:-50,yPercent:-50});
// window.addEventListener('mousemove',e=>{
//   gsap.to(cursor,0,{x:e.clientX,y:e.clientY});
//   gsap.to(follow,.3,{x:e.clientX,y:e.clientY});
// });
play.addEventListener('mouseover',()=>{
  gsap.to(play,.5,{
    ease:'power2.inOut',
    scale:'1.1',
  })
});
play.addEventListener('mouseleave',()=>{
  gsap.to(play,.5,{
    scale:'1',
    ease:'power2.inOut',

  })
});
mute.addEventListener('mouseover',()=>{
  gsap.to(mute,.5,{
    scale:'1.1',
    ease:'power2.inOut'
  })
});
mute.addEventListener('mouseleave',()=>{
  gsap.to(mute,.5,{
    scale:'1',
    ease:'power2.inOut'
  })
});

const ray = new THREE.Raycaster();
const found = ray.intersectObjects(scene.children);

// const faound = ray.intersectObjects(bio);
window.addEventListener('mousemove', event=>{
  mouse.x = (event.clientX/window.innerWidth) *2-1;
  mouse.y = (event.clientY/window.innerHeight) *2+1;

  ray.setFromCamera(mouse,camera);

  if(found.length>0 && found[0].object.userData.name==='logo'){
    console.log(found);
  }

// for ( let i = 0; i < found.length; i ++ ) {
//   if(found[i].object.name==='logo'){
//     found[i].object.material.color.set(0xff00ab);
//     console.log(found[i]);
//   }
// //
// //
// 		// found[i].object.material.color.set(0xff0000);
//     // gsap.to(found[i].object.material.color,{
//     //   r:1,
//     //   g:0,
//     //   b:1,
//     //   duration:1,
//     //   ease:'none'
//     // })
//
//     // console.log(found);
//
//     if(found[i].object.name==='logo'){
//       found[i].object.material.opacity=0;
//     }
//     // found[i].object.material=new THREE.MeshBasicMaterial({color:0xff00ab});
//
// 	}

})

// console.log(found);
const clock = new THREE.Clock();
function animate(){






  renderer.render(scene,camera);
  requestAnimationFrame(animate);
  camera.updateProjectionMatrix();
  torus.rotation.z-=0.0002;


  torus2.rotation.z+=0.0005;

  // dish.rotation.z+=.001;


// tex.rotation.y-=0.01;

targetX= mouseX * 0.001;
targetY= mouseY * 0.001;
const elapsedTime= clock.getElapsedTime();
particlesMesh.rotation.x= -.009 *elapsedTime;
particlesMesh.rotation.z= -.009 *elapsedTime;
if(mouseX < window.innerWidth || mouseY <window.innerHeight ){
particlesMesh.rotation.x = (mouseY *0.00005)/2;
particlesMesh.rotation.y = (mouseX *0.00003)/2;
curvedPanel.rotation.y= -(mouseX *0.00001);

// curvedPanel.rotation.z= -(mouseY *0.00001);

}
// let portrait = window.matchMedia("(orientation: portrait)");
// portrait.addEventListener('change',function(e){
//   if(!e.matches){
// geomPar.width=5;
// geomPar.height=3;
// // console.log('land');
//   }
//   else {
//     return;
//
//   }
// })
// curvedPanel.needsUpdate=true;
curvedPanel.geometry.parameters.needsUpdate=true;
geom.needsUpdate=true;
// curvedPanel.geometry.needsUpdate=true;
}
animate();
// console.log(curvedPanel);
const cards=document.querySelector('.cards');
const card= document.querySelectorAll('.card');
const veed=document.querySelector('.veed');
const space=document.querySelector('.space');

  let dirAnim =gsap.timeline({
  repeat:-1,
  yoyo:true,
  });
  dirAnim

  .to(dirLight.position,{
    x:-2,
    duration:1,
    ease:'power1.out',
  })
  .to(dirLight,{
    intensity:1.2,
    duration:2,
  })
  .to(dirLight.position,{
    x:0,
    duration:1,
    ease:'power1.out',
  })
  .to(dirLight.position,{
    x:2,
    duration:1,
    ease:'power1.out'
  })
  .to(dirLight,{
    intensity:1,
    duration:2,
  })


//sectionOne timeline
let sectionOne = gsap.timeline({
  scrollTrigger:{
    trigger:canvas,
    start:'top top',
    end:"bottom",
    scrub:true,
    snap:.98,
    // snap:1,
    // pin:true,
    // snap:space.bottom,
    // markers:true,
    // pinSpacing:false,
    ease:'none',


  }

});
if( window.innerWidth<600 && window.innerWidth>280){
  // console.log('mobile');
  sectionOne
  .to('.scroll',{
    opacity:0,
    scale:0,
    delay:.5,
  })
  .to(dirLight.color,{
    r:1,
    g:1,
    b:1,

  },'simultaneously')
  .to(document.body,{
    overflow:'hidden',
  })

  .to(camera.position,{
    y:-.2,
    z:-.01,
    x:.8,
    duration:4,},"simultaneously")
    .to(camera,{
      fov:75,
    },'simultaneously')
    .to(camera.rotation,{
      x:.08,
      y:-.75,
      z:-0.3,
      duration:4,
    },"simultaneously")
    .to(torusMaterial.color,{
        r:1,
        g:.05,
        b:.1,
        duration:2,
        ease:'power1',
      })
      .to(torusMaterial,{
          size:.003,
        },'simultaneously')

      .to('.holder-2',{
        width:'50vw',

      },'simultaneously')


      .to(document.body,{
        overflowX:'hidden',
        overflowY:'scroll'
      })
}
if(window.innerWidth>1000){

sectionOne
.to('.scroll',{
  opacity:0,
  scale:0,
  delay:.5,
})
.to(dirLight.color,{
  r:1,
  g:1,
  b:1,

},'simultaneously')
// .to(document.body,{
//   overflow:'hidden',
// })

.to(camera.position,{
  y:-1.1,
  z:-.28,
  x:1.35,
  duration:4,},"simultaneously")
  .to(camera,{
    fov:75,
  },'simultaneously')
  .to(camera.rotation,{
    x:0,
    y:-.9,
    z:0,
    duration:4,
  },"simultaneously")
  .to(torusMaterial.color,{
      r:1,
      g:.05,
      b:.1,
      duration:2,
      ease:'power1',
    })

    .to('.holder-2',{
      width:'50vw',

    },'simultaneously')

  }
  else if( window.innerWidth<1000 && window.innerWidth>600){
    // console.log('tab');
    sectionOne
    .to('.scroll',{
      opacity:0,
      scale:0,
      delay:.5,
    })
    .to(dirLight.color,{
      r:1,
      g:1,
      b:1,

    },'simultaneously')
    .to(document.body,{
      overflow:'hidden',
    })

    .to(camera.position,{
      y:-1.3,
      z:.45,
      x:-0.8,
      duration:4,},"simultaneously")
      .to(camera,{
        fov:75,
      },'simultaneously')
      .to(camera.rotation,{
        x:0.2,
        y:-0.4,
        z:-2,
        duration:4,
      },"simultaneously")
      .to(torusMaterial.color,{
          r:1,
          g:.05,
          b:.1,
          duration:2,
          ease:'power1',
        })

        .to('.holder-2',{
          width:'50vw',

        },'simultaneously')


        .to(document.body,{
          overflowX:'hidden',
          overflowY:'scroll'
        })
  }

  //swiper animation
  // gsap.from('.cards .swiper',{
  //   opacity:0,
  //   scale:.1,
  //   duration:.5,
  //   ease:'power1',
  //   scrollTrigger:{
  //     trigger:'.cards',
  //     toggleActions:"play reset play reverse",
  //     start:"-10% top",
  //     end:"bottom"
  //   }
  // })
  gsap.from('.cards hr',{
    opacity:0,
    scaleX:0,
    duration:2,
    ease:'power1',
    scrollTrigger:{
      trigger:'.cards',
      toggleActions:"play reset play reverse",
      start:"-10% top",
      end:"bottom"
    }
  })

  gsap.from('.founders-holder',{
    opacity:0,
    xPercent:-100,
    scrub:true,
    duration:.8,
    // delay:.8,
    ease:'none',
    scrollTrigger:{
      trigger:'.prods',
      toggleActions:"play reverse play reverse",
      start:"-50% top",
      end:"bottom"
    }
  })
//cards timeline
let sectionOneHalf = gsap.timeline({
  scrollTrigger:{
    trigger:cards,
    start:'top top',
    end:'bottom',
    scrub:0,
    snap:.98,
    ease:'none'
  }
});
sectionOneHalf
.to(camera.position,{
  x:5,
  y:2,
  z:3,
  duration:2,

})

  //sectionTwo timeline
  let sectionTwo = gsap.timeline({
    scrollTrigger:{
      trigger:'.prods',
      start:'top top',
      // duration:4,
      // pin:true,
      end:'bottom',
      scrub:0,
      snap:.98,
      // markers:true,
      // pinSpacing:false,
      ease:'none',
      // onUpdate: self => {
      //     console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
      //   }
    }


  });
  sectionTwo
  // .to(document.body,{
  //   overflow:'hidden',
  // },'simultaneously')
  .to(camera,{
    fov:75,
  },'simultaneously')
  .to(camera.position,{
    x:0,
    y:0,
    z:-15,
    duration:2,

  },"simultaneously")
  .to(camera.rotation,{
    x:0,
    y:0,
    z:0.8,
    duration:2,

  },"simultaneously")

  .to(curvedPanel.position,{
    x:-0.09,
    y:.1,
    z:-20.5,
  },"simultaneously")


  .from('#play',{
    xPercent:-800,

    opacity:0,


  },'simultaneously')
  .from("#mute",{
    xPercent:800,

    opacity:0,

  },'simultaneously')
  .to(mat,{

    opacity:1,
    duration:1,
    ease:'power1',
  })
  .to(curvedPanel.rotation,{
    x:0,
    y:0,
    z:.8,
  },"simultaneously")

  .to('.holder-2',{
    width:'50vw',

  },'simultaneously')
  .add(function(){
    veedeeo.pause();
  })


let sectionTwoHalf =gsap.timeline({
  scrollTrigger:{
    trigger:'.veed',
    start:'top top',
    // start:'top top',
    end:'bottom',
    snap:.99,
    scrub:true,
    ease:'none'
  }
});
if(window.innerWidth>600 && window.innerWidth<1000 && window.matchMedia("(pointer: coarse)")){
  sectionTwoHalf
  .to(document.body,{
    overflow:'hidden',
  })

  .to(camera.position,{
    x:-1,
    y:0,
    z:-5,
  },'simultaneously')
  .to(camera.rotation,{
    x:0,
    y:0,
    z:0,
  },'simultaneously')
  .to(curvedPanel.material,{
    opacity:0,
  },'simultaneously')
  .to('#play',{
    opacity:0,
    xPercent:-1000
  },'simultaneously')
  .to('#mute',{
    opacity:0,
    xPercent:1000
  },'simultaneously')

  .to('.holder-2',{
    width:'90vw',
    height:'90vh'

  },'simultaneously')

  .to('.holder-2 .over',{
    display:'none',
  })

  .add(function(){
    veedeeo.pause();
  })
  .to(document.body,{
    overflowX:'hidden',
    overflowY:'scroll'
  })
}
else if(window.innerWidth>1000){
  sectionTwoHalf
  // .to(document.body,{
  //   overflow:'hidden',
  // })

  .to(camera.position,{
    x:-1,
    y:0,
    z:-5,
  },'simultaneously')
  .to(camera.rotation,{
    x:0,
    y:0,
    z:0,
  },'simultaneously')
  .to(curvedPanel.material,{
    opacity:0,
  },'simultaneously')

  .to('#play',{
    opacity:0,
    xPercent:-1000
  },'simultaneously')
  .to('#mute',{
    opacity:0,
    xPercent:1000
  },'simultaneously')

  .to('.holder-2',{
    width:'90vw',
    height:'90vh',
  },'simultaneously')
  .to('.holder-2 .over',{
    display:'none',
  })
  // .add(function(){
  //   veedeeo.pause();
  // })
  .add(function(){
    // veedeeo.muted=true;
    veedeeo.pause();
    play.classList.remove('active');
play.children[0].src='images/play1.png';
play.style.background= 'rgba(150,150,150,.4)';

    // setInterval(function(){veedeeo.pause()},100);



  },'simultaneously')

}
else if(window.innerWidth>280 && window.innerWidth<600 && window.matchMedia("(pointer: coarse)")){
  // console.log('yes');
  sectionTwoHalf
  .to(document.body,{
    overflow:'hidden',
  })

  .to(camera.position,{
    x:-1,
    y:0,
    z:-5,
  },'simultaneously')
  .to(camera.rotation,{
    x:0,
    y:0,
    z:0,
  },'simultaneously')
  .to(curvedPanel.material,{
    opacity:0,
  },'simultaneously')
  .to('#play',{
    opacity:0,
    xPercent:-1000
  },'simultaneously')
  .to('#mute',{
    opacity:0,
    xPercent:1000
  },'simultaneously')

  .to('.holder-2',{
    width:'90vw',
    height:'90vh'

  },'simultaneously')

  .to('.holder-2 h2',{
    rotateZ:'0deg',
    opacity:0,
    fontSize:'1rem',
    // y:50,
    top:'50%',
  },'simultaneously')

  .add(function(){
    veedeeo.muted=true;
    veedeeo.pause();
    play.classList.remove('active');
play.children[0].src='images/play1.png';
play.style.background= 'rgba(150,150,150,.4)';

    // setInterval(function(){veedeeo.pause()},100);



  },'simultaneously')
  .to(document.body,{
    overflowX:'hidden',
    overflowY:'scroll'
  })
}

let sectionThree = gsap.timeline({
  scrollTrigger:{
    trigger:'.veed',
    // start:'5% top',
    start:'top top',
    // endTrigger:'.impact',
    end:'bottom',
    makers:true,
    scrub:true,
    // snap:1,
    snap:.995,
    ease:'none',

  }
});

if(window.innerWidth<1000 && window.matchMedia("(pointer: coarse)")){
sectionThree

.to(document.body,{
  overflow:'hidden',
})
.to(camera.position,{
  x:0,
  y:-15,
  z:0
},'simultaneously')
.to(camera.rotation,{
  x:0,
  y:7,
  z:0
},'simultaneously')

.add(function(){
  veedeeo.pause();
})

.to(document.body,{
  overflowX:'hidden',
  overflowY:'scroll'
})
}
else if(window.innerWidth>1000){
  sectionThree
  // .to(document.body,{
  //   overflow:'hidden',
  // })
  .to(camera.position,{
    x:0,
    y:-15,
    z:0
  },'simultaneously')
  .to(camera.rotation,{
    x:0,
    y:7,
    z:0
  },'simultaneously')
  .add(function(){
    veedeeo.pause();
  })

}
const holder1= document.querySelector('.holder-1');
const holder2= document.querySelector('.holder-2');
const holder3= document.querySelector('.holder-3');
const prodHolder= document.querySelector('.prods-holder');


holder2.addEventListener('click',function(){
  holder2.querySelector('video').play();
  holder2.querySelector('video').classList.add('active');
  if(window.innerWidth>600 && window.innerWidth<1000){
    gsap.to('.holder-2 .over',{
      background:'rgba(0,0,0,0)'
    })

  gsap.to(holder2,{
    width:'90vw',
    height:'90vh'
  })


  gsap.to(holder2.querySelector('h2'),{
    rotateZ:0,
    opacity:0,
    fontSize:'1rem',
  })


  }
  else if(window.innerWidth>1000){


  gsap.to('.holder-2 .over',{
    background:'rgba(0,0,0,0)'
  })

gsap.to(holder2,{
  width:'94vw',
  height:'100vh'
})

gsap.to(holder2.querySelector('h2'),{
  rotateZ:0,
  opacity:0,
  fontSize:'1.9rem',
})
}
else if(window.innerWidth<600 && window.innerWidth>280){
  gsap.to('.holder-2 .over',{
    background:'rgba(0,0,0,0)'
  })

gsap.to(holder2,{
  width:'100vw',
  height:'100vh'
})


gsap.to(holder2.querySelector('h2'),{
  rotateZ:0,
  opacity:0,
  fontSize:'1rem',
})

}
})

//contact details animations
const telephone = document.querySelector('.phone');
const marker = document.querySelectorAll('.address');
const email = document.querySelector('.email');
const inp= document.querySelector('.mailer input');

inp.addEventListener('focus',inpAnim);

inp.onkeydown = function(){
  if(event.keyCode== 8 || event.keyCode== 46){
    gsap.to(dish.rotation,{
      y:'-=0.2',
      duration:.5,
      ease:'power1'
    })
    gsap.to(dish.scale,{
      x:.035,
      y:.035,
      z:.035,
      duration:.1,
    })
    gsap.to(dish.scale,{
      x:.04,
      y:.04,
      z:.04,
      duration:.1,
    })

  }
  else{
    gsap.to(dish.rotation,{
      y:'+=0.2',
      duration:.5,
      ease:'power1'
    })
    gsap.to(dish.scale,{
      x:.045,
      y:.045,
      z:.045,
      duration:.1,
    })
    gsap.to(dish.scale,{
      x:.04,
      y:.04,
      z:.04,
      duration:.1,
    })
  }
}

function inpAnim(){
  let animation = gsap.timeline();
  if(window.innerWidth<600 && window.innerWidth>280){
    gsap.to(phone.position,{
      z:3,
    })

    gsap.to(location.position,{
      z:3,
    })
    gsap.to(mail[1].position,{
      z:3,

    })
    gsap.to(mail[1].material,{
      opacity:0
    })
    animation.to(dish.position,{
      x:-1.1,
      y:-15.6,
      z:-2.2,
      duration:2,
      ease:'none'
    })
  }
else if(window.innerWidth>1000){
  gsap.to(phone.position,{
    z:3,
  })

  gsap.to(location.position,{
    z:3,
  })
  gsap.to(mail[1].position,{
    z:3,

  })
  gsap.to(mail[1].material,{
    opacity:0
  })
  animation.to(dish.position,{
    x:-.45,
    y:-15.6,
    z:-2.2,
    duration:2,
    ease:'none'
  })
}


}
function emailAnim(){
  let animation = gsap.timeline();

  gsap.to(phone.position,{
    z:3,
  })
  gsap.to(dish.position,{
    z:3,
  })
  gsap.to(location.position,{
    z:3,
  })
  animation

  .to(mail[1].position,{
    x:-.45,
    y:2.35,
    z:-15.45,
    duration:1,
    ease:'power1'
  },'simultaneously')
  .to(mail[1].material,{
    opacity:1,
    ease:'power1'
  },'simultaneously')
  .from(mail[1].rotation,{
    z:0,
    duration:1
  })





}
function addressAnim(){
  let animation = gsap.timeline();
  // gsap.to(location.position,{
  //   z:10,
  // })
  gsap.to(dish.position,{
    z:10,
  })
  gsap.to(phone.position,{
    z:3,
  })

  gsap.to(mail[1].position,{
    z:3,
  })
  gsap.to(mail[1].material,{
    opacity:0
  })
  animation
  .to(location.position,{
    x:-.45,
    y:2.36,
    z:-15.4,
    duration:1.5,
    ease:'power1.out'
  },'simultaneously')
  .to(location.material,{
    opacity:1,
    duration:.4,
    ease:'power1'
  })
  .from(location.rotation,{
    x:0,
    y:0,
    z:-.5,
    duration:1,
    ease:'none'
  })

}
function phoneAnim(){
  let animation = gsap.timeline();
  // gsap.to(location.position,{
  //   z:10,
  // })
  gsap.to(dish.position,{
    z:3,
  })
  gsap.to(mail[0].position,{
    z:10,
  })
  gsap.to(mail[1].position,{
    z:10,
    y:-10
  })
  gsap.to(mail[1].material,{
    opacity:0
  })
  gsap.to(location.position,{
    z:3,
  })
  animation
  .to(phone.position,{
    z:-2.3,
    y:-8.7,
    x:-12.65,
    // x:-.4,
    duration:1.2,
    ease:'power1.out'
  })
  .to(phone.material,{
    opacity:1,
    duration:.4,
    ease:'power1'
  })
  .from(phone.rotation,{
    x:-1,
    y:-2,
    z:-1,
    // duration:1,
    ease:'none'
  })
}
var timeoutId = null;
telephone.addEventListener('mouseover',function(){
  timeoutId = window.setTimeout(function(){
    phoneAnim();
  },400)
});
telephone.addEventListener('mouseleave',clear);

marker.forEach((mark) => {
  mark.onmouseover= function(){
    timeoutId=window.setTimeout(function(){
      addressAnim();
    },400)
  }
});
marker.forEach((mark) => {
  mark.addEventListener('mouseleave',clear)
  });

email.addEventListener('mouseover',function(){
  timeoutId=window.setTimeout(function(){
    emailAnim();
  },400)
});
email.addEventListener('mouseleave',clear)
function clear(){
  window.clearTimeout(timeoutId);
}
