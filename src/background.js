(function() {
  "use strict";

  const { clientWidth, clientHeight } = document.body;
  const background = document.querySelector("#background");

  background.innerHTML = "<div></div>";

  let i = 0;
  let bg = [];

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  while (i < 200) {
    const width = getRandom(0, 50);
    const height = width;
    const top = getRandom(-200, clientHeight + 200 + width);
    const left = getRandom(-200, clientWidth + 200 + width);
    const blur = getRandom(0, 10);
    const opacity = +Math.random().toFixed(1);
    bg.push(
      `<div data-left='${left}' data-top='${top}' class='mouse-animation' style='width:${width}px;height:${height}px;left:${left}px;top:${top}px;filter:blur(${blur}px);opacity:${opacity};'></div>`
    );
    i++;
  }

  background.innerHTML = bg.join("");

  // const elements = document.querySelectorAll("#background > div");
  // let framesPerSecond = 10;

  // function animate() {
  //   setTimeout(() => {
  //     elements.forEach(item => {
  //       const _left = +item.getAttribute("data-left");
  //       const _top = +item.getAttribute("data-top");
  //       const left = getRandom(_left - 10, _left + 10);
  //       const top = getRandom(_top - 10, _top + 10);
  //       const width = getRandom(item.clientWidth - 2, item.clientWidth + 2);
  //       const blur = getRandom(0, 10);
  //       // item.style.left = `${left}px`;
  //       // item.style.top = `${top}px`;
  //       item.style.filter = `blur(${blur}px)`;
  //       // item.style.width = `${width}px`;
  //       // item.style.height = `${width}px`;
  //     });

  //     requestAnimationFrame(animate);
  //   }, 1000 / framesPerSecond);
  // }

  // animate();
})();
