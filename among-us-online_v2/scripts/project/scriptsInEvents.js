
window.idAsyncInit = function() {
    // use an id.net event to wait until after init
    ID.Event.subscribe('id.init', function(){
        // use jquery to call methods on click
         ID.getLoginStatus(idCallback)
         ID.Protection.isBlacklisted(function(blacklisted){
			if(blacklisted == true){isBlacklisted = 1;}else{isBlacklisted = 0;}
            console.log('[BLACKLIST] : ' + isBlacklisted);
        });
         ID.Protection.isSponsor(function(sponsor){
			isSponsor = sponsor;
			if(sponsor == true){isSponsor = 1;}else{isSponsor = 0;}
            console.log('[SPONSOR] : ' + isSponsor);
        });
        ID.ads.init(1)//change 1 to the correct item_id
    });
    // using an optional callback to capture data on the client
    var userName;
    var idCallback = function(response){
        if (response) {
            console.log(response);
            if(response.status === 'ok')
            {
               userName = response.authResponse.details.nickname;
			   sUserName = userName;
			   isLogin = 1;
            }
        }
    }
	ID.init({
		//Add your app Id here
        appId : "633bf421b4439c4a44234b84"
    });
};

// load the idnet js interface
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src =  document.location.protocol == 'https:' ? "https://scdn.id.net/api/sdk.js" : "http://cdn.id.net/api/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'id-jssdk'));

function initY8(appId_)
{
	console.log("appId_ "+appId_)
	ID.init({
        appId : appId_
    });
}

//y8 variables
var isLogin = 0;
var sUserName = 'Guest';
var URLlocation;
var isBlacklisted = 0
var isSponsor = 0;
var onlineSavesData;
var isGamePaused = 0;


var imported = document.createElement('script');
var HostId = "ca-host-pub-6129580795478709";

var AdsenseId = "ca-pub-6129580795478709"
// Enter your AdSense ID. If you don't have an AdSense ID, leave this line unchanged and enter the Channel ID below.
var ChannelId = "8241080077"
// Enter your Channel ID if you don't have an AdSense ID.

var adFrequency = "120s";

var testAdsOn = false;
// Set to false when the game is ready to go live.

var activateAFP = false;
// Set to false if you are using the Channel ID instead of your AdSense ID.
	
var isRewardGained = 0;
var isRewardDismissed = 0;
var isFrequencyCapped = 0;


window.adsbygoogle = window.adsbygoogle || [];
var adBreak;
var adConfig;

function loadAdSetup()
{
	console.log("loadAdSetup");
	adBreak = function(o) {adsbygoogle.push(o);}
	adConfig = function(o) {adsbygoogle.push(o);}
	adConfig({
    preloadAdBreaks: 'on',
    sound: 'on', // This game has sound
    onReady: () => {
        console.log("ready");
    }, // Called when API has initialised and adBreak() is ready
});

}
function nextAds()
{
    console.log("showNextAd")
    adBreak({
        type: 'start', // ad shows at start of next level
        name: 'start-game',
        beforeAd: () => {            
            console.log("this")
			isGamePaused = 1;
        }, // You may also want to mute thegame's sound.
        afterAd: () => {
            console.log("that")
			isGamePaused = 0;
        }, // resume the game flow.
        adBreakDone: (placementInfo) => {
            console.log("adBreak complete ");
			isGamePaused = 0;
            console.log(placementInfo.breakType);
            console.log(placementInfo.breakName);
            console.log(placementInfo.breakFormat);
            console.log(placementInfo.breakStatus);
        },
    });
}

function showReward()
{
    console.log("showReward")
    adBreak({
        type: 'reward', // ad shows at start of next level
        name: 'rewarded Ad',
        beforeAd: () => {            
            console.log("this")
			isGamePaused = 1;
        }, // You may also want to mute thegame's sound.
        afterAd: () => {
            console.log("that")
			isGamePaused = 0;
        }, // resume the game flow.
        beforeReward: (showAdFn) => {console.log("beforeReward ")+showAdFn(0)},
        adDismissed: () => {console.log("adDismissed");rewardDismissed();},
        adViewed: () => {console.log("adViewed");RewardGained();},
        adBreakDone: (placementInfo) => {
            console.log("adBreak complete ");
			isGamePaused = 0;
            console.log(placementInfo.breakType);
            console.log(placementInfo.breakName);
            console.log(placementInfo.breakFormat);
            console.log(placementInfo.breakStatus);
            if(placementInfo.breakStatus == "frequencyCapped"){updateTextRewardPanel()};
        },
    });
}

function rewardDismissed()		
{
	console.log("rewardDismissed");
	isRewardDismissed = 1;
	// User clicked the close button when reward is showing. So just restart the game with no rewards.
}

function RewardGained()
{
	console.log("RewardGained")
	isRewardGained = 1;
	
	// User watched the rewarded ad. so add rewards function here.
}

function updateTextRewardPanel()
{
    console.log("updateTextRewardPanel")
	isFrequencyCapped  = 1;
	// frequencyCapped No reward Ads
}

function createAFGScript()
{
	console.log("createAFGScript " + testAdsOn)
	if(activateAFP == true){imported.setAttribute('data-ad-host', HostId)};
    imported.setAttribute('data-ad-client', AdsenseId);
	if(activateAFP == false){imported.setAttribute('data-ad-channel', ChannelId)};
    imported.setAttribute('data-ad-frequency-hint', adFrequency);
    if(testAdsOn == true){imported.setAttribute('data-adbreak-test', "on");}
    imported.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    imported.setAttribute("type", "text/javascript");
    imported.async = true;
    document.head.appendChild(imported);
}

createAFGScript()
loadAdSetup()



const scriptsInEvents = {

	async Y8_Event1_Act1(runtime, localVars)
	{
		ID.login(function(response){
			console.log("response "+response)
				if(response.status === 'ok')
				{
					sUserName = response.authResponse.details.nickname;
					isLogin = 1;			
				}
			});
	},

	async Y8_Event2_Act1(runtime, localVars)
	{
		nextAds()
	},

	async Y8_Event3_Act1(runtime, localVars)
	{
		showReward()
	},

	async Y8_Event4_Act1(runtime, localVars)
	{
		runtime.globalVars["isRewardGained"] = isRewardGained;
		runtime.globalVars["isFrequencyCapped"] = isFrequencyCapped;
		runtime.globalVars["isRewardDismissed"] = isRewardDismissed;
		isRewardGained = 0;
		isFrequencyCapped = 0;
		isRewardDismissed = 0;
	},

	async Y8_Event5_Act1(runtime, localVars)
	{
		runtime.globalVars["isPausedGameY8"] = isGamePaused;
	},

	async Y8_Event6_Act1(runtime, localVars)
	{
		ID.openProfile();
	},

	async Y8_Event7_Act1(runtime, localVars)
	{
		var blobUrl = localVars.image_;
		console.log("blobUrl "+ blobUrl);
		
		var xhr = new XMLHttpRequest;
		xhr.responseType = 'blob';
		xhr.onload = function() {
		   var recoveredBlob = xhr.response;
		   var reader = new FileReader;
		   reader.readAsDataURL(recoveredBlob);
		   reader.onloadend = function() {
		     var base64data = reader.result;                
		     console.log("base64data "+base64data);
			 sentImageToProfile(base64data)
		 }
		};
		
		xhr.open('GET', blobUrl);
		xhr.send();
		
		function sentImageToProfile(_image)
		{
			ID.submit_image(_image, function(response){
		        console.log("screenshot submitted", response);
		      });
		}
		
	},

	async Y8_Event8_Act1(runtime, localVars)
	{
		
	},

	async Y8_Event9_Act2(runtime, localVars)
	{
		
	},

	async Y8_Event10_Act2(runtime, localVars)
	{
		
	},

	async Y8_Event17_Act1(runtime, localVars)
	{
		ID.init({
		        appId : localVars.ID
		    });
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

