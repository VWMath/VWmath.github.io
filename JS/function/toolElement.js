export{addSlideBar,addCheckbox,addBotton};


function addSlideBar(element,width,height,sliderWidth,sliderHeight,bottonBorderRadius,listen,operation){
    //创建物体
    let box = document.createElement('div');
    let rod = document.createElement('div');
    let slider = document.createElement('div');

    box.className = 'slideBarBox';
    rod.className = 'rod';
    slider.className = 'slider';

    box.style.width = width +'rem';
    box.style.height = height +'rem';
    slider.style.width = sliderWidth + 'rem';
    slider.style.height = sliderHeight + 'rem';
    slider.style.marginTop = -sliderHeight/2 + 'rem';
    slider.style.borderRadius = bottonBorderRadius + 'rem';

    rod.appendChild(slider);
    box.appendChild(rod);
    element.appendChild(box);
    
    //添加监听
    if(listen){
        let relativeDistance;
        let clicked = 0,len;
        slider.addEventListener('mousedown',function(){
            clicked = 1;
        })
    
        box.addEventListener('mousemove',function(event){
            if(clicked){
                let distance = event.clientX - rod.getBoundingClientRect().left;
               
                len = rod.offsetWidth;
                relativeDistance = distance/len;

                if(relativeDistance<0){slider.style.marginLeft = 0 + 'px';}
                else if(relativeDistance>1){slider.style.marginLeft = len;}
                else{slider.style.marginLeft = distance-2*sliderWidth/3 + 'px';}

                operation(relativeDistance);
            }
        })

        box.addEventListener('mouseleave',function(){
            clicked = 0;
        })

        slider.addEventListener('mouseup',function(){
            clicked = 0;
        })
    }
}

function addCheckbox(element,checked,text){
    let box = document.createElement('div');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    label.innerHTML = text;
    
    box.appendChild(checkbox);
    box.appendChild(label);

    element.appendChild(box);
}

function addBotton(element,width,height,borderRadius,color,font,fontColor,text,listen,operation){
    let botton = document.createElement('div');
    botton.className = "clickBotton";
    botton.style.width = width + 'rem';
    botton.style.height = height + 'rem';
    botton.style.borderRadius = borderRadius + 'rem';
    botton.style.backgroundColor = color;
    botton.style.font = font;
    botton.style.color = fontColor;
    botton.innerHTML = text;
    if(listen){
        botton.addEventListener('click',function(){
            operation();
        });
    }
    element.appendChild(botton);
}