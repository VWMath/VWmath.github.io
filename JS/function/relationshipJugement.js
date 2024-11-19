export {isElementInViewPort,isElementIntersecting,isElementViewPortIntersecting};

function isElementInViewPort(element){
    const rect = element.getBoundingClientRect();
    return(
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (document.documentElement.clientHeight && document.documentElement.clientHeight) &&
        rect.right <= (document.documentElement.clientWidth && document.documentElement.clientWidth)
    );
}

function isElementViewPortIntersecting(element){
  const rect = element.getBoundingClientRect();
  return(
      rect.top < document.documentElement.clientHeight && rect.bottom > 0 &&
      rect.right > 0 && rect.left < document.documentElement.clientWidth
  );
}

function isElementIntersecting(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return (
      rect1.top < rect2.bottom && rect1.bottom > rect2.top &&
      rect1.right > rect2.left && rect1.left < rect2.right
    );
  }