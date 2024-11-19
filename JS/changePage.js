import { isElementViewPortIntersecting,isElementIntersecting} from "./functions/relationshipJugement.js";

let title = null;
let homePage = document.getElementById('homePage');
let topBar = document.getElementById('topBar');
let over = 1;

document.addEventListener('wheel',function(event){
    title = document.getElementById('title');
    if(event.deltaY > 0 && isElementViewPortIntersecting(title))
        {
            if(over)
                {
                    over = 0
                    let n = event.clientY,m=100,p=100;
                        let time1 = setInterval(function() {
                            if(isElementIntersecting(homePage,topBar)){clearInterval(time1);}
                            window.scrollTo(0,n);
                            n+=10;
                        }, 2);

                    let time2 = setInterval(function(){
                        if(p==0){over = 1; clearInterval(time2);}
                        document.getElementById('pagesContainer').style.marginTop = m + 'rem';
                        let pages = document.getElementById('pagesContainer').getElementsByTagName('div');
                        for (let i = 0; i < pages.length; i++) {
                            pages[i].style.opacity = 1 - p/100;
                        }
                        m-=m>20?1:0;
                        p-=1;
                    },8)
                }
        }
});