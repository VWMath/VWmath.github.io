let pageList = document.getElementById('pagesContainer');
let pageNameArray = ["知识讲解", "数学简史", "经典问题", "数学工具", "公式大全", "放松一下"];

// 跳转
pageList.addEventListener('click',function(event){
    for(let i=0;i<pageList.children.length;i++)
        {
            if(event.target === pageList.children[i])
                {
                    window.open(`./HTML/${pageNameArray[i]}/${pageNameArray[i]}.html`,`${pageNameArray[i]}`);
                }
        }
})