export{draw,stretch,showWord,translate};

import{ getStartPosition,drawAsix,drawgrid,drawVector,calculateTicks,node}from"../../../../../JS/functions/Math/draw.js"
import { getBeta, getBetaSlash} from "./Matrix.js";

let canvas = document.getElementsByTagName('canvas');

const ctx = canvas[1].getContext('2d');

//初始化画布
const resolution = 3;

canvas[1].style.width = `${canvas[1].width}rem`;
canvas[1].style.height = `${canvas[1].height}rem`;

canvas[1].width = canvas[1].width * resolution;
canvas[1].height = canvas[1].height * resolution;

const width = canvas[1].width;
const height = canvas[1].height;
const step = 1;

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
let position = [width / 4 + deltaX,3 * height / 4 + deltaY];
let borderPosition = [width - 20, height-20]
let startPosition = [width / 4 + deltaX, 3 * height / 4 + deltaY]
let xPosition = getStartPosition(position[0],borderPosition[0]);
let yPosition = getStartPosition(position[1],borderPosition[1]);
//需要绘制的函数图像
function f(x){
    return Math.pow(x,2);
}


draw();

canvas[1].addEventListener('pointerdown', function(event) {
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
    });

canvas[1].addEventListener('pointermove', function(event) {
        if (!isDragging) return;
        let dx = event.clientX - lastX;
        let dy = event.clientY - lastY;
        deltaX += dx;
        deltaY += dy;
        lastX = event.clientX;
        lastY = event.clientY;

        
        draw();
    });

canvas[1].addEventListener('pointerup', function() {
        isDragging = false;
    });

canvas[1].addEventListener('wheel',function(event){
    event.preventDefault();
    if(event.deltaY > 0){magnification/=1.1}
    else{magnification*=1.1}
    unitLength = magnification * height/10;
    unitTick = calculateTicks(magnification);
    draw();
})


function draw(){
    initialPosition = [width / 4 + deltaX,3 * height / 4 + deltaY];
    position = [width / 4 + deltaX,3 * height / 4 + deltaY];
    borderPosition = [width - 20,height-20]
    
    startPosition = [width / 4 + deltaX, 3 * height / 4 + deltaY]
    xPosition = getStartPosition(position[0],borderPosition[0]);
    yPosition = getStartPosition(position[1],borderPosition[1]);

    ctx.clearRect(0, 0, canvas[1].width, canvas[1].height);
    drawAsix(ctx,xPosition,yPosition,startPosition,width,height,asixWidth,asixColor,arrowSize,ticksColor,tickDirection,tickLength,unitLength,unitTick,font);
    if(ifdrawgrid == 1){drawgrid(ctx,width,height,startPosition,gridWidth,gridColor,unitLength,unitTick)}

    node(ctx,[getBeta()[0][0]-0.2/magnification,getBeta()[1][0]+0.2/magnification],"30rem Arial",'rgb(5, 250, 50)',"β",height,initialPosition,magnification);
    node(ctx,[getBetaSlash()[0][0]-0.2/magnification,getBetaSlash()[1][0]+0.2/magnification],"30rem Arial",'rgb(230, 100, 10)',"β'",height,initialPosition,magnification);

    drawVector(ctx,[0,0],[getBeta()[0][0],getBeta()[1][0]],initialPosition,3,height,'rgb(5, 250, 50)',2,magnification);
    drawVector(ctx,[0,0],[getBetaSlash()[0][0],getBetaSlash()[1][0]],initialPosition,3,height,'rgb(230, 100, 10)',2,magnification);
}

function stretch(k,vector,name){
    node(ctx,[k*vector[0][0]-0.2/magnification,k*vector[1][0]+0.2/magnification],"10rem Arial",'rgb(5, 250, 250)',name,height,initialPosition,magnification);
    drawVector(ctx,[0,0],[k*vector[0][0],k*vector[1][0]],initialPosition,3,height,'rgb(5, 250, 250)',2,magnification);
}

function showWord(text,color){
    ctx.fillStyle = color;
    ctx.font = "30rem GreekAlphabet";
    ctx.textAlign = 'center';
    ctx.fillText(text,width/2,height/2);
}

function translate(k,vector,startPosition,name){
    node(ctx,[startPosition[0]+k*vector[0][0], startPosition[1]+k*vector[1][0]],"10rem Arial",'rgb(5, 250, 250)',name,height,initialPosition,magnification);
    drawVector(ctx,startPosition,[startPosition[0]+k*vector[0][0], startPosition[1]+k*vector[1][0]],initialPosition,3,height,'rgb(5, 250, 250)',2,magnification);
}