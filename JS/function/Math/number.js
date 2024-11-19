export {fracToMath,complexNumberToMath,isPrimeNumber,allPrimeNumbersLessThenSelf,getAllApproximate,greatestCommonDivisor,leastCommonMultiple,approximation};

//类型转换
function fracToMath(frac){
    return `<mfrac><mi>${frac[0]}</mi><mi>${frac[0]}</mi></mfrac>`
}

function complexNumberToMath(complaexNumber){
    return `<mi>${complaexNumber[0]}</mi><mo>+</mo><mi>${complaexNumber[1]}</mi><mi>i</mi>`
}

//运算
function isPrimeNumber(integer){
    if(integer<=0){console.log("输入的不是正整数"); return;}
    for(let i=2;i<integer;i++){
        if(integer%i==0){return false;}
    }
    return true;
}

function allPrimeNumbersLessThenSelf(integer){
    let primeNumberArray = new Array;
    for(let i=2;i<integer;i++){
        if(isPrimeNumber(i)){
            primeNumberArray.push(i);
        }
    }
    return primeNumberArray;
}

function getAllApproximate(integer){
    let approximateArray = new Array;
    for(let i=1;i<integer+1;i++){
        if(integer%i==0){
            approximateArray.push(i);
        }
    }
    return approximateArray;
}

function greatestCommonDivisor(integer1,integer2){
    let primeNumberArray1 = getAllApproximate(integer1);
    let primeNumberArray2 = getAllApproximate(integer2);
    let greatestCommonDivisor=1;
    for(let i=0;i<primeNumberArray1.length;i++){
        for(let j=0;j<primeNumberArray2.length;j++){
            if(primeNumberArray1[i] == primeNumberArray2[j]){
                greatestCommonDivisor = primeNumberArray1[i];
            }
        }
    }
    return greatestCommonDivisor;
}

function leastCommonMultiple(integer1,integer2){
    return integer1*integer2/greatestCommonDivisor(integer1,integer2);
}

function approximation(fraction){
    let approximate = greatestCommonDivisor(fraction[0],fraction[1]);
    fraction[0]/=approximate;
    fraction[1]/=approximate;
    return fraction;
}