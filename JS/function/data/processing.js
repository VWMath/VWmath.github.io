export{strTonum};

function strTonum(str){
    let numText1 = str.match(/\d+[.]/g);
    let numText2 = str.match(/\d+/g);

    let number = numText1 != null ? numText1[0] : '';

    if(numText2 == null){
        return 0;
    }

    let startNum = numText1 != null ? 1 : 0 ;
    for(let i=startNum;i<numText2.length;i++){
        number += numText2[i];
    }

    return parseFloat(number);
}