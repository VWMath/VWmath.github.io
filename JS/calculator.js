import{createMatrix, determinant,characteristicEquations,findEigenvaluesAndEigenvectors}from"./functions/Math/matrixOperations.js";
import{onlyEigenVectorToStr}from"./functions/Math/resultTostr.js";

let calculate = document.getElementById('calculate');
let verticalContainers = document.getElementsByClassName('verticalContainers')[0];
let determinantValue = verticalContainers.getElementsByTagName("h3")[0];
let eigenVector = document.getElementById("eigenVector");
let eigenValues = verticalContainers.getElementsByTagName('math')[0];
let eigenpolynomials = verticalContainers.getElementsByTagName('math')[1];

eigenValues.style.fontSize = 15+'rem';
eigenpolynomials.style.fontSize = 15+'rem';

let matrix = createMatrix(3,3);

for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
        calculate.getElementsByTagName("input")[3*i+j].value = 0;
    }
}

calculate.addEventListener('mouseleave',function(){
    getMatrixValue();
    setEigenVector();
    determinantValue.innerHTML = determinant(matrix);
    eigenValues.innerHTML = getEigenValues();
    eigenpolynomials.innerHTML = getPolymonials();
})



function getMatrixValue(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            matrix[j][i] = calculate.getElementsByTagName("input")[3*i+j].value;
            matrix[j][i] = parseFloat(matrix[j][i]);
        }
    }
}

function setEigenVector(){
    let h3 = eigenVector.getElementsByTagName('h3');
    while (h3.length>0) {
        eigenVector.removeChild(h3[0]);
    }
    let eigenVectorText = onlyEigenVectorToStr(findEigenvaluesAndEigenvectors(matrix));

    for(let i=0;i<eigenVectorText.length;i++){
        let alpha = document.createElement('h3');
        alpha.innerHTML = eigenVectorText[i];
        eigenVector.appendChild(alpha);
    }
}

function getEigenValues(){
    let result = findEigenvaluesAndEigenvectors(matrix);
    let eigenValues = '';
    for(let i=0;i<result.length-1;i++){
        eigenValues += `<msub><mi>λ</mi><mrow><mi>${i+1}</mi></mrow></msub><mo>=</mo><mn>${result[i][0]}</mn><mi>,</mi>`;
    }
    eigenValues += `<msub><mi>λ</mi><mrow><mi>${result.length}</mi></mrow></msub><mo>=</mo><mn>${result[result.length-1][0]}</mn>`;
    return eigenValues;
}

function getPolymonials(){
    let polynomialText = '<msup><mi>λ</mi><mrow><mn>3</mn></mrow></msup>';
    let polynomial = characteristicEquations(matrix);
    polynomialText += polynomial[1]<0?`<mi>${polynomial[1]}</mi><msup><mi>λ</mi><mrow><mn>2</mn></mrow></msup>`:`<mo>+</mo><mi>${polynomial[1]}</mi><msup><mi>λ</mi><mrow><mn>2</mn></mrow></msup>`;
    polynomialText += polynomial[2]<0?`<mi>${polynomial[2]}</mi><mi>λ</mi>`:`<mo>+</mo><mi>${polynomial[2]}</mi><mi>λ</mi>`;
    polynomialText += polynomial[3]<0?`<mi>${polynomial[3]}</mi>`:`<mo>+</mo><mi>${polynomial[3]}</mi>`;
    polynomialText += `<mo>=</mo><mn>0</mn>`;
    return polynomialText;
}