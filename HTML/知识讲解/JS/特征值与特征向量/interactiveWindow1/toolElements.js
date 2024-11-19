import { addSlideBar,addBotton } from "../../../../../JS/functions/toolElement.js";
import { draw,drawAnimationVector } from "./vector.js";
import { getVector, getTransformedVector,getVectorValue,getTransformedVectorValue,upload } from "./Martix.js";
import { createMatrix } from "../../../../../JS/functions/Math/matrixOperations.js";

let controlBox = document.getElementsByClassName('toolElements');
let vector = getVector();

let vectorValue = getVectorValue();
let transformedVectorValue = getTransformedVectorValue();

let deltaWidth = 7;


addSlideBar(controlBox[0],130,30,10,20,2.5,1,interactive1);
addSlideBar(controlBox[0],130,30,10,20,2.5,1,interactive2);

addBotton(document.getElementsByClassName('controlWindow')[0],55,20,3,"white","11rem Sonti",'rgb(80,80,80)',"播放动画",1,vectorAnimation);

function vectorAnimation(){
    let t=0,r,g,b;
    let animationVecot = createMatrix(2,1);
    let transformedVector = getTransformedVector();

    let time = setInterval(function(){
        if(t>1){clearInterval(time);}
        animationVecot[0][0] = vector[0][0] + t*(transformedVector[0][0]-vector[0][0]);
        animationVecot[1][0] = vector[1][0] + t*(transformedVector[1][0]-vector[1][0]);
        r = 5 + t*225;
        g = 250 - t*150;
        b = 50 - t*40;
        let rgb = `rgb(${r},${g},${b})`

        draw();
        drawAnimationVector([animationVecot[0][0],animationVecot[1][0]],rgb);
        t+=0.01;
    },8)

}

function interactive1(relativeDistance){
    setValue(vector,1,1,5,-5,relativeDistance);
    upload();
    draw();
    for(let i=0;i<2;i++){
        vectorValue[i].style.width = vectorValue[i].value.length * deltaWidth + 'rem';
        transformedVectorValue[i].style.width = transformedVectorValue[i].value.length * deltaWidth + 'rem';        
    }
}

function interactive2(relativeDistance){
    setValue(vector,2,1,5,-5,relativeDistance);
    upload();
    draw();
    for(let i=0;i<2;i++){
        vectorValue[i].style.width = vectorValue[i].value.length * deltaWidth + 'rem';
        transformedVectorValue[i].style.width = transformedVectorValue[i].value.length * deltaWidth + 'rem';        
    }
}

function setValue(vector,row,column,maxValue,minValue,relativeDistance){
    let a = minValue + relativeDistance*(maxValue-minValue);
    vector[row-1][column-1] = a;
}