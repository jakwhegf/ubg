/* IMA SDK — VAST tag thay thế từ ads/tag manager.txt */
function InitExternEval(appid) {
  Gamebreak.init();
}

function Y8ExternEval(allowGamePause) {
  if (!Gamebreak.adsRunning && Gamebreak.adTimeoutPassed()) {
    Gamebreak.displayAds();
  }
}

var Gamebreak = {
  adsRunning: false,
  adTimeout: 180000,
  adTagBaseUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/23136362493/ads-video-main&description_url=http%3A%2F%2Fcool2fun.guthub.io&tfcd=0&npa=0&sz=640x480&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator=',
  lastAdTime: 0,
  allowGamePause: true,
  init: function() {
    Gamebreak.loadScript('https://imasdk.googleapis.com/js/sdkloader/outstream.js');
    Gamebreak.drawContainer();
  },
  drawContainer: function() {
    var overlay = document.createElement('div');
    overlay.classList.add('ad-overlay');
    var webgl = document.getElementsByClassName('webgl-content')[0];
    if (webgl) webgl.appendChild(overlay);
    var container = document.createElement('div');
    container.classList.add('ad-container');
    document.getElementsByClassName('ad-overlay')[0].appendChild(container);
  },
  displayAds: function() {
    var overlay = document.getElementsByClassName('ad-overlay')[0];
    var container = document.getElementsByClassName('ad-container')[0];
    if (overlay && container) {
      new Html5Ima({
        adTagUrl: Gamebreak.adTagUrl(),
        overlayContainer: overlay,
        container: container
      }).load();
    } else {
      Gamebreak.setTimeScale('1');
    }
  },
  loadScript: function(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  },
  adTimeoutPassed: function() {
    return (new Date().getTime() - Gamebreak.lastAdTime) >= Gamebreak.adTimeout;
  },
  setTimeScale: function(value) {
    var instance = window.gameInstance || window.unityInstance;
    if (instance && typeof instance.SendMessage === 'function') {
      instance.SendMessage('IDNET(Idnet.cs)', 'SetAudio', value);
      if (Gamebreak.allowGamePause) {
        instance.SendMessage('IDNET(Idnet.cs)', 'SetTimeScale', value);
      }
    }
  },
  adTagUrl: function() {
    var tag = Gamebreak.adTagBaseUrl.replace(/\s*$/, '');
    return tag + (tag.indexOf('correlator=') === -1 ? '&correlator=' : '') + Date.now();
  }
};

window.Html5Ima = (function() {
  function _bind(thisObj, fn) {
    return function() { fn.apply(thisObj, arguments); };
  }
  var Html5Ima = function(config) {
    this.adTagUrl = config.adTagUrl;
    this.overlayContainer = config.overlayContainer;
    this.container = config.container;
    this.adsController = new google.outstream.AdsController(
      this.container,
      _bind(this, this.onAdLoaded),
      _bind(this, this.onAdDone)
    );
  };
  Html5Ima.prototype.load = function() {
    this.overlayContainer.style.display = 'block';
    this.requestAds();
  };
  Html5Ima.prototype.onAdLoaded = function() {
    Gamebreak.lastAdTime = new Date().getTime();
    Gamebreak.adsRunning = true;
    Gamebreak.setTimeScale('0');
    this.adsController.showAd();
  };
  Html5Ima.prototype.onAdDone = function() {
    Gamebreak.setTimeScale('1');
    this.overlayContainer.style.display = 'none';
    this.container.innerHTML = '';
    Gamebreak.adsRunning = false;
  };
  Html5Ima.prototype.requestAds = function() {
    this.adsController.initialize();
    this.adsController.requestAds(this.adTagUrl);
  };
  return Html5Ima;
})();
