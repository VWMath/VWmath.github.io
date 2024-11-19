let buttonsFather = document.getElementById('toolRectangle');
let buttonsBackgrounds = document.getElementsByClassName('toolBoxBackground');
let titles = buttonsFather.getElementsByTagName('h1');

let enterArray = new Array(buttonsFather.children.length).fill(1);
let leaveArray = new Array(buttonsFather.children.length).fill(0);
let linkArray = ["https://www.geogebra.org/",
                "https://www.wolframalpha.com/",
                "https://ww2.mathworks.cn/",
                "https://www.latexlive.com/"];

// 动画
buttonsFather.addEventListener('mousemove',function(event){
    for(let i=0;i<buttonsFather.children.length;i++)
        {
            if(event.target === buttonsFather.children[i] && enterArray[i])
            {

                buttonsFather.children[i].style.animation = "toTransparent 0.5s forwards";
                buttonsBackgrounds[i].style.animation = "enterButton 0.5s forwards";
                titles[i].style.color = 'rgb(230, 230, 255)';
                enterArray[i] = 0;
                leaveArray[i] = 1;
            }
            else if(event.target !== buttonsFather.children[i] && leaveArray[i])
            {
                buttonsFather.children[i].style.animation = "toOpaque 1s forwards";
                buttonsBackgrounds[i].style.animation = "leaveButton 1s forwards";
                titles[i].style.color = 'black';
                enterArray[i] = 1;
                leaveArray[i] = 0;
            }
        }
})

// 跳转
buttonsFather.addEventListener('click',function(event){
    for(let i=0;i<buttonsFather.children.length;i++)
        {
            if(event.target === buttonsFather.children[i])
                {
                    window.open(`${linkArray[i]}`);
                }
        }
})