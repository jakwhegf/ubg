/* NO-ADS: Ads/IMA replaced with no-op. Reward = auto-grant. */
window.adsbygoogle = window.adsbygoogle || [];
const adBreak = adConfig = function() {};
function getGame() { return window.myGameInstance || window.unityInstance || window.gameInstance; }
function showNextAd() {
  var g = getGame();
  if (g && g.SendMessage) { g.SendMessage('Game', 'pauseGame'); g.SendMessage('Game', 'resumeGame'); }
}
function showReward() {
  var g = getGame();
  if (g && g.SendMessage) {
    g.SendMessage('Game', 'resumeGameRewarded');
    g.SendMessage('Game', 'rewardAdsCompleted');
  }
}
function noRewardAdsAvailable() {}
function cancelReward() { var g = getGame(); if (g && g.SendMessage) g.SendMessage('Game', 'resumeGameRewarded'); }
function gainReward() {
  var g = getGame();
  if (g && g.SendMessage) { g.SendMessage('Game', 'resumeGameRewarded'); g.SendMessage('Game', 'rewardAdsCompleted'); }
}
function passBeforeAdData() { var g = getGame(); if (g && g.SendMessage) g.SendMessage('Game', 'pauseGame'); }
function adBreakDoneData() { var g = getGame(); if (g && g.SendMessage) g.SendMessage('Game', 'resumeGame'); }
