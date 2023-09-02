const canvas = document.querySelector('.prod-canvas');
const wrap = document.querySelector('.wrapper');
const prev= document.querySelector('.prevv');
const next= document.querySelector('.nexxt');

const context = canvas.getContext("2d");

canvas.width= window.innerWidth;
canvas.height=window.innerHeight;

window.addEventListener('resize',function(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  render();
})


function files(index){

  var data= `

  ./phone/phone product page.770.1.jpg
  ./phone/phone product page.770.2.jpg
  ./phone/phone product page.770.3.jpg
  ./phone/phone product page.770.4.jpg
  ./phone/phone product page.770.5.jpg
  ./phone/phone product page.770.6.jpg
  ./phone/phone product page.770.7.jpg
  ./phone/phone product page.770.8.jpg
  ./phone/phone product page.770.9.jpg
  ./phone/phone product page.770.10.jpg
  ./phone/phone product page.770.11.jpg
  ./phone/phone product page.770.12.jpg
  ./phone/phone product page.770.13.jpg
  ./phone/phone product page.770.14.jpg
  ./phone/phone product page.770.15.jpg
  ./phone/phone product page.770.16.jpg
  ./phone/phone product page.770.17.jpg
  ./phone/phone product page.770.18.jpg
  ./phone/phone product page.770.19.jpg
  ./phone/phone product page.770.20.jpg
  ./phone/phone product page.770.21.jpg
  ./phone/phone product page.770.22.jpg
  ./phone/phone product page.770.23.jpg
  ./phone/phone product page.770.24.jpg
  ./phone/phone product page.770.25.jpg
  ./phone/phone product page.770.26.jpg
  ./phone/phone product page.770.27.jpg
  ./phone/phone product page.770.28.jpg
  ./phone/phone product page.770.29.jpg
  ./phone/phone product page.770.30.jpg
  ./phone/phone product page.770.31.jpg
  ./phone/phone product page.770.32.jpg
  ./phone/phone product page.770.33.jpg
  ./phone/phone product page.770.34.jpg
  ./phone/phone product page.770.35.jpg
  ./phone/phone product page.770.36.jpg
  ./phone/phone product page.770.37.jpg
  ./phone/phone product page.770.38.jpg
  ./phone/phone product page.770.39.jpg
  ./phone/phone product page.770.40.jpg
  ./phone/phone product page.770.41.jpg
  ./phone/phone product page.770.42.jpg
  ./phone/phone product page.770.43.jpg
  ./phone/phone product page.770.44.jpg
  ./phone/phone product page.770.45.jpg
  ./phone/phone product page.770.46.jpg
  ./phone/phone product page.770.47.jpg
  ./phone/phone product page.770.48.jpg
  ./phone/phone product page.770.49.jpg
  ./phone/phone product page.770.50.jpg
  ./phone/phone product page.770.51.jpg
  ./phone/phone product page.770.52.jpg
  ./phone/phone product page.770.53.jpg
  ./phone/phone product page.770.54.jpg
  ./phone/phone product page.770.55.jpg
  ./phone/phone product page.770.56.jpg
  ./phone/phone product page.770.57.jpg
  ./phone/phone product page.770.58.jpg
  ./phone/phone product page.770.59.jpg
  ./phone/phone product page.770.60.jpg
  ./phone/phone product page.770.61.jpg
  ./phone/phone product page.770.62.jpg
  ./phone/phone product page.770.63.jpg
  ./phone/phone product page.770.64.jpg
  ./phone/phone product page.770.65.jpg
  ./phone/phone product page.770.66.jpg
  ./phone/phone product page.770.67.jpg
  ./phone/phone product page.770.68.jpg
  ./phone/phone product page.770.69.jpg
  ./phone/phone product page.770.70.jpg
  ./phone/phone product page.770.71.jpg
  ./phone/phone product page.770.72.jpg
  ./phone/phone product page.770.73.jpg
  ./phone/phone product page.770.74.jpg
  ./phone/phone product page.770.75.jpg
  ./phone/phone product page.770.76.jpg
  ./phone/phone product page.770.77.jpg
  ./phone/phone product page.770.78.jpg
  ./phone/phone product page.770.79.jpg
  ./phone/phone product page.770.80.jpg
  ./phone/phone product page.770.81.jpg
  ./phone/phone product page.770.82.jpg
  ./phone/phone product page.770.83.jpg
  ./phone/phone product page.770.84.jpg
  ./phone/phone product page.770.85.jpg
  ./phone/phone product page.770.86.jpg
  ./phone/phone product page.770.87.jpg
  ./phone/phone product page.770.88.jpg
  ./phone/phone product page.770.89.jpg
  ./phone/phone product page.770.90.jpg
  ./phone/phone product page.770.91.jpg
  ./phone/phone product page.770.92.jpg
  ./phone/phone product page.770.93.jpg
  ./phone/phone product page.770.94.jpg
  ./phone/phone product page.770.95.jpg
  ./phone/phone product page.770.96.jpg
  ./phone/phone product page.770.97.jpg
  ./phone/phone product page.770.98.jpg
  ./phone/phone product page.770.99.jpg
  ./phone/phone product page.770.100.jpg
  ./phone/phone product page.770.101.jpg
  ./phone/phone product page.770.102.jpg
  ./phone/phone product page.770.102.jpg
  ./phone/phone product page.770.103.jpg
  ./phone/phone product page.770.104.jpg
  ./phone/phone product page.770.105.jpg
  ./phone/phone product page.770.106.jpg
  ./phone/phone product page.770.107.jpg
  ./phone/phone product page.770.108.jpg
  ./phone/phone product page.770.109.jpg
  ./phone/phone product page.770.110.jpg
  ./phone/phone product page.770.111.jpg
  ./phone/phone product page.770.112.jpg
  ./phone/phone product page.770.113.jpg
  ./phone/phone product page.770.114.jpg
  ./phone/phone product page.770.115.jpg
  ./phone/phone product page.770.116.jpg
  ./phone/phone product page.770.117.jpg
  ./phone/phone product page.770.118.jpg
  ./phone/phone product page.770.119.jpg
  ./phone/phone product page.770.120.jpg
  ./phone/phone product page.770.121.jpg
  ./phone/phone product page.770.122.jpg
  ./phone/phone product page.770.123.jpg
  ./phone/phone product page.770.124.jpg
  ./phone/phone product page.770.125.jpg
  ./phone/phone product page.770.126.jpg
  ./phone/phone product page.770.127.jpg
  ./phone/phone product page.770.128.jpg
  ./phone/phone product page.770.129.jpg
  ./phone/phone product page.770.130.jpg
  ./phone/phone product page.770.131.jpg
  ./phone/phone product page.770.132.jpg
  ./phone/phone product page.770.133.jpg
  ./phone/phone product page.770.134.jpg
  ./phone/phone product page.770.135.jpg
  ./phone/phone product page.770.136.jpg
  ./phone/phone product page.770.137.jpg
  ./phone/phone product page.770.138.jpg
  ./phone/phone product page.770.139.jpg
  ./phone/phone product page.770.140.jpg
  ./phone/phone product page.770.141.jpg
  ./phone/phone product page.770.142.jpg
  ./phone/phone product page.770.143.jpg
  ./phone/phone product page.770.144.jpg
  ./phone/phone product page.770.145.jpg
  ./phone/phone product page.770.146.jpg
  ./phone/phone product page.770.147.jpg
  ./phone/phone product page.770.148.jpg
  ./phone/phone product page.770.149.jpg
  ./phone/phone product page.770.150.jpg
  ./phone/phone product page.770.151.jpg



  `;
  return data.split("\n")[index];
}

const frameCount = 151;

const images = [];
const imageSeq = {
  frame :1,
};

for(i=1;i<frameCount;i++){
  const img = new Image();
  img.src= files(i);
  images.push(img);
}


images[1].onload=render;
function render(){
  scaleImage(images[imageSeq.frame],context);
  if(imageSeq.frame<20){
    prev.style.opacity='0.3';
    next.style.pointerEvents ='all';
    prev.style.pointerEvents ='none';
    next.style.opacity='1';
  }
  if(imageSeq.frame>10){
    prev.style.opacity='1';
    prev.style.pointerEvents ='all';
    next.style.opacity='1';
    next.style.pointerEvents ='all';
  }
  if(imageSeq.frame>140){

    // prev.style.pointerEvents ='all';
    next.style.pointerEvents ='none';
    next.style.opacity='0.3';
  }
}


function scaleImage(img,ctx){
  var canvas = ctx.canvas;
  var hRatio = canvas.width/canvas.width;
  var vRatio = (canvas.height/canvas.height);
  var ratio = Math.max(hRatio,vRatio);
  var centerShift_x= (canvas.width-img.width )/5;
  var centerShift_y=(canvas.height-img.height)/4;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.drawImage(
    img,
    0,
    0,
    img.width/.9,
    img.height/.85,
    centerShift_x,
    centerShift_y,
    img.width*ratio,
    img.height*ratio
  );

}
let cWid=canvas.width/2;
// const nextAnim= gsap.to(imageSeq,{
//   frame: imageSeq.frame + 30,
//   snap:"frame",
//   duration:1,
//   ease:'none',
//   onUpdate:render,
// }
// );
function prevComplete(){
  prev.style.pointerEvents='all';

}
function nextComplete(){
  next.style.pointerEvents='all';

}
function prevAnim(){
  const tl= gsap.timeline();
// if(tl.isActive(){
//   return;
// })
  if(imageSeq.frame >1){
    tl.to(prev,{
      pointerEvents:'none'
    })
    tl
    .to(imageSeq,{
      frame: imageSeq.frame - 74,
      snap:"frame",
      duration:.5,
      ease:'none',
      onUpdate:render,
      onComplete:prevComplete,
    }
    )

  }
  else return
}
function nextAnim(){
  const tl= gsap.timeline();
  if(imageSeq.frame<140){
    tl.to(next,{
      pointerEvents:'none'
    })
    tl
    .to(imageSeq,{
      frame: imageSeq.frame + 75,
      snap:"frame",
      duration:.5,
      ease:'none',
      onUpdate:render,
      onComplete:nextComplete,
    }
    )
  }
  else return
}
prev.addEventListener('click',prevAnim);
next.addEventListener('click',nextAnim);
// if(nextAnim.isActive(){
// next.addEventListener('click',function(){return;})  ;
// })
// if(!nextAnim.isActive(){
//   if(imageSeq.frame<90){
//     gsap.to(imageSeq,{
//       frame: imageSeq.frame + 30,
//       snap:"frame",
//       duration:1,
//       ease:'none',
//       onUpdate:render,
//     }
//     );
//
//   }
// })
// next.addEventListener('click',function(){
//   if(nextAnim.isActive()){
//     return;
//   }
//
//   else if(imageSeq.frame<90){
//   nextAnim
//   }
//   else return;
//
// })
