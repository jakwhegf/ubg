////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	str = 'g_prelogo';
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/y8logo.png', id:'y8logo'},
            {src:'assets/leaderboard.png', id:'leaderboard'},
            {src:'assets/submitScore.png', id:'submitScore'},
            {src:'assets/background_main.png', id:'bgMain'},
				{src:'assets/button_start.png', id:'btnStart'},
				{src:'assets/button_select.png', id:'btnSelect'},
				{src:'assets/buttton_select_arrow.png', id:'btnArrowSelect'},
				{src:'assets/background_thumb_select.png', id:'thumbSelect'},
				{src:'assets/background_thumb.png', id:'thumbNormal'},
				{src:'assets/pop_select_terminal.png', id:'popSelectTerminal'},
				{src:'assets/icon_landing.png', id:'iconLanding'},
				{src:'assets/icon_terminal.png', id:'iconTerminal'},
				{src:'assets/icon_exitterminal.png', id:'iconExitTerminal'},
				{src:'assets/icon_takeoff.png', id:'iconTakeoff'},
				{src:'assets/background_score.png', id:'bgScore'},
				{src:'assets/pop_terminal.png', id:'popTerminal'},
				{src:'assets/button_ok.png', id:'btnOk'},
				{src:'assets/pop_result.png', id:'popResult'},
				{src:'assets/button_facebook.png', id:'btnFacebook'},
				{src:'assets/button_twitter.png', id:'btnTwitter'},
				{src:'assets/button_google.png', id:'btnGoogle'},
				{src:'assets/button_replay.png', id:'buttonReplay'},
				{src:'assets/bomb_final_Spritesheet4x3.png', id:'bomb'}
				];
	
	for(n=0;n<terminals_arr.length;n++){
		manifest.push({src:terminals_arr[n].src, id:'terminal_'+n});
		manifest.push({src:terminals_arr[n].thumb, id:'terminalThumb_'+n});
	}
	
	for(n=0;n<planes_arr.length;n++){
		manifest.push({src:planes_arr[n].src, id:'plane_'+n});
		manifest.push({src:planes_arr[n].shadowsrc, id:'planeShadow_'+n});
	}
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/takeoff.ogg', id:'soundTakeoff'});
		manifest.push({src:'assets/sounds/landing.ogg', id:'soundLanding'});
		manifest.push({src:'assets/sounds/seatbelt.ogg', id:'soundSeatbelt'});
		manifest.push({src:'assets/sounds/radio1.ogg', id:'soundRadio1'});
		manifest.push({src:'assets/sounds/radio2.ogg', id:'soundRadio2'});
		manifest.push({src:'assets/sounds/ding_button.ogg', id:'soundDingButton'});
		manifest.push({src:'assets/sounds/button.ogg', id:'soundButton'});
		manifest.push({src:'assets/sounds/ding.ogg', id:'soundDing'});
		manifest.push({src:'assets/sounds/crash.ogg', id:'soundCrash'});
		manifest.push({src:'assets/sounds/passby.ogg', id:'soundPassby'});
		manifest.push({src:'assets/sounds/launch.ogg', id:'soundLaunch'});
		manifest.push({src:'assets/sounds/shutdown.ogg', id:'soundShutdown'});
		manifest.push({src:'assets/sounds/airport.ogg', id:'soundAirport'});
		manifest.push({src:'assets/sounds/music.ogg', id:'musicMain'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
        loader.addEventListener("fileload", handleFileLoad)
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('.percentIndicator').css('width',Math.round(loader.progress/1*98)+'%');
        if(loadText !== null && loadText !== undefined){
        loadText.text = "Loading " + Math.round(loader.progress/1*98)+'%'}
}

function handleFileLoad(evt)
{
    if (evt.item.type == "image" && evt.item.id == "y8logo") {console.log('Logo Loaded');
    s_y8Logo = new createjs.Bitmap(loader.getResult('y8logo'));    
    if(!$.browser.mobile || !isTablet){
		$('#canvasHolder').show();	
	}
    initGameCanvas(stageW,stageH);
    s_y8Logo.x = canvasW/100 * 1;
    s_y8Logo.y = canvasH/100 * 90;
    stage.addChild(s_y8Logo)
    s_y8Logo.cursor = "pointer"; 
    s_y8Logo.addEventListener("click", func_y8Logo)        
    }	
    if (evt.item.type == "image" && evt.item.id == "bgMain")
    {
         console.log('BG LOADED')
        var bgS = new createjs.Bitmap(loader.getResult('bgMain'));
        stage.addChildAt(bgS, 0)
        loadText = new createjs.Text("This website is blacklisted, please go to ", "bold 30px Arial", "#000")
        loadText.textAlign = "center";
        loadText.color = "#fFFFFF"
        loadText.y = canvasH/100 * 94;
        loadText.x = canvasW/2;
        stage.addChild(loadText)
    }
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
        isLoadComplete = true
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#loaderHolder').show();
	}else{
		$('#loaderHolder').hide();
	}
}