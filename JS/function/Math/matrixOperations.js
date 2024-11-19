//创建矩阵，修改数值及判断矩阵关系和类型
export{addMathMatrix,setPreMatrix,createMatrix,fill,getData,matrixEqual};
//矩阵运算及变换
export{matrixAdd,matrixSubtraction,MultiplicationOfNumbers,matrixMultiply};
//求行列式，逆矩阵，特征值等
export{determinant,transpose,solveSystemsOfLinearEquations,characteristicEquations,findEigenvaluesAndEigenvectors};

import{unaryLinearEquations,unaryQuadraticEquations,unaryCubicEquations,unaryHigher_OrderEquations}from"./solveEquations.js"
import{strTonum}from"../../../JS/functions/data/processing.js";

//创建矩阵
function addMathMatrix(element,rows,columns){
    let moOPEN = `<mrow data-mjx-texclass="INNER">
                        <mo data-mjx-texclass="OPEN">(</mo>
                            <mtable columnspacing="1em" rowspacing="4pt">`;
                        
    let moCLOSE = `</mtable>
                    <mo data-mjx-texclass="CLOSE">)</mo>
                    </mrow>`;
    let matrix = ``;
    let mtrStart = `<mtr>`;
    let mtrEnd = `</mtr>`;
    let mtd = `<mtd></mtd>`;
    
    for(let i=0;i<rows;i++){
        matrix += mtrStart;
        for(let j=0;j<columns;j++){
            matrix += mtd;
        }
        matrix += mtrEnd;
    }
    element.innerHTML += moOPEN + matrix + moCLOSE;
}

function setPreMatrix(element,rows,columns){
    element.className = 'matrix';
    for(let i=0;i<columns;i++){
        let column = document.createElement('pre');
        column.className = 'column';
        for(let j=0;j<rows;j++){
            column.innerHTML += `<input type="text">`;
        }
        element.appendChild(column);
    }
}

function createMatrix(rows, columns) {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(columns);
    }
    fill(arr,0);
    return arr;
}

function createIdentityMatrix(n){
    let E = createMatrix(n,n);

    for (let i = 0; i < n; i++) {
        E[i][i] = 1;
    }
    return E;
}

function createCoefficientsMartrix(augmentationMatrix){
    let coefficientsMatrix = createMatrix(augmentationMatrix.length,augmentationMatrix[0].length-1);
    for(let i=0;i<coefficientsMatrix.length;i++){
        for(let j=0;j<coefficientsMatrix[0].length;j++){
            coefficientsMatrix[i][j] = augmentationMatrix[i][j];
        }
    }
    return coefficientsMatrix;
}

function deepCopyMatrix(matrix){
    let matrix0 = createMatrix(matrix.length,matrix[0].length);
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            matrix0[i][j] = matrix[i][j];
        }
    }
    return matrix0;
}

//修改数值
function fill(matrix,number){
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            matrix[i][j] = number;
        }
    }
    return matrix;
}

function getData(matrixValue,matrix,rows,colunms){
    for(let i=0;i<colunms;i++){
        for(let j=0;j<rows;j++){
            matrix[j][i] = strTonum(matrixValue[colunms*i+j].value);
        }
    }
    return matrix;
}

//判断矩阵关系，类型
function matrixEqual(matrix1,matrix2){
    let m = matrixSubtraction(matrix1,matrix2);
    let result = true;
    for(let i=0;i<m.length;i++){
        for(let j=0;j<m[0].length;j++){
            result = result && m[i][j]==0;
        }
    }
    return result;
}

function isDiagonalMatrix(matrix){
    let isDiagonalMatrix = true;
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            isDiagonalMatrix = i==j ? isDiagonalMatrix : isDiagonalMatrix&&matrix[i][j] == 0;
        }
    }
    return isDiagonalMatrix;
}

function isZeorMatrix(matrix){
    let zeorMatrix = fill(createMatrix(matrix.length,matrix[0].length),0);
    return matrixEqual(zeorMatrix,matrix);
}

function coefficientsMatrixIsZeroMartix(augmentationMatrix){
    let coefficientsMatrix = createCoefficientsMartrix(augmentationMatrix);
    return isZeorMatrix(coefficientsMatrix);
}
//矩阵的加减，数乘，乘法运算
function matrixAdd(matrix1,matrix2){
    let matrix = createMatrix(matrix1.length,matrix1[0].length);
    if(matrix1.length == matrix2.length && matrix1[0].length == matrix2[0].length)
        {
            for(let i=0;i<matrix1.length;i++)
                {
                    for(let j=0;j<matrix1[0].length;j++)
                        {
                            matrix[i][j] = matrix1[i][j] + matrix2[i][j];
                        }
                }
        }
    else{
        console.log('两矩阵不同型');
        return;
    }
    return matrix;
}

function matrixSubtraction(matrix1,matrix2){
    let matrix = createMatrix(matrix1.length,matrix1[0].length);
    if(matrix1.length == matrix2.length && matrix1[0].length == matrix2[0].length)
        {
            for(let i=0;i<matrix1.length;i++)
                {
                    for(let j=0;j<matrix1[0].length;j++)
                        {
                            matrix[i][j] = matrix1[i][j] - matrix2[i][j];
                        }
                }
        }
    else{
        console.log('两矩阵不同型');
        return;
    }
    return matrix;
}

function MultiplicationOfNumbers(matrix,k){
    let matrix0 = deepCopyMatrix(matrix);
    for(let i=0;i<matrix0.length;i++)
        {
            for(let j=0;j<matrix0[0].length;j++)
                {
                    matrix0[i][j] *= k;
                }
        }
    return matrix0;
}

function matrixMultiply(matrix1,matrix2){
    let matrix = createMatrix(matrix1.length,matrix2[0].length);
    if(matrix1[0].length == matrix2.length)
        {
            for(let i=0;i<matrix1.length;i++)
                {
                    for(let j=0;j<matrix2[0].length;j++)
                        {
                            let c = 0;
                            //求乘积的第ij项
                            for(let n=0;n<matrix2.length;n++)
                                {
                                    c += matrix1[i][n]*matrix2[n][j];
                                }
                            matrix[i][j] = c;
                        }
                }
        }

    else{
        console.log('矩阵无法相乘');
        return;
    }
    
    return matrix;
}

//行变换
function kRn(matrix,k,rown){
    if(rown > matrix.length){
        console.log('超出矩阵范围');
        return;
    }
    rown -= 1;
    for(let i=0;i<matrix[0].length;i++){
        matrix[rown][i] *= k;
    }
}

function addkRmToRn(matrix,k,rowm,rown){
    if(rowm > matrix.length || rown > matrix.length){
        console.log('超出矩阵范围');
        return;
    }
    rowm -= 1,rown -= 1;
    for(let i=0;i<matrix[0].length;i++){
        matrix[rown][i] += k*matrix[rowm][i];
    }
}

function swapRow(matrix,rowm,rown){
    let a = matrix[rowm-1];
    matrix[rowm-1] = matrix[rown-1];
    matrix[rown-1] = a;
}
//列变换
function kCn(matrix,k,cown){
    if(cown > matrix[0].length){
        console.log('超出矩阵范围');
        return;
    }
    cown -= 1;
    for(let i=0;i<matrix.length;i++){
        matrix[i][cown] *= k;
    }
}

function addkCmToCn(matrix,k,cowm,cown){
    if(cowm > matrix[0].length || cown > matrix[0].length){
        console.log('超出矩阵范围');
        return;
    }
    cowm -= 1,cown -= 1;
    for(let i=0;i<matrix.length;i++){
        matrix[i][cown] += k*matrix[i][cowm];
    }
}

function swapColumn(matrix,columnM,columnN){
    for(let i=0;i<matrix.length;i++){
        let t = matrix[i][columnM-1];
        matrix[i][columnM-1] = matrix[i][columnN-1];
        matrix[i][columnN-1] = t;
    }
}

//求梯形矩阵，行列式，转置，求逆矩阵
function getTrapezoidalMatrix(matrix){
    let matrix0 = deepCopyMatrix(matrix);
    let rows = matrix0.length;
    let columns = matrix0[0].length;
    let t=1,m;

    for(let n=0;n<rows;n++){
        //寻找第一个非零元素
        for(m=n;m<columns;m++){
            while(matrix0[n][m]==0){
                if(n < rows-t){
                    swapRow(matrix0,rows-t+1,n+1);
                    t+=1;
                }
                else{break;}
            }
            t=1;
            if(matrix0[n][m]!=0){break;}
        }
    
        if(m==columns){return matrix0;}

        //消列
        for(let i=n+1;i<rows;i++){
            let k = -matrix0[i][m]/matrix0[n][m];
            addkRmToRn(matrix0,k,n+1,i+1);
        }
    }
    return matrix0;
}

function determinant(matrix){
    let matrix0 = deepCopyMatrix(matrix)
    let rows = matrix0.length;
    let columns = matrix0[0].length;
    let t = 1,b=0,m;
    if(rows != columns){
        console.log('矩阵不是方阵');
        return;
    }

    let resulte = 1;

    for(let n=0;n<rows;n++){
        //寻找第一个非零元素
        for(m=n;m<columns;m++){
            while(matrix0[n][m]==0){
                if(n < rows-t){
                    swapRow(matrix0,rows-t+1,n+1);
                    t+=1;
                }
                else{break;}
            }
            b += t-1;
            t=1;
            if(matrix0[n][m]!=0){break;}
        }
    
        if(m==columns){return 0;}

        //消列
        for(let i=n+1;i<rows;i++){
            let k = -matrix0[i][m]/matrix0[n][m];
            addkRmToRn(matrix0,k,n+1,i+1);
        }
    }

    for(let i=0;i<rows;i++){
        resulte *= matrix0[i][i];
    }
    return b%2==0? resulte : -resulte;
}

function transpose(matrix){
    let matrix0 = deepCopyMatrix(matrix)
    let matrix_T = createMatrix(matrix0[0].length,matrix0.length);
    for(let i=0;i<matrix_T.length;i++){
        for(let j=0;j<matrix_T[0].length;j++){
            matrix_T[i][j] = matrix0[j][i];
        }
    }
    return matrix_T;
}

function inverse(matrix){
    let matrix0 = deepCopyMatrix(matrix)
    let d = determinant(matrix0);
    if(d == 0 || d == null){console.log("逆矩阵不存在");return;}

    let inverseMartix = createIdentityMatrix(matrix0.length);
    let rows = matrix0.length;
    let columns = matrix0[0].length;
    let t=1,m;

    for(let n=0;n<rows;n++){
        //寻找第一个非零元素
        for(m=n;m<columns;m++){
            while(matrix0[n][m]==0){
                if(n < rows-t){
                    swapRow(matrix0,rows-t,n);
                    swapRow(inverseMartix,rows-t,n);
                    t+=1;
                }
                else{break;}
            }
            t=1;
            if(matrix0[n][m]!=0){break;}
        }
    
        if(m==columns){return matrix0;}

        //消列
        for(let i=n+1;i<rows;i++){
            let k = -matrix0[i][m]/matrix0[n][m];
            addkRmToRn(inverseMartix,k,n+1,i+1);
            addkRmToRn(matrix0,k,n+1,i+1);
        }
    }

    for(let i=0;i<rows;i++){
        let a = 1/matrix0[i][i];
        kRn(matrix0,a,i+1);
        kRn(inverseMartix,a,i+1);
    }

    for(let j=columns-1;j>0;j--){
        for(let i=j-1;i>-1;i--){
            addkRmToRn(inverseMartix,-matrix0[i][j],j+1,i+1);
        }
    }

    return inverseMartix;
}

//秩
function rankOfTrapezoidalMatrix(trapezoidalMatrix){
    let rank = 0;
    let isZeroVecor = true;

    for(let i=trapezoidalMatrix.length-1;i>=0;i--){
        for(let j=0;j<trapezoidalMatrix[0].length;j++){
            isZeroVecor = isZeroVecor && trapezoidalMatrix[i][j]==0;
        }

        if(!isZeroVecor){
            rank = i+1;
            break;
        }
    }
    return rank;
}

function rank(matrix){
    return rankOfTrapezoidalMatrix(getTrapezoidalMatrix(matrix));
}

//线性方程组
function getCoefficientsMatrix(augmentationMatrix){
    let matrix = createMatrix(augmentationMatrix.length,augmentationMatrix[0].length-1);
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            matrix[i][j] = augmentationMatrix[i][j];
        }
    }
    return matrix;
}

function thereIsASolution(augmentationMatrix){
    let matrix = getCoefficientsMatrix(augmentationMatrix);
    if(!(matrix.length == augmentationMatrix.length && matrix[0].length+1 == augmentationMatrix[0].length)){
        console.log('输入的不是线性方程组');
        return;
    }
    return rank(matrix) == rank(augmentationMatrix);    
}

function recursion(augmentationMatrix){
    let matrix = getCoefficientsMatrix(augmentationMatrix);
    let rows = matrix.length, columns = matrix[0].length;
    let solution = new Array(columns).fill(0);

    solution[columns-1] = augmentationMatrix[rows-1][columns]/matrix[rows-1][columns-1];

    for(let i=columns-2;i>=0;i--){
        for(let j=i+1;j<columns;j++){
            solution[i] -= matrix[i][j]*solution[j]/matrix[i][i];
        }
        solution[i] += augmentationMatrix[i][columns]/matrix[i][i];
    }
    return solution;
}

function solveSystemsOfLinearEquations(augmentationMatrix){
    let columns = augmentationMatrix[0].length-1,rows = augmentationMatrix.length;
    if(!(thereIsASolution(augmentationMatrix))){console.log('方程组无解');return;}
    //零矩阵
    if(isZeorMatrix(augmentationMatrix)){
        let result = new Array;
        result.push(new Array(columns).fill(0))
            for(let i=0;i<rows;i++){
                let vector = new Array(columns).fill(0);
                vector[i]=1;
                result.push(vector);
            }
        return result;
    }
    let r = rank(augmentationMatrix),solution;

    //分满秩和非满秩两种情况求解
    if(r==columns){
        let newAugmentationMatrix = createMatrix(r,r+1);
        for(let i=0;i<newAugmentationMatrix.length;i++){
            for(let j=0;j<newAugmentationMatrix[0].length;j++){
                newAugmentationMatrix[i][j] = augmentationMatrix[i][j];
            }
        }
        solution = recursion(getTrapezoidalMatrix(newAugmentationMatrix));
    }

    else{
        let newAugmentationMatrix = getTrapezoidalMatrix(augmentationMatrix);
        let freeVariablesCount = columns-r;
        let freeAugmentationMatrix = createMatrix(r,r+1);
        solution = new Array(freeVariablesCount+1);

        //将首项设为非零项
        let cornerMarkers = new Array(columns);
        for(let i=0;i<columns;i++){cornerMarkers[i]=i;}
        for(let i=0;i<r;i++){
            let k=1;
            while(newAugmentationMatrix[i][i]==0 && k<columns-i){
                swapColumn(newAugmentationMatrix,i+1,i+1+k);
                let c = cornerMarkers[i];
                cornerMarkers[i] = cornerMarkers[i+k];
                cornerMarkers[i+k] = c;
                k++;
            }            
        }

        //获取系数
        //非齐次项系数
        let b = new Array(rows);
        for(let i=0;i<rows;i++){
            b[i] = newAugmentationMatrix[i][columns];
        }

        //齐次方程系数矩阵
        for(let i=0;i<r;i++){
            for(let j=0;j<r+1;j++){
                freeAugmentationMatrix[i][j] = newAugmentationMatrix[i][j];
            }
        }

        //求解
        for(let m=0;m<freeVariablesCount+1;m++){
            let newCornerMarkers = JSON.parse(JSON.stringify(cornerMarkers));

            let freeSolution = new Array(freeVariablesCount).fill(0);
            //特解
            if(m==0)
                {
                    freeSolution[freeVariablesCount-1] = 1;
                    for(let k=0;k<r;k++){freeAugmentationMatrix[k][r] = b[k]-newAugmentationMatrix[k][columns-m-1];}
                }
            //通解
            else{
                    freeSolution[freeVariablesCount-m] = 1;
                    for(let k=0;k<r;k++){freeAugmentationMatrix[k][r] = -newAugmentationMatrix[k][columns-m];}
                }
                
            let totalSolution = [...recursion(freeAugmentationMatrix),...freeSolution];
            
            //将变量顺序还原
            for(let i=0;i<columns;i++){
                for(let j=i+1;j<columns;j++){
                    if(newCornerMarkers[i] > newCornerMarkers[j]){
                        let c = newCornerMarkers[i];
                        newCornerMarkers[i] = newCornerMarkers[j];
                        newCornerMarkers[j] = c;

                        c = totalSolution[i];
                        totalSolution[i] = totalSolution[j];
                        totalSolution[j] = c;
                    }
                }
            }
            solution[m] = totalSolution;
        }
        //判断是否为齐次方程
        let isHomogeneousEquations=true;
        for(let i=0;i<solution[0].length;i++){
            isHomogeneousEquations = isHomogeneousEquations && solution[0][i]==solution[1][i];
        }
        if(isHomogeneousEquations){solution[0]=new Array(columns).fill(0);}
    }
    return solution;
}

//求特征值及单位特征向量
function characteristicEquations(matrix){
    if(matrix.length != matrix[0].length){
        console.log('该矩阵不是方阵');
        return;
    }
    
    let count = matrix.length;
    let negtiveMatrix = MultiplicationOfNumbers(matrix,-1);
    let augmentationMatrix = createMatrix(count,count);
    let Eigenpolynomials = deepCopyMatrix(negtiveMatrix);
    for(let i=0;i<count;i++){
        for(let j=0;j<count;j++){
            augmentationMatrix[i][j] = Math.pow(i,j);
            Eigenpolynomials[j][j] = negtiveMatrix[j][j] + i;
        }
        augmentationMatrix[i][count] = determinant(Eigenpolynomials)-Math.pow(i,count);
    }
    
    let polynomial = solveSystemsOfLinearEquations(augmentationMatrix);
    let len = polynomial.length;
    for(let i=0;i<len/2;i++){
            let t = polynomial[i];
            polynomial[i] = polynomial[len-1-i];
            polynomial[len-1-i] = t;
        }
    return [1,...polynomial];
}

//复数解还未完成
function findEigenvaluesAndEigenvectors(matrix){
    if(matrix.length != matrix[0].length){
        console.log('该矩阵不是方阵');
        return;
    }

    let count = matrix.length;
    let eigenValues = new Array;
    let eigenVectors = new Array;
    let result = new Array;
    let polynomial = characteristicEquations(matrix);

    //求特征值
    if(isDiagonalMatrix(matrix)){
        for(let i=0;i<count;i++){
            eigenValues.push([matrix[i][i],0]);
        }
    }

    else{
        switch(polynomial.length){
            case 2:
                eigenValues = unaryLinearEquations(polynomial);
                break;
            case 3:
                eigenValues = unaryQuadraticEquations(polynomial);
                break;
            case 4:
                eigenValues = unaryCubicEquations(polynomial);
                break;
            default:
                eigenValues = unaryHigher_OrderEquations(polynomial);
                break;
        }
    }

    let isRealNumberSolution = true;
    for(let i=0;i<count;i++){
        isRealNumberSolution = isRealNumberSolution && eigenValues[i][1] == 0;
    }
    if(!isRealNumberSolution){console.log('特征值含有复数');return;}
    else{
        for(let i=0;i<count;i++){
            eigenValues[i] = eigenValues[i][0];
        }
    }

    //求单位特征向量
    let negtiveMatrix = MultiplicationOfNumbers(matrix,-1);
    let augmentationMatrix = createMatrix(count,count+1);

    //初始化增广矩阵
    for(let i=0;i<count;i++){
        for(let j=0;j<count;j++){
            augmentationMatrix[i][j] = negtiveMatrix[i][j];
        }
        augmentationMatrix[i][count] = 0;
    }

    //将特征值降序排序
    for(let i=0;i<eigenValues.length;i++){
        for(let j=0;j<eigenValues.length;j++){
            if(eigenValues[i] > eigenValues[j]){
                let c = eigenValues[i];
                eigenValues[i] = eigenValues[j];
                eigenValues[j] = c;
            }
        }
    }
                
    //消去重数
    let newEigenValue = new Array;
    newEigenValue.push(eigenValues[0]);
    for(let i=1;i<eigenValues.length;i++){
        if(eigenValues[i-1]!=eigenValues[i]){
            newEigenValue.push(eigenValues[i])
        }
    }

    //求解对应特征值下的单位特征向量
    for(let k=0;k<newEigenValue.length;k++){
        for(let i=0;i<count;i++){
            augmentationMatrix[i][i] = negtiveMatrix[i][i] + newEigenValue[k];
        }
        eigenVectors.push(solveSystemsOfLinearEquations(augmentationMatrix));
    }

    for(let i=0;i<eigenVectors.length;i++){
        result.push([newEigenValue[i],eigenVectors[i]]);
    }

    return result;
}
