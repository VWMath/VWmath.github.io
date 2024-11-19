let barButton = document.getElementById('topBarButton');

// 动画
barButton.addEventListener('mousemove',function(event){
    for(let i=0;i<barButton.children.length;i++)
        {
            if(event.target === barButton.children[i])
            {
                barButton.children[i].style.color = "white";
                barButton.children[i].style.backgroundColor = "black";
            }
            else
            {
                barButton.children[i].style.color = "black";
                barButton.children[i].style.backgroundColor = "transparent";
            }
        }
})

// 跳转首页
barButton.addEventListener('click',function(event){
    if(event.target === barButton.children[0])
        {
            window.open("/index.html","_self");
        }
})