export{draw,drawAnimationVector};

import{getStartPosition,drawAsix,drawgrid,calculateTicks, drawVector, node}from"../../../../../JS/functions/Math/draw.js"
import{getTransformedVector,getVector}from"./Martix.js";


let canvas = document.getElementsByTagName('canvas');

const ctx = canvas[0].getContext('2d');
const ctx1 = canvas[1].getContext('2d');

//初始化画布
const resolution = 3;

canvas[0].style.width = `${canvas[0].width}rem`;
canvas[0].style.height = `${canvas[0].height}rem`;

canvas[0].width = canvas[0].width * resolution;
canvas[0].height = canvas[0].height * resolution;

const width = canvas[0].width;
const height = canvas[0].height;

//监听变量
let isDragging = false;
let lastX, lastY;
let deltaX=0,deltaY=0;
let magnification = 1;
let tickDirection = 1;

//坐标轴变量
let unitTick = 1;
let unitLength = magnification * height/10;

// 设置交互变量
let ifdrawgrid = 1;

//设置样式
let arrowSize = 2;
let gridWidth = 0.3;
let tickLength = 7;
let asixWidth = 1.8;

let ticksColor = 'rgba(255,255,255,1)';
let gridColor = 'rgba(255,255,255,1)';
let asixColor = 'rgba(0,180,255,1)';

let font = '25px KaiTi';

ctx.textBaseline = 'middle';


let initialPosition = [width / 4 + deltaX,3 * height / 4 + deltaY];
let borderPosition = [width - 20, height-20]
let startPosition = [width / 4 + deltaX, 3 * height / 4 + deltaY]
let xPosition = getStartPosition(initialPosition[0],borderPosition[0]);
let yPosition = getStartPosition(initialPosition[1],borderPosition[1]);


draw();

canvas[0].addEventListener('pointerdown', function(event) {
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
    });

canvas[0].addEventListener('pointermove', function(event) {
        if (!isDragging) return;
        let dx = event.clientX - lastX;
        let dy = event.clientY - lastY;
        deltaX += dx;
        deltaY += dy;
        lastX = event.clientX;
        lastY = event.clientY;

        draw();
    });

canvas[0].addEventListener('pointerup', function() {
        isDragging = false;
    });

canvas[0].addEventListener('wheel',function(event){
    event.preventDefault();
    if(event.deltaY > 0){magnification/=1.1}
    else{magnification*=1.1}
    unitLength = magnification * height/10;
    unitTick = calculateTicks(magnification);

    draw()
})

function draw(){
    initialPosition = [width / 4 + deltaX,3 * height / 4 + deltaY];
    borderPosition = [width - 20,height-20]
    
    startPosition = [width / 4 + deltaX, 3 * height / 4 + deltaY]
    xPosition = getStartPosition(initialPosition[0],borderPosition[0]);
    yPosition = getStartPosition(initialPosition[1],borderPosition[1]);

    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
    drawAsix(ctx,xPosition,yPosition,startPosition,width,height,asixWidth,asixColor,arrowSize,ticksColor,tickDirection,tickLength,unitLength,unitTick,font);
    if(ifdrawgrid == 1){drawgrid(ctx,width,height,startPosition,gridWidth,gridColor,unitLength,unitTick)}
    
    node(ctx,[getVector()[0][0]-0.2/magnification,getVector()[1][0]+0.2/magnification],"30rem Arial",'rgb(5, 250, 50)',"α",height,initialPosition,magnification);
    node(ctx,[getTransformedVector()[0][0]-0.2/magnification,getTransformedVector()[1][0]+0.2/magnification],"30rem Arial",'rgb(230, 100, 10)',"α'",height,initialPosition,magnification);

    drawVector(ctx,[0,0],[getVector()[0][0],getVector()[1][0]],initialPosition,3,height,'rgb(5, 250, 50)',2,magnification);
    drawVector(ctx,[0,0],[getTransformedVector()[0][0],getTransformedVector()[1][0]],initialPosition,3,height,'rgb(230, 100, 10)',2,magnification);
}

function drawAnimationVector(vectorPoint,rgb){
    drawVector(ctx,[0,0],vectorPoint,initialPosition,3,height,rgb,2,magnification);
}