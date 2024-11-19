document.addEventListener('mousemove',function(event){
    let X = 800 * event.clientX / document.documentElement.clientWidth;
    let Y = 800 * event.clientY / document.documentElement.clientWidth;
    let padding_distance_X = ( 1400 - 2 * X ) / 3;
    let padding_distance_Y = 300 - Y;

    if(X >= 0 && X <= 100)
    {
        document.getElementById('backgroundImg').style.paddingLeft = 400 + 'rem';
    }
    else if(X >= 700)
    {
        document.getElementById('backgroundImg').style.paddingLeft = 0 + 'rem';
    }
    else if(X > 100 && X < 700)
    {
        document.getElementById('backgroundImg').style.paddingLeft = padding_distance_X + 'rem';
    }

    if(Y >=  300)
    {
        document.getElementById('backgroundImg').style.paddingTop =  0 + 'rem';
    }
    else if(Y >= 0 && Y <= 75)
    {
        document.getElementById('backgroundImg').style.paddingTop = 225 + 'rem';
    }
    else if(Y> 75 && Y < 300)
    {
        document.getElementById('backgroundImg').style.paddingTop = padding_distance_Y + 'rem';
    }
})
