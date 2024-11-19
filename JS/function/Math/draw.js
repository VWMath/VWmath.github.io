export{getStartPosition,drawAsix,drawgrid,drawFunction,calculateTicks,drawVector,node};

//position为画布坐标系,point为直角坐标系
function getStartPosition(initialPosition,borderPosition){
    let startPosition;
    if(initialPosition < 20)
        {startPosition = 20}
    else if(initialPosition > borderPosition)
        {startPosition = borderPosition}
    else{startPosition = initialPosition}
    return startPosition;
}

function drawXAsix(ctx,yPosition,width,arrowSize){
    ctx.beginPath();
    ctx.moveTo(0, yPosition);
    ctx.lineTo(width - 10, yPosition);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 10*arrowSize, yPosition - 3*arrowSize);
    ctx.lineTo(width, yPosition);
    ctx.lineTo(width - 10*arrowSize, yPosition + 3*arrowSize);
    ctx.fill();
}

function drawYAsix(ctx,xPosition,height,arrowSize){
    ctx.beginPath();
    ctx.moveTo(xPosition, 10);
    ctx.lineTo(xPosition, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xPosition - 3*arrowSize, 10*arrowSize);
    ctx.lineTo(xPosition, 0);
    ctx.lineTo(xPosition + 3*arrowSize, 10*arrowSize);
    ctx.fill();
}

function drawYTicks(ctx,startPosition,xPosition,height,unitLength,unitTick,tickLength,tickDirection){
    for(let n=1;startPosition-n*unitLength*unitTick > 0 || startPosition+n*unitLength*unitTick < height;n++)
        {
            ctx.beginPath();
            ctx.moveTo(xPosition, startPosition - n*unitLength*unitTick);
            ctx.lineTo(xPosition + tickLength*tickDirection, startPosition - n*unitLength*unitTick);
            ctx.stroke();
            ctx.fillText(n*unitTick,xPosition - tickLength*tickDirection, startPosition - n*unitLength*unitTick);

            ctx.beginPath();
            ctx.moveTo(xPosition, startPosition + n*unitLength*unitTick);
            ctx.lineTo(xPosition+ tickLength*tickDirection, startPosition + n*unitLength*unitTick);
            ctx.stroke();
            ctx.fillText(-n*unitTick,xPosition - tickLength*tickDirection, startPosition + n*unitLength*unitTick);
        }
}

function drawXTicks(ctx,startPosition,yPosition,width,unitLength,unitTick,tickLength,tickDirection){
    for(let n=1;startPosition-n*unitLength*unitTick > 0 || startPosition+n*unitLength*unitTick < width;n++)
        {
            ctx.beginPath();
            ctx.moveTo(startPosition - n*unitLength*unitTick, yPosition);
            ctx.lineTo(startPosition - n*unitLength*unitTick, yPosition - tickLength*tickDirection);
            ctx.stroke();
            ctx.fillText(-n*unitTick,startPosition - n*unitLength*unitTick, yPosition + tickLength*tickDirection);

            ctx.beginPath();
            ctx.moveTo(startPosition + n*unitLength*unitTick, yPosition);
            ctx.lineTo(startPosition + n*unitLength*unitTick, yPosition - tickLength*tickDirection);
            ctx.stroke();
            ctx.fillText(n*unitTick,startPosition + n*unitLength*unitTick, yPosition + tickLength*tickDirection);
        }
}

function drawTicks(ctx,xPosition,yPosition,startPosition,width,height,unitLength,unitTick,tickDirection,tickLength,font){
    ctx.font = font;
    ctx.textAlign = 'center';
    tickDirection =  1;
    drawXTicks(ctx,startPosition[0],yPosition,width,unitLength,unitTick,tickLength,tickDirection);

    if(startPosition[0] > width/20)
    {
        ctx.textAlign = 'right';
        tickDirection =  1;
    }
    else
    {
        ctx.textAlign = 'left';
        tickDirection =  -1;
    }
    drawYTicks(ctx,startPosition[1],xPosition,height,unitLength,unitTick,tickLength,tickDirection);
}

function calculateTicks(magnification){
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

function drawAsix(ctx,xPosition,yPosition,startPosition,width,height,asixWidth,asixColor,arrowSize,ticksColor,tickDirection,tickLength,unitLength,unitTick,font){
    ctx.lineWidth = asixWidth;
    ctx.strokeStyle = asixColor;
    ctx.fillStyle = asixColor;

    drawXAsix(ctx,yPosition,width,arrowSize);
    drawYAsix(ctx,xPosition,height,arrowSize);

    ctx.strokeStyle = ticksColor;
    ctx.fillStyle = ticksColor;

    drawTicks(ctx,xPosition,yPosition,startPosition,width,height,unitLength,unitTick,tickDirection,tickLength,font);
}

//绘制网格
function drawgrid(ctx,width,height,startPosition,gridWidth,gridColor,unitLength,unitTick){
    ctx.lineWidth = gridWidth;
    ctx.strokeStyle= gridColor;
    for(let n=1;startPosition[1]-n*unitLength*unitTick > 0 || startPosition[1]+n*unitLength*unitTick < height;n++)
        {
            ctx.beginPath();
            ctx.moveTo(0, startPosition[1] - n*unitLength*unitTick);
            ctx.lineTo(width, startPosition[1] - n*unitLength*unitTick);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, startPosition[1] + n*unitLength*unitTick);
            ctx.lineTo(width, startPosition[1] + n*unitLength*unitTick);
            ctx.stroke();
        }
    for(let n=1;startPosition[0]-n*unitLength*unitTick > 0 || startPosition[0]+n*unitLength*unitTick < width;n++)
        {
            ctx.beginPath();
            ctx.moveTo(startPosition[0] - n*unitLength*unitTick, 0);
            ctx.lineTo(startPosition[0] - n*unitLength*unitTick, height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(startPosition[0] + n*unitLength*unitTick, 0);
            ctx.lineTo(startPosition[0] + n*unitLength*unitTick, height);
            ctx.stroke();
        }
}

//坐标转换
function canvasToCoordinateSystemPosition(point,height,initialPosition,magnification){
    point[0] = point[0]*magnification+initialPosition[0];
    point[1] = -10*point[1]/height*magnification+initialPosition[1];
    return point;
}

function pointToCoordinateSystemPosition(point,height,initialPosition,magnification){
    point[0] = magnification*height*point[0]/10;
    point[1] = magnification*height*point[1]/10;

    point[0] = point[0]+initialPosition[0];
    point[1] = -point[1]+initialPosition[1];
    return point;
}

//添加标注
function node(ctx,point,font,color,text,height,initialPosition,magnification){
    ctx.font = font;
    ctx.fillStyle = color;
    point = pointToCoordinateSystemPosition(point,height,initialPosition,magnification);
    ctx.fillText(text,point[0],point[1]);
}

//绘制函数，向量
function drawFunction(ctx,f,width,height,initialPosition,step,magnification,functionColor,functionWidth){
    ctx.strokeStyle = functionColor;
    ctx.lineWidth = functionWidth;

    let xArray = new Array;
    let yArray = new Array;
    for(let i=-initialPosition[0]/magnification;i<(width-initialPosition[0])/magnification;i+=step/magnification){
        let point = canvasToCoordinateSystemPosition([i,f(i)],height,initialPosition,magnification);
        xArray.push(point[0]);
        yArray.push(point[1]);
    }

    ctx.beginPath();
    ctx.moveTo(xArray[0], yArray[0]);
    for (let i = 1; i <= xArray.length; i++) {
        ctx.lineTo(xArray[i], yArray[i]);
    }
    ctx.stroke();
}

function drawVector(ctx,startPoint,endPoint,initialPosition,lineWidth,height,color,arrowSize,magnification){
    if(endPoint[0]==startPoint[0] && endPoint[1]==startPoint[1]){return;}

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;

    arrowSize /= 5;

    let k = endPoint[0]-startPoint[0] == 0 ? null : (endPoint[1]-startPoint[1])/(endPoint[0]-startPoint[0]);
    let c = k==null ? 0 : arrowSize/Math.pow(1+k*k,0.5);

    let direction
    if(endPoint[0]-startPoint[0] == 0){direction = endPoint[1]-startPoint[1]>0 ? 1 : -1;}
    else{direction = endPoint[0]-startPoint[0]>0 ? -1 : 1;}
    
    //计算点坐标
    let x1 = endPoint[0] + (k==null ? -0.268 * arrowSize : (1 - 0.268*k)*c/magnification) * direction;
    let x2 = endPoint[0] + (k==null ? 0.268 * arrowSize : (1 + 0.268*k)*c/magnification) * direction;
    let y1 = endPoint[1] + (k==null ? -arrowSize : (0.268 + k)*c/magnification) * direction;
    let y2 = endPoint[1] + (k==null ? -arrowSize : (-0.268 + k)*c/magnification) * direction;
    
    //将坐标转化为画布对应的位置
    startPoint = pointToCoordinateSystemPosition(startPoint,height,initialPosition,magnification);
    endPoint = pointToCoordinateSystemPosition(endPoint,height,initialPosition,magnification);
    let positon1 = pointToCoordinateSystemPosition([x1,y1],height,initialPosition,magnification);
    let positon2 = pointToCoordinateSystemPosition([x2,y2],height,initialPosition,magnification);

    c *= height/10 * direction;
    arrowSize *= height/10 * direction;

    ctx.beginPath();
    ctx.moveTo(startPoint[0],startPoint[1]);
    ctx.lineTo(endPoint[0]+c,endPoint[1]-(k==null ? -arrowSize : k*c));
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(endPoint[0],endPoint[1]);
    ctx.lineTo(positon1[0],positon1[1]);
    ctx.lineTo(positon2[0],positon2[1]);
    ctx.fill();
}