/* NO-ADS offline — recursion guard; SetTimeScale async; no AdShown */
window.adsbygoogle = window.adsbygoogle || [];
var _inY8ExternEval=false,_inY8ExternEvalReward=false;
function _unity(){return window.unityInstance||window.gameInstance;}
window.InitExternEval=function(){};
window.Y8ExternEval=function(){
 if(_inY8ExternEval)return;
 var u=_unity();
 if(!u||typeof u.SendMessage!=='function')return;
 _inY8ExternEval=true;
 setTimeout(function(){try{u.SendMessage('IDNET(Idnet.cs)','SetAudio','1');u.SendMessage('IDNET(Idnet.cs)','SetTimeScale','1');}catch(e){}finally{_inY8ExternEval=false;}},0);
};
window.Y8ExternEvalReward=function(){
 if(_inY8ExternEvalReward)return;
 var u=_unity();
 if(!u||typeof u.SendMessage!=='function')return;
 _inY8ExternEvalReward=true;
 setTimeout(function(){try{u.SendMessage('IDNET(Idnet.cs)','SetRewardCallback','true');u.SendMessage('IDNET(Idnet.cs)','DisableRewardLoader');u.SendMessage('IDNET(Idnet.cs)','SetAudio','1');u.SendMessage('IDNET(Idnet.cs)','SetTimeScale','1');}catch(e){}finally{_inY8ExternEvalReward=false;}},0);
};
