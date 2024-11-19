export{rootToStr,solutionToStr,eigenvaluesAndEigenvectorsToStr,onlyEigenVectorToStr};

//一元n次方程的解
function rootToStr(root){
    let result = new Array(root.length);
    for(let i=0;i<root.length;i++){
        result[i] = `${root[i][0]}+${root[i][1]}i`;
    }
    return result;
}

//线性方程组的解
function solutionToStr(solution){
    let variableCount = Array.isArray(solution[0])?solution[0].length:solution.length;
    let vectorCount = solution.length;

    let result = new Array(vectorCount);
    let x = new Array(variableCount);

    for(let i=0;i<variableCount;i++){
        x[i] = `x${i+1}`;
    }
    for(let i=0;i<vectorCount;i++){
        result[i] = `${solution[i]}`;
    }

    //唯一解
    if(!Array.isArray(solution[0])){
        return `[${result}]`;
    }
    
    //无穷解
    let isHomogeneousEquations=true;
    for(let i=0;i<solution[0].length;i++){
        isHomogeneousEquations = isHomogeneousEquations&&solution[0][i]==0;
    }

    //齐次方程
    if(isHomogeneousEquations){
        let newResult = '';
        for(let i=1;i<vectorCount;i++){
            newResult += i==vectorCount-1 ? `k${i}[${result[i]}]` : `k${i}[${result[i]}]+`;
        }
        return `${newResult}`;
    }
    //非齐次方程
    else{
        let newResult = '';
        for(let i=1;i<vectorCount;i++){
            newResult += i==vectorCount-1 ? `k${i}[${result[i]}]` : `k${i}[${result[i]}]+`;
        }
        return `[${result[0]}]+${newResult}`;
    }
}

//特征值与单位特征向量
function eigenvaluesAndEigenvectorsToStr(solution){
    if(solution==null){return null;}
    let len = solution.length;
    let result = new Array(len);

    for(let i=0;i<len;i++){
        result[i] = `λ${i+1}=${solution[i][0]},α${i+1}=${solutionToStr(solution[i][1])}`;
    }
    return result;
}

function onlyEigenVectorToStr(solution){
    if(solution==null){return null;}
    let len = solution.length;
    let result = new Array(len);

    for(let i=0;i<len;i++){
        result[i] = `α${i+1}=${solutionToStr(solution[i][1])}`;
    }
    return result;
}