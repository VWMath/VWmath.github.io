const deltaTime = 15;

let title = document.getElementById('titleFont');
let box = document.getElementsByClassName('toolBox');

let n = 0;
let titleTime = setInterval(function(){
    if(n == 50){clearInterval(titleTime)}
    title.style.marginTop = 100 - n + 'rem';
    title.style.opacity = Math.pow(n/50,2);
    n++;
},14)

for(let i=0;i<box.length;i++)
    {
        setTimeout(function(){
        let m=0;
        let boxTime = setInterval(function(){
            if(m == 50){clearInterval(boxTime)};
            box[i].style.marginTop = 70 - m + 'rem';
            box[i].style.opacity = Math.pow(m/50,2);
            m++;
        },deltaTime)
    },deltaTime * 15 * i);
    }