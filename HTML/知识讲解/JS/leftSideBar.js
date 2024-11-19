import{isElementViewPortIntersecting} from '../../../JS/functions/relationshipJugement.js';

let show = 0;
let topBar = document.getElementById('topBar');

document.addEventListener('mousemove',function(event){
    if(!show && !isElementViewPortIntersecting(topBar))
        {
            if(event.clientX < 45 * document.documentElement.clientWidth / 800)
                {
                    document.getElementsByClassName('sideBar')[0].style.animation = "showLetfSideBar 0.5s forwards";
                    show = 1;
                }
        }
    else if(show)
        {
            if(event.clientX > 105 * document.documentElement.clientWidth / 800)
                {
                    document.getElementsByClassName('sideBar')[0].style.animation = "hideLeftSideBar 0.5s forwards";
                    show = 0;
                }
        }
})