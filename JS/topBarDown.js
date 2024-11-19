document.getElementById('topBarBox').addEventListener('mouseenter',function(event){
    let n = 0;
    let time = setInterval(function(){
        if(n==25){clearInterval(time)}
        document.getElementById('topBar').style.marginTop = n + 'rem';
        n++;
    },1);
})

document.getElementById('topBarBox').addEventListener('mouseleave',function(event){
    let n = 25;
    let time = setInterval(function(){
        if(n==0){clearInterval(time)}
        document.getElementById('topBar').style.marginTop = n + 'rem';
        n--;
    },1);
})