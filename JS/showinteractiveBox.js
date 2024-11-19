import { isElementViewPortIntersecting } from "./functions/relationshipJugement.js";

let canvas = document.getElementsByTagName('canvas');
let controlWindow = document.getElementsByClassName('controlWindow')[0];
let showed = 0;
let lastScrollTop = 0;

window.onscroll = function(){
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(!showed && scrollTop > lastScrollTop && isElementViewPortIntersecting(controlWindow))
        {
            canvas[0].style.animation = "showInteactiveWindow 0.5s forwards";
            controlWindow.style.animation = "showControlWindow 1s forwards";
            showed = 1;
        }
    else if(showed && !isElementViewPortIntersecting(controlWindow))
    {
        canvas[0].style.animation = "hide 0.001s forwards";
        controlWindow.style.animation = "hide 0.001s forwards";
        showed = 0;
    }
    lastScrollTop = scrollTop;
}