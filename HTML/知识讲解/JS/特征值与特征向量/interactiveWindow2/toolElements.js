import { addSlideBar,addBotton } from "../../../../../JS/functions/toolElement.js";
import { draw, stretch, showWord, translate } from "./schematicAnimation.js";
import { getA, getAlpha1Value, getAlpha2Value, getLambda1, getLambda2, getAlpha1, getAlpha2, getBeta,getBetaValue,getBetaValue_,getBetaSlashValue,upload } from "./Matrix.js";


let controlBox = document.getElementsByClassName('toolElements');
let beta = getBeta();

let betaValue = getBetaValue();
let betaValue_ = getBetaValue_();
let betaSlashValue = getBetaSlashValue();
let alpha1Value = getAlpha1Value();
let alpha2Value = getAlpha2Value();

let deltaWidth = 7;


addSlideBar(controlBox[1],130,20,8,15,2.5,1,interactive1);
addSlideBar(controlBox[1],130,20,8,15,2.5,1,interactive2);

addBotton(document.getElementsByClassName('controlWindow')[1],55,20,3,"white","11rem Sonti",'rgb(80,80,80)',"播放动画",1,vectorAnimation);

function vectorAnimation(){
    let t=0.2;
    let a = getA();
    let max1 = getLambda1()*a[0];
    let max2 = getLambda2()*a[1];

    let time1 = setInterval(function(){
        if(t>4.5){clearInterval(time1);}
        draw();

        //显示向量
        if(t<0.5){
            stretch(a[0],getAlpha1(),"a1α1");
            stretch(a[1],getAlpha2(),"a2α2");
        }
        //显示λ1
        else if(t<0.75){
            let opacity = 4.5*(t-0.5);
            stretch(a[0],getAlpha1(),"a1α1");
            stretch(a[1],getAlpha2(),"a2α2");
            showWord("Aα1 = λ1α1",`rgba(255,255,255,${opacity})`)
        }
        else if(t<1){
            let opacity = 4*(1-t);
            stretch(a[0],getAlpha1(),"a1α1");
            stretch(a[1],getAlpha2(),"a2α2");
            showWord("Aα1 = λ1α1",`rgba(255,255,255,${opacity})`)
        }
        //拉伸α1
        else if(t<2){
            let k1 = a[0] + (t-1)*(max1-a[0]);
            stretch(k1,getAlpha1(),"a1α1");
            stretch(a[1],getAlpha2(),"a2α2");
        }
        //显示λ2
        else if(t<2.25){
            let opacity = 4.5*(t-2);
            stretch(max1,getAlpha1(),"a1α1");
            stretch(a[1],getAlpha2(),"a2α2");
            showWord("Aα2 = λ2α2",`rgba(255,255,255,${opacity})`)
        }
        else if(t<2.5){
            let opacity = 4*(2.5-t);
            stretch(max1,getAlpha1(),"a1α1");
            stretch(a[1],getAlpha2(),"a2α2");
            showWord("Aα2 = λ2α2",`rgba(255,255,255,${opacity})`)
        }
        //拉伸α2
        else if(t<3.5){
            let k2 = a[1] + (t-2.5)*(max2-a[1]);
            stretch(max1,getAlpha1(),"a1α1");
            stretch(k2,getAlpha2(),"a2α2");
        }
        //平移
        else{
            let startPosition = [(t-3.5)*max1*getAlpha1()[0][0],(t-3.5)*max1*getAlpha1()[1][0]]
            stretch(max1,getAlpha1(),"a1α1");
            translate(max2,getAlpha2(),startPosition,"a2α2");
        }
        t+=0.005;
    },10)

}

function interactive1(relativeDistance){
    setValue(beta,1,1,5,-5,relativeDistance);
    upload();
    draw();
    for(let i=0;i<2;i++){
        betaValue[i].style.width = betaValue[i].value.length * deltaWidth + 'rem';
        betaSlashValue[i].style.width = betaSlashValue[i].value.length * deltaWidth + 'rem';
        betaValue_[i].style.width = betaValue_[i].value.length * deltaWidth + 'rem';
        alpha1Value[i].style.width = alpha1Value[i].value.length * deltaWidth + 'rem';
        alpha2Value[i].style.width = alpha2Value[i].value.length * deltaWidth + 'rem';
    }
}

function interactive2(relativeDistance){
    setValue(beta,2,1,5,-5,relativeDistance);
    upload();
    draw();
    for(let i=0;i<2;i++){
        betaValue[i].style.width = betaValue[i].value.length * deltaWidth + 'rem';
        betaSlashValue[i].style.width = betaSlashValue[i].value.length * deltaWidth + 'rem';
        betaValue_[i].style.width = betaValue_[i].value.length * deltaWidth + 'rem';
        alpha1Value[i].style.width = alpha1Value[i].value.length * deltaWidth + 'rem';
        alpha2Value[i].style.width = alpha2Value[i].value.length * deltaWidth + 'rem';
    }
}

function setValue(beta,row,column,maxValue,minValue,relativeDistance){
    let a = minValue + relativeDistance*(maxValue-minValue);
    beta[row-1][column-1] = a;
}