var imported = document.createElement('script');
var AdsenseId = "ca-pub-6129580795478709"
var ChannelId = "5202265763"
var adFrequency = "180s";
var testAdsOn = false;
var isRewardGained = 0;
var isRewardDismissed = 0;
var isFrequencyCapped = 0;


window.adsbygoogle = window.adsbygoogle || [];
var adBreak;
var adConfig;

function loadAdSetup()
{
    console.log("loadAdSetup");
    adBreak = function (o) {
        adsbygoogle.push(o);
    }
    adConfig = function (o) {
        adsbygoogle.push(o);
    }
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
    console.log("showNextAd");
    adBreak({
        type: 'start', // ad shows at start of next level
        name: 'start-game',
        beforeAd: () => {
            console.log("this")
            isGamePaused = 1;
            console.log("isGamePaused " + isGamePaused)
        }, // You may also want to mute thegame's sound.
        afterAd: () => {
            console.log("that")
            isGamePaused = 0;
            console.log("isGamePaused " + isGamePaused)
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
        beforeReward: (showAdFn) => {
            console.log("beforeReward ") + showAdFn(0)
        },
        adDismissed: () => {
            console.log("adDismissed");
            rewardDismissed();
        },
        adViewed: () => {
            console.log("adViewed");
            RewardGained();
        },
        adBreakDone: (placementInfo) => {
            console.log("adBreak complete ");
            isGamePaused = 0;
            console.log(placementInfo.breakType);
            console.log(placementInfo.breakName);
            console.log(placementInfo.breakFormat);
            console.log(placementInfo.breakStatus);
            if (placementInfo.breakStatus == "frequencyCapped") {
                updateTextRewardPanel()
            }
            ;
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
    console.log("RewardGained");
    isRewardGained = 1;

    // User watched the rewarded ad. so add rewards function here.
}

function updateTextRewardPanel()
{
    console.log("updateTextRewardPanel")
    isFrequencyCapped = 1;
    // frequencyCapped No reward Ads
}

function createAFGScript()
{
    console.log("createAFGScript " + testAdsOn)
    imported.setAttribute('data-ad-client', AdsenseId);
    imported.setAttribute('data-ad-channel', ChannelId);
    imported.setAttribute('data-ad-frequency-hint', adFrequency);
    if (testAdsOn == true) {
        imported.setAttribute('data-adbreak-test', "on");
    }
    imported.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    imported.setAttribute("type", "text/javascript");
    imported.async = true;
    document.head.appendChild(imported);
}

createAFGScript();
loadAdSetup();
