export{chromaticallySwatchesBAR,chromaticallySwatchesDIV,displayRGBvalue,getStripRGB};



function getStripRGB(location){
    let r,g,b;
    if(location < 1/6){
        r=255, b=0;
        g = location<0? 0 : 6*255*location;
    }
    else if(location < 1/3){
        g=255, b=0;
        r = 6*255*(1/3 - location);
    }
    else if(location < 1/2){
        r=0, g=255;
        b = 6*255*(location - 1/3);
    }
    else if(location < 2/3){
        r=0, b=255;
        g = 6*255*(2/3 - location);
    }
    else if(location < 5/6){
        g=0, b=255;
        r = 6*255*(location - 2/3);
    }
    else{
        r=255, g=0;
        b = location<1 ? 6*255*(1 - location) : 0;
    }
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);

    return [r,g,b];
}

function chromaticallySwatchesDIV(ctx,width,height,location){
    let [r,g,b] = getStripRGB(location);
    let dr = (255-r)/255, dg= (255-g)/255, db = (255-b)/255;
    let e = width/255;
    for(let i=0;i<256;i++)
        {
            let gradient = ctx.createLinearGradient(0, height, 0, 0);
            gradient.addColorStop(1, `rgb(${255 - dr*i},${255 - dg*i},${255 - db*i})`);
            gradient.addColorStop(0, 'rgb(0,0,0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(i*e, 0, i*e, height);
        }
}

function chromaticallySwatchesBAR(ctx,width,height){
    let gradient = ctx.createLinearGradient(0, 0, width, 0);
    
    gradient.addColorStop(0, 'rgb(255,0,0)');
    gradient.addColorStop(1/6, 'rgb(255,255,0)');
    gradient.addColorStop(1/3, 'rgb(0,255,0)');
    gradient.addColorStop(1/2, 'rgb(0,255,255)');
    gradient.addColorStop(2/3, 'rgb(0,0,255)');
    gradient.addColorStop(5/6, 'rgb(255,0,255)');
    gradient.addColorStop(1, 'rgb(255,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function displayRGBvalue(){
    let rgbValueBox = document.createElement('div');
        rgbValueBox.className = "rgbValueBox";

        let r = document.createElement('p');
        let g = document.createElement('p');
        let b = document.createElement('p');

        let rBox = document.createElement('div');
        let gBox = document.createElement('div');
        let bBox = document.createElement('div');

        rBox.innerHTML = 'r:';
        gBox.innerHTML = 'g:';
        bBox.innerHTML = 'b:';

        rBox.appendChild(r);
        gBox.appendChild(g);
        bBox.appendChild(b);

        rgbValueBox.appendChild(rBox);
        rgbValueBox.appendChild(gBox);
        rgbValueBox.appendChild(bBox);
    
    return rgbValueBox;
}
