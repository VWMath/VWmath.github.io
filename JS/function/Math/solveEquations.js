export{unaryLinearEquations,unaryQuadraticEquations,unaryCubicEquations,unaryHigher_OrderEquations};

import { createMatrix } from "./matrixOperations.js";

function polynomialsValue(coefficientArray,x){
    let result = 0;
    for(let i=0;i<coefficientArray.length;i++){
        result += coefficientArray[i]*Math.pow(x,coefficientArray.length-i-1);
    }

    return result;
}

function unaryLinearEquations(coefficientArray){
    if(coefficientArray[0] == 0 || coefficientArray.length > 2){
        console.log('该方程不是一元一次方程');
        return;
    }
    return -coefficientArray[1]/coefficientArray[0];
}

function unaryQuadraticEquations(coefficientArray){
    if(coefficientArray[0] == 0 || coefficientArray.length > 3){
        console.log('该方程不是一元二次方程');
        return;
    }
    let delta = coefficientArray[1]*coefficientArray[1] - 4*coefficientArray[0]*coefficientArray[2];
    let result = createMatrix(2,2);

    if(delta < 0){
        result[0][0] = -coefficientArray[1]/coefficientArray[0]/2;
        result[0][1] = Math.pow(-delta,1/2)/coefficientArray[0]/2

        result[1][0] = result[0][0];
        result[1][1] = -result[0][1];
    }
    else{
        result[0][0] = (-coefficientArray[1]+Math.pow(delta,1/2))/coefficientArray[0]/2;
        result[0][1] = 0;

        result[1][0] = (-coefficientArray[1]-Math.pow(delta,1/2))/coefficientArray[0]/2;
        result[1][1] = 0;
    }
    return result;
}

function unaryCubicEquations(coefficientArray){
    if(coefficientArray[0] == 0 || coefficientArray.length > 4){
        console.log('该方程不是一元三次方程');
        return;
    }
    let result = createMatrix(3,2);
    let derivativePolynomialsValue = [3*coefficientArray[0],2*coefficientArray[1],coefficientArray[2]];
    let extremePoints = unaryQuadraticEquations(derivativePolynomialsValue);
    //设置迭代初始点
    let symbol = coefficientArray[0]>0?1:-1;
    let x;


    if(symbol>0){x = extremePoints[0][0]>extremePoints[1][0]?extremePoints[1][0]-1:extremePoints[0][0]-1} 
    else if(symbol<0){x = extremePoints[0][0]>extremePoints[1][0]?extremePoints[0][0]+1:extremePoints[1][0]+1}

    let oldX1 = x-0.1,oldX2;
    while(Math.abs(x-oldX1)>Math.pow(10,-16)){
        oldX2 = oldX1;
        oldX1 = x;
        x -= polynomialsValue(coefficientArray,x)/polynomialsValue(derivativePolynomialsValue,x);
        if(oldX2 == x){x = (oldX2+x)/2;break;}
    }

    result[0] = [x,0];
    let newCoefficientArray = new Array(3);
    newCoefficientArray[0] = coefficientArray[0];
    newCoefficientArray[1] = 3*coefficientArray[0]*x+coefficientArray[1];
    newCoefficientArray[2] = 3*coefficientArray[0]*x*x + 2*coefficientArray[1]*x + coefficientArray[2];

    result = [result[0],...unaryQuadraticEquations(newCoefficientArray)];
    result[1][0] += x;
    result[2][0] += x;

    for(let i=0;i<3;i++){
        for(let j=0;j<2;j++){
            result[i][j] = parseFloat(result[i][j].toFixed(4));
        }
    }
    
    return result;
}

function unaryHigher_OrderEquations(coefficientArray){
    if(coefficientArray.length == 1){
        console.log('请输入方程');
        return;
    }
}
