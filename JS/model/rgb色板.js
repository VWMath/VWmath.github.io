import { chromaticallySwatchesBAR,chromaticallySwatchesDIV,displayRGBvalue,getStripRGB} from "../functions/swatches.js";

let rgbButton = document.getElementsByClassName('rgbButton');
let rgbBox = null;
let deleted = 1,initialized=1,operatied = 0;
let location,positionX,positionY,oldL,oldLeft,oldTop;
let rgb = new Array(3);
let BarmouseDown = 0,DIVmouseDown=0;
let rem = document.documentElement.clientWidth/800;


rgbButton[0].style.backgroundColor = "rgb(0,180,255)";
//监听色块，判断是否弹出rgb调色窗
rgbButton[0].addEventListener('mouseenter',function(){
    if(deleted)
    {

        //创建色板
        createRGBbox();
        
        let div = rgbBox.getElementsByClassName('swatchesDIV')[0];
        let bar = rgbBox.getElementsByClassName('swatchesBAR')[0];

        //初始化色板
        const DIVctx = div.getContext('2d');
        const BARctx = bar.getContext('2d');

        let rgbButton = rgbBox.parentNode.getElementsByClassName('rgbButton')[0];
        let len = bar.getBoundingClientRect().right-bar.getBoundingClientRect().left;

        //初始化圈和杆
        if(initialized || !operatied)
            {
                //初始化为蓝色的位置
                rgbBox.getElementsByClassName('swatchesBAR')[0].nextElementSibling.style.left = (2/3 - 180/255/6) * len + bar.getBoundingClientRect().left - rgbBox.parentNode.getBoundingClientRect().left + 'px';
                rgbBox.getElementsByClassName('swatchesDIV')[0].nextElementSibling.style.left = len + div.getBoundingClientRect().left - rgbBox.parentNode.getBoundingClientRect().left + 'px';
                rgbBox.getElementsByClassName('swatchesDIV')[0].nextElementSibling.style.top = div.getBoundingClientRect().top - rgbBox.parentNode.getBoundingClientRect().top + 'px';
                initialized = 0;
            }
            else
            {
                //初始化为上次的位置
                bar.nextElementSibling.style.left = oldL + 'px';
                div.nextElementSibling.style.left = oldLeft + 'px';
                div.nextElementSibling.style.top = oldTop + 'px';
            }
        
        //初始化rgb
        location = (bar.nextElementSibling.getBoundingClientRect().left-bar.getBoundingClientRect().left)/len;
        positionX = (div.nextElementSibling.getBoundingClientRect().left-div.getBoundingClientRect().left + 2.5 * rem)/len;
        positionY = (div.nextElementSibling.getBoundingClientRect().top-div.getBoundingClientRect().top  + 2.5 * rem)/len;
        rgb = calculateRGB(location,positionX,positionY);
        setRGBvalue();

        //初始化颜色
        chromaticallySwatchesDIV(DIVctx,div.width,div.height,location);
        chromaticallySwatchesBAR(BARctx,bar.width,bar.height);


        //监听横色板
        let startPosition = rgbBox.parentNode.getBoundingClientRect().left;
        let startPositionX = rgbBox.parentNode.getBoundingClientRect().left;
        let startPositionY = rgbBox.parentNode.getBoundingClientRect().top;
        
        rgbBox.addEventListener('mousedown',function(event){
            if(event.target === bar)
                {
                    BarmouseDown = 1;
        
                    bar.nextElementSibling.style.left = event.clientX - startPosition + 'px';
                    location = (bar.nextElementSibling.getBoundingClientRect().left-bar.getBoundingClientRect().left)/len;
        
                    chromaticallySwatchesDIV(DIVctx,bar.width,bar.height,location);
                }
            else if(event.target === div)
                {
                    DIVmouseDown = 1;
        
                    div.nextElementSibling.style.left = event.clientX - startPositionX + 'px';
                    div.nextElementSibling.style.top = event.clientY - startPositionY + 'px';

                    positionX = (div.nextElementSibling.getBoundingClientRect().left-div.getBoundingClientRect().left)/len;
                    positionY = (div.nextElementSibling.getBoundingClientRect().top-div.getBoundingClientRect().top)/len;
                }

            operatied = 1;
            rgb = calculateRGB(location,positionX,positionY);
            rgbButton.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        })

        rgbBox.addEventListener('mousemove',function(event){
            if(BarmouseDown)
                {
                    
                    if(event.clientX < bar.getBoundingClientRect().left){bar.nextElementSibling.style.left = bar.getBoundingClientRect().left - startPosition + 'px';}
                    else if(event.clientX > bar.getBoundingClientRect().right){bar.nextElementSibling.style.left = bar.getBoundingClientRect().left - startPosition + len + 'px';}
                    else{bar.nextElementSibling.style.left = event.clientX - startPosition + 'px';}

                    location = (bar.nextElementSibling.getBoundingClientRect().left-bar.getBoundingClientRect().left)/len;

                    chromaticallySwatchesDIV(DIVctx,bar.width,bar.height,location);
                    rgb = calculateRGB(location,positionX,positionY);

                    rgbButton.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

                }

            else if(DIVmouseDown)
                {
                    if(event.clientX < div.getBoundingClientRect().left){div.nextElementSibling.style.left = div.getBoundingClientRect().left - startPositionX + 'px'}
                    else if(event.clientX > div.getBoundingClientRect().right){div.nextElementSibling.style.left = div.getBoundingClientRect().left - startPositionX + len + 'px'}
                    else{div.nextElementSibling.style.left = event.clientX - startPositionX + 'px';}
                    
                    if(event.clientY < div.getBoundingClientRect().top){div.nextElementSibling.style.top = div.getBoundingClientRect().top - startPositionY + 'px'}
                    else if(event.clientY > div.getBoundingClientRect().bottom){div.nextElementSibling.style.top = div.getBoundingClientRect().top - startPositionY + len + 'px'}
                    else{div.nextElementSibling.style.top = event.clientY - startPositionY + 'px';}

                    positionX = (div.nextElementSibling.getBoundingClientRect().left-div.getBoundingClientRect().left +  + 2.5 * rem)/len;
                    positionY = (div.nextElementSibling.getBoundingClientRect().top-div.getBoundingClientRect().top +  + 2.5 * rem)/len;

                    rgb = calculateRGB(location,positionX,positionY);
                    rgbButton.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                }
            setRGBvalue();
        })

        rgbBox.addEventListener('mouseup',function(){
            BarmouseDown = 0;
            DIVmouseDown = 0;
            oldL = bar.nextElementSibling.getBoundingClientRect().left - rgbBox.parentNode.getBoundingClientRect().left;
            oldLeft = div.nextElementSibling.getBoundingClientRect().left - rgbBox.parentNode.getBoundingClientRect().left + 2.5 * rem;
            oldTop = div.nextElementSibling.getBoundingClientRect().top - rgbBox.parentNode.getBoundingClientRect().top + 2.5 * rem;
        })
        
        setRGBvalue();
        document.getElementsByClassName('rgbArea')[0].style.pointerEvents = "all";
        deleted = 0;
    }
})

document.getElementsByClassName('rgbArea')[0].addEventListener('mouseleave',function(){
    if(!deleted){
        document.getElementsByClassName('rgbArea')[0].removeChild(rgbBox);
        document.getElementsByClassName('rgbArea')[0].style.pointerEvents = "none";
        deleted = 1;
    }
})



function createRGBbox(){
    rgbBox = document.createElement('div');
    rgbBox.className = "rgbBox";

    //初始化画布
    let swatchesDIV = document.createElement('canvas');
    let swatchesBAR = document.createElement('canvas');
            
    swatchesDIV.className = "swatchesDIV";
    swatchesBAR.className = "swatchesBAR";

    let DIV = document.createElement('div');
    let BAR = document.createElement('div');

    DIV.appendChild(swatchesDIV);
    BAR.appendChild(swatchesBAR);

    DIV.className = 'rgbCanvasBox';
    BAR.className = 'rgbCanvasBox';

    //添加调色环，条
    let targetCircle = document.createElement('div');
    let strip = document.createElement('div');

    targetCircle.className = 'targetCircle';
    strip.className = 'strip';

    DIV.appendChild(targetCircle);
    BAR.appendChild(strip);

    //添加rgb栏
    let rgbValueBox = displayRGBvalue();

    rgbBox.appendChild(DIV);
    rgbBox.appendChild(BAR);
    rgbBox.appendChild(rgbValueBox);
    
    document.getElementsByClassName('rgbArea')[0].appendChild(rgbBox);
}

function calculateRGB(location,positionX,positionY){
    let [r,g,b] = getStripRGB(location);
    let x;
    if(positionX < 0){x = 0}
    else if(positionX > 1){x = 1}
    else{x = positionX}

    r = 255 - (255-r)*x;
    g = 255 - (255-g)*x;
    b = 255 - (255-b)*x;

    r = r*(1-positionY);
    g = g*(1-positionY);
    b = b*(1-positionY);

    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);

    return [r,g,b]
}

function setRGBvalue(){
    rgbBox.getElementsByTagName('p')[0].innerHTML = rgb[0];
    rgbBox.getElementsByTagName('p')[1].innerHTML = rgb[1];
    rgbBox.getElementsByTagName('p')[2].innerHTML = rgb[2];
}