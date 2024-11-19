import {isElementIntersecting} from './functions/relationshipJugement.js'

let topBar = document.getElementById('topBar');
let homepage = document.getElementById('homePage');

document.addEventListener('scroll',function(){
    if(isElementIntersecting(homepage,topBar))
        {
            topBar.style.backgroundColor = 'rgba(204, 204, 204, 1)';
        }
    else
        {
            topBar.style.backgroundColor = 'rgba(99, 99, 99, 0.381)';
        }
})
