(function() {
  const elements = document.querySelectorAll(".rotate-animation");

  const { clientWidth, clientHeight } = document.body;
  const midpointX = clientWidth / 2;
  const midpointY = clientHeight / 2;

  document.addEventListener("mousemove", e => {
    const { clientX, clientY } = e;

    degX = ((clientX - midpointX) / midpointX) * 8;
    degY = ((clientY - midpointY) / midpointY) * 8;

    elements.forEach(item => {
      item.style.transform = `rotateY(${degX}deg) rotateX(${degY}deg)`;
    });
  });
})();
