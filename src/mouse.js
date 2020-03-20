(function() {
  "use strict";
  const elements = document.querySelectorAll(".mouse-animation");

  const { clientWidth, clientHeight } = document.body;
  const midpointX = clientWidth / 2;
  const midpointY = clientHeight / 2;

  let arr = [];
  elements.forEach(() => {
    arr.push(10 + Math.floor(20 - 10) * Math.random());
  });

  document.addEventListener("mousemove", e => {
    const { clientX, clientY } = e;

    const degY = (clientX - midpointX) / midpointX;
    const degX = (clientY - midpointY) / midpointY;

    elements.forEach((item, index) => {
      item.style.transform = `translateY(${degX *
        arr[index]}px) translateX(${degY * arr[index]}px)`;
    });
  });
})();
