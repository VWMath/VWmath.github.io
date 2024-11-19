export{getA, getLambda1, getLambda2, getAlpha1, getAlpha2, getAlpha1Value, getAlpha2Value, getBetaValue,getBetaValue_,getBetaSlash,getBetaSlashValue,getBeta,upload};

import { setPreMatrix,createMatrix, fill, getData, matrixMultiply, findEigenvaluesAndEigenvectors,solveSystemsOfLinearEquations} from "../../../../../JS/functions/Math/matrixOperations.js";
import { draw } from "./schematicAnimation.js";

let matrixs1 = document.getElementsByClassName('marginFormular')[1].getElementsByTagName('div');
let matrixs2 = document.getElementsByClassName('marginFormular')[2].getElementsByTagName('div');
let matrixs4 = document.getElementsByClassName('marginFormular')[4].getElementsByTagName('div');

//矩阵相乘初始化
setPreMatrix(matrixs1[0],2,2);
setPreMatrix(matrixs1[1],2,1);
setPreMatrix(matrixs1[2],2,1);

let matrixValue = matrixs1[0].getElementsByTagName('input');
let betaValue = matrixs1[1].getElementsByTagName('input');
let betaSlashValue = matrixs1[2].getElementsByTagName('input');

betaSlashValue[0].style.pointerEvents = "none";
betaSlashValue[1].style.pointerEvents = "none";

let matrix = createMatrix(2,2);
let beta = createMatrix(2,1);

fill(matrix,0);
fill(beta,0);

let betaSlash = matrixMultiply(matrix,beta);

//添加特征向量
setPreMatrix(matrixs2[0],2,1);
setPreMatrix(matrixs2[1],2,1);

let alpha1Value = matrixs2[0].getElementsByTagName('input');
let alpha2Value = matrixs2[1].getElementsByTagName('input');

alpha1Value[0].style.pointerEvents = "none";
alpha1Value[1].style.pointerEvents = "none";
alpha2Value[0].style.pointerEvents = "none";
alpha2Value[1].style.pointerEvents = "none";

let eigenVectors = findEigenvaluesAndEigenvectors(matrix);

let alpha1 = createMatrix(2,1);
let alpha2 = createMatrix(2,1);

setAlpha(alpha1,eigenVectors[0][1][1]);
setAlpha(alpha2,eigenVectors[0][1][2]);

//特征值
let lambda1 = eigenVectors[0][0];
let lambda2 = eigenVectors[0][0];
let lambda1Value = document.getElementsByClassName('marginFormular')[3].getElementsByTagName('h3')[0];
let lambda2Value = document.getElementsByClassName('marginFormular')[3].getElementsByTagName('h3')[1];

//向量分解初始化
setPreMatrix(matrixs4[0],2,1);
setPreMatrix(matrixs4[1],2,1);
setPreMatrix(matrixs4[2],2,1);

let betaValue_ = matrixs4[0].getElementsByTagName('input');
let alpha1Value_ = matrixs4[1].getElementsByTagName('input');
let alpha2Value_ = matrixs4[2].getElementsByTagName('input');

alpha1Value_[0].style.pointerEvents = "none";
alpha1Value_[1].style.pointerEvents = "none";
alpha2Value_[0].style.pointerEvents = "none";
alpha2Value_[1].style.pointerEvents = "none";


//分解向量
let augmentatianMatrix = createMatrix(2,3);
let a;
let aValue = document.getElementsByClassName('marginFormular')[4].getElementsByTagName('h3');

downLoad();
upload();

for(let i=0;i<4;i++){
    matrixValue[i].value = 0;
}

for(let i=0;i<2;i++){
    betaValue[i].value = 0;
}

let modified = 0;
let deltaWidth = 7;

listen(matrixs1[0],matrixValue,4);
listen(matrixs1[1],betaValue,2);

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
                betaSlashValue[i].style.width = betaSlashValue[i].value.length * deltaWidth + 'rem';
                betaValue_[i].style.width = betaValue_[i].value.length * deltaWidth + 'rem';
                alpha1Value[i].style.width = alpha1Value[i].value.length * deltaWidth + 'rem';
                alpha2Value[i].style.width = alpha2Value[i].value.length * deltaWidth + 'rem';
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
            betaSlashValue[i].style.width = betaSlashValue[i].value.length * deltaWidth + 'rem';
            betaValue_[i].style.width = betaValue_[i].value.length * deltaWidth + 'rem';
            alpha1Value[i].style.width = alpha1Value[i].value.length * deltaWidth + 'rem';
            alpha2Value[i].style.width = alpha2Value[i].value.length * deltaWidth + 'rem';
        }
        downLoad();
        upload();
        draw();
    })
}

function downLoad(){
    beta = getData(betaValue,beta,2,1);
    matrix = getData(matrixValue,matrix,2,2);
}

function upload(){
    for(let i=0;i<2;i++){
        eigenVectors = findEigenvaluesAndEigenvectors(matrix);
        
        if(eigenVectors.length==2){
            setAlpha(alpha1,eigenVectors[0][1][1]);
            setAlpha(alpha2,eigenVectors[1][1][1]);
            lambda1 = eigenVectors[0][0];
            lambda2 = eigenVectors[1][0];
        }
        else{
            setAlpha(alpha1,eigenVectors[0][1][1]);
            setAlpha(alpha2,eigenVectors[0][1][2]);
            lambda1 = eigenVectors[0][0];
            lambda2 = eigenVectors[0][0];
        }

        for(let i=0;i<2;i++){
            for(let j=0;j<2;j++){
                augmentatianMatrix[j][i] = i==0?alpha1[j][0]:alpha2[j][0];
            }
            augmentatianMatrix[i][2] = beta[i][0];
        }

        a = solveSystemsOfLinearEquations(augmentatianMatrix);

        lambda1Value.innerHTML = lambda1;
        lambda2Value.innerHTML = lambda2;
        aValue[1].innerHTML = a[0];
        aValue[2].innerHTML = a[1]>=0?'+'+a[1]:a[1];

        betaValue[i].value = beta[i][0];
        betaValue_[i].value = beta[i][0];

        alpha1Value[i].value = alpha1[i][0];
        alpha1Value_[i].value = alpha1[i][0];
        
        alpha2Value[i].value = alpha2[i][0];
        alpha2Value_[i].value = alpha2[i][0];
        
        for(let j=0;j<2;j++){
            matrixValue[2*i+j].value = matrix[j][i];
        }
    }
    betaSlash = matrixMultiply(matrix,beta);
    for(let i=0;i<2;i++){
        betaSlashValue[i].value = betaSlash[i][0];
    }
}

function getA(){
    return a;
}

function getLambda1(){
    return lambda1;
}

function getLambda2(){
    return lambda2;
}

function getAlpha1(){
    return alpha1;
}

function getAlpha2(){
    return alpha2;
}

function getAlpha1Value(){
    return alpha1Value;
}

function getAlpha2Value(){
    return alpha2Value;
}

function getBeta(){
    return beta;
}

function getBetaValue(){
    return betaValue;
}

function getBetaValue_(){
    return betaValue_;
}

function getBetaSlash(){
    return betaSlash;
}

function getBetaSlashValue(){
    return betaSlashValue;
}

function setAlpha(alpha,vector){
    alpha[0][0] = vector[0];
    alpha[1][0] = vector[1];
}