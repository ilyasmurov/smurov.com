(function() {
  let queue = [];
  let content = "";

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  const delay = time => {
    return new Promise(function(resolve) {
      setTimeout(() => resolve(), time);
    });
  };

  const showChar = (domElement, char, time) => {
    const show = resolve => {
      // create char container
      let element = document.createElement("span");
      element.className = "animate";
      element.innerHTML = char;
      domElement.appendChild(element);

      if (typeof resolve === "function") {
        resolve(domElement);
      }
    };

    return new Promise(function(resolve) {
      setTimeout(() => {
        show(resolve);
      }, time);
    });
  };

  const showWord = (domElement, word, tag, settings) => {
    let arr = [];

    // create word container
    let element = document.createElement("span");
    let c = domElement.appendChild(element);

    for (let i = 0, max = word.length; i < max; i++) {
      let char = word[i];

      if (tag) {
        char = `${tag[0]}${char}${tag[1]}`;
      }

      // animation queue
      arr.push(() =>
        showChar(c, char, getRandom(settings.time.min, settings.time.max))
      );
    }

    return arr
      .reduce((p, f) => p.then(f), Promise.resolve())
      .then(domElement => {
        // when the word is typed
        let _word = word;

        if (tag) {
          _word = `${tag[0]}${word}${tag[1]}`;
        }

        c.innerHTML = _word;
      });
  };

  const animateText = (domElement, text, settings) => {
    const _settings = {
      ...settings,
      time: {
        min: (settings && settings.time && settings.time.min) || 0,
        max: (settings && settings.time && settings.time.max) || 100
      },
      delay: (settings && settings.delay) || 0,
      showBeforeAnimation: (settings && settings.showBeforeAnimation) || null
    };

    let arr = [];

    // animation delay
    if (_settings.delay) {
      arr.push(() => delay(_settings.delay));
    }

    const words = text
      .replace(/\s+/g, " ")
      .match(
        /(<span[^>]*>[^<]*<\/span> ?)|(<a[^>]*>[^<]*<\/a> ?)|(<font[^>]*>[^<]*<\/font>[ |,|.|:]? ?)|(<b[^>]*>[^<]*<\/b>? )|([^ ?=\W{1}]?[(|<|\]|:|\/|(|\)]?[^\s]+?[-|'|/|]?[\w|.]*[\W]?)[,|.|:]? ?|([^\s] )/gi
      );

    for (let i = 0, max = words.length; i < max; i++) {
      let word = words[i];

      // tag
      let tag = null;
      const found = word.match(/(<.*>)(.*)(<\/.*>)([ |,|.|:]? ?)/);
      if (found) {
        tag = [found[1], found[3]];
        word = found[2] + found[4];
      }

      // show domElement if hidden before
      if (_settings.showBeforeAnimation) {
        document.querySelector(_settings.showBeforeAnimation).style.visibility =
          "visible";
      }

      // animation queue
      arr.push(() => showWord(domElement, word, tag, _settings));
    }

    return (
      arr

        // sequential animation execution
        .reduce((p, f) => p.then(f), Promise.resolve())

        // callback after all animations done
        .then(() => {
          domElement.innerHTML = text;
        })
    );
  };

  // all animate elements
  const animatedElements = document.querySelectorAll("[data-animate=true]");

  let arr = [];
  Object.keys(animatedElements).map(item => {
    const element = animatedElements[item];
    const text = element.innerHTML;
    const settings = {
      time: {
        min: element.getAttribute("data-animate-min-time"),
        max: element.getAttribute("data-animate-max-time")
      },
      delay: element.getAttribute("data-animate-delay"),
      showBeforeAnimation: element.getAttribute(
        "data-animate-showBeforeAnimation"
      )
    };

    // clear element content
    element.innerHTML = "";

    content += text;

    // show element before animation
    if (settings.showBeforeAnimation) {
      document.querySelector(settings.showBeforeAnimation).style.visibility =
        "hidden";
    }

    queue.push(() => {
      element.innerHTML = text;
      // show element before animation
      if (settings.showBeforeAnimation) {
        document.querySelector(settings.showBeforeAnimation).style.visibility =
          "visible";
      }
    });

    // animation queue
    arr.push(() => animateText(element, text, settings));
  });

  // sequential animation execution
  arr
    .reduce((p, f) => p.then(f), Promise.resolve())
    .then(() => {
      document.querySelector(".button-skip").remove();
    });

  const skipAnimation = () => {
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
    }

    // NEED FIX
    for (let i = 0; i < content.length; i++) {
      clearInterval(i);
    }
  };

  // button skip animation
  document.querySelector(".button-skip").onclick = function() {
    skipAnimation();
    this.remove();
  };

  // show content after js loaded
  document.querySelector("#loader").classList.add("done");
})();
