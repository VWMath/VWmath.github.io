import{isElementViewPortIntersecting} from '../../../JS/functions/relationshipJugement.js';

let show = 0;
let topBar = document.getElementById('topBar');

document.addEventListener('mousemove',function(event){
    if(!show && !isElementViewPortIntersecting(topBar))
        {
            if(event.clientX > 755 * document.documentElement.clientWidth / 800)
                {
                    document.getElementsByClassName('sideBar')[1].style.animation = "showToolSideBar 0.5s forwards";
                    show = 1;
                }
        }
    else if(show)
        {
            if(event.clientX < 695 * document.documentElement.clientWidth / 800)
                {
                    document.getElementsByClassName('sideBar')[1].style.animation = "hideToolSideBar 0.5s forwards";
                    show = 0;
                }
        }
})