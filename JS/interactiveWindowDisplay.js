import { getFunctionColor } from "./functionRGB.js";

export{draw};

let canvas = document.getElementsByTagName('canvas');
let formula = document.getElementsByClassName('interactiveFormular');
let sliders = document.getElementsByClassName('slider');

const ctx = canvas[0].getContext('2d');

//初始化画布
const resolution = 3;

canvas[0].style.width = `${canvas[0].width}rem`;
canvas[0].style.height = `${canvas[0].height}rem`;

canvas[0].width = canvas[0].width * resolution;
canvas[0].height = canvas[0].height * resolution;

const width = canvas[0].width;
const height = canvas[0].height;
const step = 0.1;

//监听变量
let isDragging = false;
let lastX, lastY;
let deltaX=0,deltaY=0;
let magnification = 1;
let tickDirection = 1;

let k = 1;

//坐标轴单位长度
let len = magnification * height/10;

// 设置交互变量
let ifdrawgrid = 1;

//设置样式
let arrowSize = 2;
let gridWidth = 0.3;
let tickLength = 7;
let functionWidth = 3;
let asixWidth = 1.8;

let ticksColor = 'rgba(255,255,255,1)';
let gridColor = 'rgba(255,255,255,1)';
let asixColor = 'rgba(0,180,255,1)';
let functionColor;

ctx.font = '12rem KaiTi';
ctx.textBaseline = 'middle';



let x,dx;

//初始化公式
let parameterArray = [0,0,0];
let drag = new Array(sliders.length).fill(0);
let sliderButton = new Array(sliders.length);
let divWidth = 200*document.documentElement.clientWidth/800;



let A=0,w=0,t=0;

// 初始化滑动条按钮
for(let i=0;i<sliders.length;i++)
    {
        sliderButton[i] = sliders[i].children[0].children[0];
    }

for(let i=0;i<sliderButton.length;i++)
    {
        sliderButton[i].style.marginLeft = parameterArray[i] + 'px';
    }



formula[0].innerHTML = `<mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>${A}</mi><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><mi>${w}</mi><mi>x</mi><mi>${t}</mi><mo stretchy="false">)</mo>`;
function f(x){
    return A*Math.sin(w*x+t);
}
drawFunction(f);


//监听网格是否勾选
document.getElementById('grid').addEventListener('click',function(){
    if(document.getElementById('grid').checked)
    {
        ifdrawgrid = 1;
        drawFunction(f);
    }
    else
    {
        ifdrawgrid = 0;
        drawFunction(f);
    }
})

//监听按钮
document.getElementsByClassName('controlWindow')[0].addEventListener('mousemove',function(event){
    for(let i=0;i<sliderButton.length;i++)
        {
            sliderButton[i].addEventListener('mousedown',function(event){
                x = event.clientX;
                dx = parameterArray[i];
                drag[i]=1;
            })

            if(drag[i])
                {
                    if(event.clientX - x + dx<0){parameterArray[i] = 0}
                    else if(event.clientX - x + dx>divWidth){parameterArray[i] = divWidth}
                    else{parameterArray[i] = event.clientX - x + dx;}
                    sliderButton[i].style.marginLeft = parameterArray[i] + 'px';
                  
                    A = parameterArray[0]/divWidth*20;
                    w = parameterArray[1]/divWidth*10;
                    t = (parameterArray[2]/divWidth)*50;

                    function f(x){
                        return A*Math.sin(w*x+t);
                    }
                    drawFunction(f);

                    formula[0].innerHTML = t>0?`<mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>${A}</mi><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><mi>${w}</mi><mi>x</mi><mo>+</mo><mi>${t}</mi><mo stretchy="false">)</mo>`:`<mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>${A}</mi><mi>s</mi><mi>i</mi><mi>n</mi><mo stretchy="false">(</mo><mi>${w}</mi><mi>x</mi><mi>${t}</mi><mo stretchy="false">)</mo>`;
                }
                
            }
        })
        
document.getElementsByClassName('controlWindow')[0].addEventListener('mouseup',function(){
    drag=[0,0,0];
})


//监听画布
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

        function f(x){
            return A*Math.sin(w*x+t);
        }
        drawFunction(f);
        
    });

canvas[0].addEventListener('pointerup', function() {
        isDragging = false;
    });

canvas[0].addEventListener('wheel',function(event){
    event.preventDefault();
    if(event.deltaY > 0){magnification/=1.1}
    else{magnification*=1.1}
    len = magnification * height/10;
    k = calculateTicks();

    function f(x){
        return A*Math.sin(w*x+t);
    }
    drawFunction(f);
})



function draw(){
    drawFunction(f);
}

function drawAsix(){
    let xPosition = null, yPosition = null;

    if(width / 4 + deltaX < 20)
        {xPosition = 20}
    else if(width / 4 + deltaX > width - 20)
        {xPosition = width - 20}
    else{xPosition = width / 4 + deltaX}

    if(3 * height / 4 + deltaY > height-20)
        {yPosition = height-20}
    else if(3 * height / 4 + deltaY < 20)
        {yPosition = 20}
    else{yPosition = 3 * height / 4 + deltaY}

    ctx.lineWidth = asixWidth;
    ctx.strokeStyle = asixColor;
    ctx.fillStyle = asixColor;
    //绘制坐标轴
    // 绘制x轴
    ctx.beginPath();
    ctx.moveTo(0, yPosition);
    ctx.lineTo(width - 10, yPosition);
    ctx.stroke();

    // 绘制x轴箭头
    ctx.beginPath();
    ctx.moveTo(width - 10*arrowSize, yPosition - 3*arrowSize);
    ctx.lineTo(width, yPosition);
    ctx.lineTo(width - 10*arrowSize, yPosition + 3*arrowSize);
    ctx.fill();

    // 绘制y轴
    ctx.beginPath();
    ctx.moveTo(xPosition, 10);
    ctx.lineTo(xPosition, height);
    ctx.stroke();

    // 绘制y轴箭头
    ctx.beginPath();
    ctx.moveTo(xPosition - 3*arrowSize, 10*arrowSize);
    ctx.lineTo(xPosition, 0);
    ctx.lineTo(xPosition + 3*arrowSize, 10*arrowSize);
    ctx.fill();

    ctx.strokeStyle = ticksColor;
    ctx.fillStyle = ticksColor;
    //标刻度
    ctx.textAlign = 'center';
    tickDirection =  1;
    drawXAsix(width / 4 + deltaX,yPosition);

    if(width / 4 + deltaX > width/20)
    {
        ctx.textAlign = 'right';
        tickDirection =  1;
    }
    else
    {
        ctx.textAlign = 'left';
        tickDirection =  -1;
    }
    drawYAsix(3 * height / 4 + deltaY,xPosition);
}

function drawYAsix(startPosition,xPosition){
    for(let n=1;startPosition-n*len*k > 0 || startPosition+n*len*k < height;n++)
        {
            ctx.beginPath();
            ctx.moveTo(xPosition, startPosition - n*len*k);
            ctx.lineTo(xPosition + tickLength*tickDirection, startPosition - n*len*k);
            ctx.stroke();
            ctx.fillText(n*k,xPosition - tickLength*tickDirection, startPosition - n*len*k);

            ctx.beginPath();
            ctx.moveTo(xPosition, startPosition + n*len*k);
            ctx.lineTo(xPosition+ tickLength*tickDirection, startPosition + n*len*k);
            ctx.stroke();
            ctx.fillText(-n*k,xPosition - tickLength*tickDirection, startPosition + n*len*k);
        }
}

function drawXAsix(startPosition,yPosition){
    for(let n=1;startPosition-n*len*k > 0 || startPosition+n*len*k < width;n++)
        {
            ctx.beginPath();
            ctx.moveTo(startPosition - n*len*k, yPosition);
            ctx.lineTo(startPosition - n*len*k, yPosition - tickLength*tickDirection);
            ctx.stroke();
            ctx.fillText(-n*k,startPosition - n*len*k, yPosition + tickLength*tickDirection);

            ctx.beginPath();
            ctx.moveTo(startPosition + n*len*k, yPosition);
            ctx.lineTo(startPosition + n*len*k, yPosition - tickLength*tickDirection);
            ctx.stroke();
            ctx.fillText(n*k,startPosition + n*len*k, yPosition + tickLength*tickDirection);
        }
}

function drawgrid(startPositionX,startPositionY){
    ctx.lineWidth = gridWidth;
    ctx.strokeStyle= gridColor;
    for(let n=1;startPositionY-n*len*k > 0 || startPositionY+n*len*k < height;n++)
        {
            ctx.beginPath();
            ctx.moveTo(0, startPositionY - n*len*k);
            ctx.lineTo(width, startPositionY - n*len*k);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, startPositionY + n*len*k);
            ctx.lineTo(width, startPositionY + n*len*k);
            ctx.stroke();
        }
    for(let n=1;startPositionX-n*len*k > 0 || startPositionX+n*len*k < width;n++)
        {
            ctx.beginPath();
            ctx.moveTo(startPositionX - n*len*k, 0);
            ctx.lineTo(startPositionX - n*len*k, height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(startPositionX + n*len*k, 0);
            ctx.lineTo(startPositionX + n*len*k, height);
            ctx.stroke();
        }
}

function drawFunction(f){
    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);

    drawAsix();
    if(ifdrawgrid == 1){drawgrid(width / 4 + deltaX,3 * height / 4 + deltaY)}

    ctx.lineWidth = functionWidth;

    let xmax = width + deltaX;
    xmax = xmax + width / 4 - deltaX;
    let xmin = -width / 4 - deltaX;
    xmin = xmin + width / 4 + deltaX;

    let ymax = height + deltaY;
    ymax = ymax + height / 4 - deltaY;
    let ymin = -height / 4 - deltaY;
    ymin = ymin + height / 4 + deltaY;

    setFunctionColor();
    ctx.beginPath();
    ctx.moveTo(0, height / 2); 
    for (let x = xmin; x <= xmax; x += step) {
        let y = -magnification*height*f( 10*(x-width/4-deltaX) /height/magnification)/10 + 3*height/4 +deltaY;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

function calculateTicks(){
    let n=1;
    if(magnification>1)
        {
            while(magnification>Math.pow(2,n)){n++;}
            return Math.pow(2,-n+1);
        }
    else
        {
            while(magnification<Math.pow(2,-n)){n++;}
            return Math.pow(2,n);
        }
}

function setFunctionColor() {
    let rgb = getFunctionColor();
    functionColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    ctx.strokeStyle = functionColor;
}