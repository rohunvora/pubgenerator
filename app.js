setTimeout(function loadIt () {
  let imageArray = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png", "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", "29.png", "30.png", "31.png", "32.png", "33.png", "34.png", "35.png", "36.png", "37.png", "38.png", "39.png", "40.png", "41.png", "42.png", "43.png", "44.png", "45.png", "46.png", "47.png", "48.png", "49.png", "50.png", "51.png", "52.png", "53.png", "54.png", "55.png", "56.png", "57.png", "58.png", "59.png", "60.png", "61.png", "62.png", "63.png", "63.png", "64.png", "65.png", "66.png", "67.png", "68.png", "69.png", "70.png", "71.png", "72.png", "73.png", "74.png", "75.png", "76.png", "77.png", "78.png", "79.png", "80.png", "81.png", "82.png", "83.png", "84.png", "85.png", "86.png", "87.png", "88.png", "89.png", "90.png", "91.png", "92.png", "93.png", "94.png", "95.png", "96.png", "97.png", "98.png", "99.png", "100.png"]
let randMax = imageArray.length
let randomIndex = Math.floor(Math.random() * randMax)

function atvImg() {
  var d = document,
    de = d.documentElement,
    bd = d.getElementsByTagName('body')[0],
    htm = d.getElementsByTagName('html')[0],
    win = window,
    imgs = d.querySelectorAll('.atvImg'),
    totalImgs = imgs.length,
    supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

  if (totalImgs <= 0) {
    return;
  }

  for (var l = 0; l < totalImgs; l++) {

    var thisImg = imgs[l],
      layerElems = thisImg.querySelectorAll('.atvImg-layer'),
      totalLayerElems = layerElems.length;

    if (totalLayerElems <= 0) {
      continue;
    }

    while (thisImg.firstChild) {
      thisImg.removeChild(thisImg.firstChild);
    }

    var containerHTML = d.createElement('div'),
      shineHTML = d.createElement('div'),
      shadowHTML = d.createElement('div'),
      layersHTML = d.createElement('div'),
      layers = [];

    thisImg.id = 'atvImg__' + l;
    containerHTML.className = 'atvImg-container';
    shineHTML.className = 'atvImg-shine';
    shadowHTML.className = 'atvImg-shadow';
    layersHTML.className = 'atvImg-layers';

    for (var i = 0; i < totalLayerElems; i++) {
      var layer = d.createElement('div'),
        imgSrc = imageArray[randomIndex]

      layer.className = 'atvImg-rendered-layer';
      layer.setAttribute('data-layer', i);
      layer.style.backgroundImage = 'url(' + imgSrc + ')';
      layersHTML.appendChild(layer);

      layers.push(layer);
    }

    containerHTML.appendChild(shadowHTML);
    containerHTML.appendChild(layersHTML);
    containerHTML.appendChild(shineHTML);
    thisImg.appendChild(containerHTML);

    var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
    thisImg.style.transform = 'perspective(' + w * 3 + 'px)';

    if (supportsTouch) {
      win.preventScroll = false;

      (function (_thisImg, _layers, _totalLayers, _shine) {
        thisImg.addEventListener('touchmove', function (e) {
          if (win.preventScroll) {
            e.preventDefault();
          }
          processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
        });
        thisImg.addEventListener('touchstart', function (e) {
          win.preventScroll = true;
          processEnter(e, _thisImg);
        });
        thisImg.addEventListener('touchend', function (e) {
          win.preventScroll = false;
          processExit(e, _thisImg, _layers, _totalLayers, _shine);
        });
      })(thisImg, layers, totalLayerElems, shineHTML);
    } else {
      (function (_thisImg, _layers, _totalLayers, _shine) {
        thisImg.addEventListener('mousemove', function (e) {
          processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);
        });
        thisImg.addEventListener('mouseenter', function (e) {
          processEnter(e, _thisImg);
        });
        thisImg.addEventListener('mouseleave', function (e) {
          processExit(e, _thisImg, _layers, _totalLayers, _shine);
        });
      })(thisImg, layers, totalLayerElems, shineHTML);
    }
  }

  function processMovement(e, touchEnabled, elem, layers, totalLayers, shine) {

    var bdst = bd.scrollTop || htm.scrollTop,
      bdsl = bd.scrollLeft,
      pageX = (touchEnabled) ? e.touches[0].pageX : e.pageX,
      pageY = (touchEnabled) ? e.touches[0].pageY : e.pageY,
      offsets = elem.getBoundingClientRect(),
      w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
      h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
      wMultiple = 320 / w,
      offsetX = 0.52 - (pageX - offsets.left - bdsl) / w,
      offsetY = 0.52 - (pageY - offsets.top - bdst) / h,
      dy = (pageY - offsets.top - bdst) - h / 2,
      dx = (pageX - offsets.left - bdsl) - w / 2,
      yRotate = (offsetX - dx) * (0.07 * wMultiple),
      xRotate = (dy - offsetY) * (0.1 * wMultiple),
      imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
      arad = Math.atan2(dy, dx),
      angle = arad * 180 / Math.PI - 90;

    if (angle < 0) {
      angle = angle + 360;
    }

    if (elem.firstChild.className.indexOf(' over') != -1) {
      imgCSS += ' scale3d(1.07,1.07,1.07)';
    }
    elem.firstChild.style.transform = imgCSS;

    shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst) / h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
    shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';

    var revNum = totalLayers;
    for (var ly = 0; ly < totalLayers; ly++) {
      layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
      revNum--;
    }
  }

  function processEnter(e, elem) {
    elem.firstChild.className += ' over';
  }

  function processExit(e, elem, layers, totalLayers, shine) {

    var container = elem.firstChild;

    container.className = container.className.replace(' over', '');
    container.style.transform = '';
    shine.style.cssText = '';

    for (var ly = 0; ly < totalLayers; ly++) {
      layers[ly].style.transform = '';
    }

  }

}

atvImg();

}, 1500)

// This is NOT necessary for the loader animation to work

window.addEventListener("load", function () {
  const Loader = document.querySelector(".Loader");
  Loader.classList.add("hidden");
});

function Ticker(elem) {
  elem.lettering();
  this.done = false;
  this.cycleCount = 5;
  this.cycleCurrent = 0;
  this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
  this.charsCount = this.chars.length;
  this.letters = elem.find('span');
  this.letterCount = this.letters.length;
  this.letterCurrent = 0;

  this.letters.each(function () {
    var $this = $(this);
    $this.attr('data-orig', $this.text());
    $this.text('-');
  });
}

Ticker.prototype.getChar = function () {
  return this.chars[Math.floor(Math.random() * this.charsCount)];
};

Ticker.prototype.reset = function () {
  this.done = false;
  this.cycleCurrent = 0;
  this.letterCurrent = 0;
  this.letters.each(function () {
    var $this = $(this);
    $this.text($this.attr('data-orig'));
    $this.removeClass('done');
  });
  this.loop();
};

Ticker.prototype.loop = function () {
  var self = this;

  this.letters.each(function (index, elem) {
    var $elem = $(elem);
    if (index >= self.letterCurrent) {
      if ($elem.text() !== ' ') {
        $elem.text(self.getChar());
        $elem.css('opacity', Math.random());
      }
    }
  });

  if (this.cycleCurrent < this.cycleCount) {
    this.cycleCurrent++;
  } else if (this.letterCurrent < this.letterCount) {
    var currLetter = this.letters.eq(this.letterCurrent);
    this.cycleCurrent = 0;
    currLetter.text(currLetter.attr('data-orig')).css('opacity', 1).addClass('done');
    this.letterCurrent++;
  } else {
    this.done = true;
  }

  if (!this.done) {
    requestAnimationFrame(function () {
      self.loop();
    });
  } else {
    setTimeout(function () {
      self.reset();
    }, 750);
  }
};

$words = $('.word');

$words.each(function () {
  var $this = $(this),
    ticker = new Ticker($this).reset();
  $this.data('ticker', ticker);
});

var button = document.querySelectorAll('.glitch')[0];
var turbVal = { val: 0.000001 };
var turb = document.querySelectorAll('#filter feTurbulence')[0];
var buttonTimeline = new TimelineLite({
  paused: true, onUpdate: function () {
    turb.setAttribute('baseFrequency', '0.00001 ' + turbVal.val);
  }
});

buttonTimeline.to(turbVal, 0.15, { val: 0.6 });
buttonTimeline.to(turbVal, 0.1, { val: 0.000001 });

button.addEventListener('mouseenter', function () {
  buttonTimeline.restart();
});
