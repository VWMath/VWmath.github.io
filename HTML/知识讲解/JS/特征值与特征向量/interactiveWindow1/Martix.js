export{getVectorValue,getTransformedVectorValue,getVector,getTransformedVector,upload};

import { setPreMatrix,createMatrix, fill, getData, matrixMultiply} from "../../../../../JS/functions/Math/matrixOperations.js";
import { draw } from "./vector.js";

let matrixs = document.getElementsByClassName('marginFormular')[0].getElementsByTagName('div');

setPreMatrix(matrixs[0],2,2)
setPreMatrix(matrixs[1],2,1)
setPreMatrix(matrixs[2],2,1)

let matrixValue = matrixs[0].getElementsByTagName('input');
let vectorValue = matrixs[1].getElementsByTagName('input');
let transformedVectorValue = matrixs[2].getElementsByTagName('input');
transformedVectorValue[0].style.pointerEvents = "none";
transformedVectorValue[1].style.pointerEvents = "none";

let matrix = createMatrix(2,2);
let vector = createMatrix(2,1);

fill(matrix,0);
fill(vector,0);

let transformedVector = matrixMultiply(matrix,vector);

downLoad();
upload();

for(let i=0;i<4;i++){
    matrixValue[i].value = 0;
}

for(let i=0;i<2;i++){
    vectorValue[i].value = 0;
}

let modified = 0;
let deltaWidth = 7;

listen(matrixs[0],matrixValue,4);
listen(matrixs[1],vectorValue,2);

function listen (element,value,len){
    element.addEventListener('click',function(event){
        let clickedInput = 0;
        for(let i=0;i<len;i++){
            clickedInput = clickedInput || event.target === value[i];
        }
        if(clickedInput){
            modified = 1;
        }

    })

    element.addEventListener('keydown',function(){
        if(modified){
            for(let i=0;i<len;i++){
                value[i].style.width = value[i].value.length * deltaWidth + 'rem';
            }
            for(let i=0;i<2;i++){
                transformedVectorValue[i].style.width = transformedVectorValue[i].value.length * deltaWidth + 'rem';
            }
        }
    })

    element.addEventListener('mouseleave',function(){
        if(modified){
            downLoad();
            upload();
            draw();
            modified = 0;
        }
        
        for(let i=0;i<len;i++){
            value[i].blur();
            value[i].style.width = value[i].value.length * deltaWidth + 'rem';
        }
        for(let i=0;i<2;i++){
            transformedVectorValue[i].style.width = transformedVectorValue[i].value.length * deltaWidth + 'rem';
        }
        downLoad();
        upload();
        draw();
    })
}

function downLoad(){
    vector = getData(vectorValue,vector,2,1);
    matrix = getData(matrixValue,matrix,2,2);
}

function upload(){
    for(let i=0;i<2;i++){
        vectorValue[i].value = vector[i][0];
        for(let j=0;j<2;j++){
            matrixValue[2*i+j].value = matrix[j][i];
        }
    }
    transformedVector = matrixMultiply(matrix,vector);
    for(let i=0;i<2;i++){
        transformedVectorValue[i].value = transformedVector[i][0];
    }
}

function getTransformedVector(){
    return transformedVector;
}

function getVector(){
    return vector;
}

function getVectorValue(){
    return vectorValue;
}

function getTransformedVectorValue(){
    return transformedVectorValue;
}