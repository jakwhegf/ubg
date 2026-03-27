/* NO-ADS stub — async + không dùng window.SendMessage */
window.adsbygoogle = window.adsbygoogle || [];
const adBreak = adConfig = function() {};
const GO_NAME = 'IDNET(Idnet.cs)';
let _cachedInstance = null;
function getUnity() {
  if (_cachedInstance && typeof _cachedInstance.SendMessage === 'function') return _cachedInstance;
  const ui = window.unityInstance || window.gameInstance;
  if (ui && typeof ui.SendMessage === 'function') return (_cachedInstance = ui);
  return null;
}
function sendUnity(method, arg) {
  const ui = getUnity();
  if (!ui) return false;
  try {
    (typeof arg === 'undefined') ? ui.SendMessage(GO_NAME, method) : ui.SendMessage(GO_NAME, method, String(arg));
    return true;
  } catch (e) { return false; }
}
function toBool(v) {
  if (typeof v === 'boolean') return v;
  if (v == null) return false;
  return String(v).trim().toLowerCase() === '1' || String(v).trim().toLowerCase() === 'true';
}
function setTimeScale(value, allowGamePause) {
  sendUnity('SetAudio', value);
  if (allowGamePause) sendUnity('SetTimeScale', value);
}
window.InitExternEval = function(appId) { setTimeout(function() { getUnity(); }, 0); };
window.Y8ExternEval = function(allowGamePause, interstitialType, interstitialName) {
  var ap = toBool(allowGamePause);
  setTimeout(function() {
    try {
      setTimeScale('1', ap);
      sendUnity('AdShown', 'shown');
    } catch (e) {}
    try { window.focus(); } catch (e2) {}
  }, 0);
};
window.Y8ExternEvalReward = function(allowGamePause) {
  var ap = toBool(allowGamePause);
  setTimeout(function() {
    try {
      sendUnity('SetRewardCallback', 'true');
      sendUnity('DisableRewardLoader');
      setTimeScale('1', ap);
    } catch (e) {}
    try { window.focus(); } catch (e2) {}
  }, 0);
};
