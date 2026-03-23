/* NO-ADS offline — không AdShown; SetTimeScale async */
window.adsbygoogle = window.adsbygoogle || [];
function _unity(){return window.unityInstance||window.gameInstance;}
window.InitExternEval=function(){};
window.Y8ExternEval=function(){
 var u=_unity();
 if(!u||typeof u.SendMessage!=='function')return;
 setTimeout(function(){try{u.SendMessage('IDNET(Idnet.cs)','SetAudio','1');u.SendMessage('IDNET(Idnet.cs)','SetTimeScale','1');}catch(e){}},0);
};
window.Y8ExternEvalReward=function(){
 var u=_unity();
 if(!u||typeof u.SendMessage!=='function')return;
 setTimeout(function(){try{u.SendMessage('IDNET(Idnet.cs)','SetRewardCallback','true');u.SendMessage('IDNET(Idnet.cs)','DisableRewardLoader');u.SendMessage('IDNET(Idnet.cs)','SetAudio','1');u.SendMessage('IDNET(Idnet.cs)','SetTimeScale','1');}catch(e){}},0);
};
