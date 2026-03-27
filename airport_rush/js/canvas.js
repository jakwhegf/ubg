////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", tick);
}

var canvasContainer, mainContainer, selectContainer, gameContainer, terminalContainer, editContainer, editDotContainer, levelContainer, resultContainer;
var editBg;
var bg, btnStart, popSelectTerminal, bgThumb1, bgThumb2, bgThumb3, thumbSelect, btnSelect, btnArrowSelect, planeContainer, planeIconContainer, iconLanding, iconTerminal, iconExitTerminal, iconTakeoff, bgScore, txtScoreGuide, txtScoreNumber, popTerminal, btnOk, txtTerminalName, popResult, btnFacebook, btnTwitter, btnGoogle, txtResultTerminal, txtResultScore, buttonReplay, bombAnimation, bombData;

var buttonLeaderboard;
var s_y8Logo = null;
var buttonSubmitScore;

var s_isLogin = false;
var s_userName = 'Guest';
var s_URLlocation;
var s_gameName = "airport_rush"
var s_isBlacklisted = false
var str;   
var s_sponsor = false;
var s_iScore = 0;
var welcomeText;
var isLoadComplete = false
var loadText;

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */

var editCon = false;
$.terminals = {};
$.thumbs = {};
$.planesData = {};
$.planes = {};

function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	selectContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	planeContainer = new createjs.Container();
	planeIconContainer = new createjs.Container();
	editContainer = new createjs.Container();
	editDotContainer = new createjs.Container();
	terminalContainer = new createjs.Container();
	levelContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	bg = new createjs.Bitmap(loader.getResult('bgMain'));
	btnStart = new createjs.Bitmap(loader.getResult('btnStart'));
	centerReg(btnStart);
	btnStart.x = canvasW/100 * 40
	btnStart.y = canvasH/100 * 90;
        
        buttonLeaderboardMenu = new createjs.Bitmap(loader.getResult('leaderboard'));
	centerReg(buttonLeaderboardMenu);
	buttonLeaderboardMenu.x = canvasW/100 * 72
	buttonLeaderboardMenu.y = canvasH/100 * 90;
	
        buttonLeaderboard = new createjs.Bitmap(loader.getResult('leaderboard'));
	centerReg(buttonLeaderboard);
	buttonLeaderboard.x = canvasW/2;
	buttonLeaderboard.y = canvasH/100 * 58;
        
        buttonSubmitScore = new createjs.Bitmap(loader.getResult('submitScore'));
	centerReg(buttonSubmitScore);
	buttonSubmitScore.x = canvasW/2;
	buttonSubmitScore.y = canvasH/100 * 58;
        
	welcomeText = new createjs.Text();
	welcomeText.font = "30px ostrich_sansheavy";
	welcomeText.color = "#FFFFFF";
	welcomeText.text = "Welcome " + s_userName;
	welcomeText.textAlign = "left";
	welcomeText.textBaseline='alphabetic';
	welcomeText.x = canvasW/100 * 3
	welcomeText.y = canvasH/100*7;
        
	popSelectTerminal = new createjs.Bitmap(loader.getResult('popSelectTerminal'));
	bgThumbSelected = new createjs.Bitmap(loader.getResult('thumbSelect'));
	bgThumb1 = new createjs.Bitmap(loader.getResult('thumbNormal'));
	bgThumb2 = new createjs.Bitmap(loader.getResult('thumbNormal'));
	bgThumb3 = new createjs.Bitmap(loader.getResult('thumbNormal'));
	
	btnSelect = new createjs.Bitmap(loader.getResult('btnSelect'));
	btnArrowLeft = new createjs.Bitmap(loader.getResult('btnArrowSelect'));
	btnArrowRight = new createjs.Bitmap(loader.getResult('btnArrowSelect'));
	
	centerReg(bgThumbSelected);
	centerReg(bgThumb1);
	centerReg(bgThumb2);
	centerReg(bgThumb3);
	centerReg(btnSelect);
	centerReg(btnArrowLeft);
	centerReg(btnArrowRight);
	
	bgThumb1.x = canvasW/100*24;
	bgThumb2.x = canvasW/2;
	bgThumb3.x = canvasW/100*76;
	bgThumb1.y = bgThumb2.y = bgThumb3.y = canvasH/100 * 45;
	
	btnArrowLeft.x = canvasW/100 * 20;
	btnArrowLeft.y = canvasH/100 * 80;
	btnArrowRight.x = canvasW/100 * 80;
	btnArrowRight.y = canvasH/100 * 80;
	btnArrowRight.scaleX = -1;
	btnSelect.x = canvasW/2;
	btnSelect.y = canvasH/100 * 80;
	selectContainer.addChild(popSelectTerminal, bgThumb1, bgThumb2, bgThumb3, bgThumbSelected, btnSelect, btnArrowLeft, btnArrowRight);
	
	var thumbCount = 1;
	for(n=0;n<terminals_arr.length;n++){
		$.thumbs['thumb_text_'+n] = new createjs.Text();
		$.thumbs['thumb_text_'+n].font = "45px ostrich_sansheavy";
		$.thumbs['thumb_text_'+n].color = "#ffffff";
		$.thumbs['thumb_text_'+n].text = terminals_arr[n].name;
		$.thumbs['thumb_text_'+n].textAlign = "center";
		$.thumbs['thumb_text_'+n].textBaseline='alphabetic';
		
		$.thumbs['thumb_'+n] = new createjs.Bitmap(loader.getResult('terminalThumb_'+n));
		centerReg($.thumbs['thumb_'+n]);
		$.thumbs['thumb_'+n].x = $.thumbs['thumb_text_'+n].x = this["bgThumb"+thumbCount].x;
		$.thumbs['thumb_'+n].y = this["bgThumb"+thumbCount].y;
		$.thumbs['thumb_text_'+n].y = canvasH/100*67;
		
		thumbCount++;
		if(thumbCount>3){
			thumbCount = 1;	
		}
		selectContainer.addChild($.thumbs['thumb_'+n], $.thumbs['thumb_text_'+n]);
		
		$.terminals['terminal_'+n] = new createjs.Bitmap(loader.getResult('terminal_'+n));
		$.terminals['terminal_'+n].name = 'terminal'+n;
		terminalContainer.addChild($.terminals['terminal_'+n]);
	}
	
	for(n=0;n<planes_arr.length;n++){
		var _frame = {"regX": planes_arr[n].regX, "regY": planes_arr[n].regY, "height": planes_arr[n].height, "count": planes_arr[n].count, "width": planes_arr[n].width};
		var _animations = planes_arr[n].animation;
				
		$.planesData[n] = new createjs.SpriteSheet({
			"images": [loader.getResult('plane_'+n).src],
			"frames": _frame,
			"animations": _animations
		});
		
		$.planesData['shadow'+n] = new createjs.SpriteSheet({
			"images": [loader.getResult('planeShadow_'+n).src],
			"frames": _frame,
			"animations": _animations
		});
	}
	
	var _frame = {"regX": 70, "regY": 160, "height": 170, "count": 10, "width": 140};
	var _animations = {static:{frames: [0]},
						explode:{frames: [1,2,3,4,5,6,7,8,9], speed: .5, next:'explode'}};
						
	bombData = new createjs.SpriteSheet({
		"images": [loader.getResult('bomb').src],
		"frames": _frame,
		"animations": _animations
	});
	
	bombAnimation = new createjs.Sprite(bombData, "static");
	bombAnimation.framerate = 20;
	bombAnimation.gotoAndStop(0);
	
	bgScore = new createjs.Bitmap(loader.getResult('bgScore'));
	bgScore.x = canvasH/100*95;
	
	txtScoreGuide = new createjs.Text();
	txtScoreGuide.font = "45px ostrich_sansheavy";
	txtScoreGuide.color = "#ffffff";
	txtScoreGuide.text = textScoreGuide;
	txtScoreGuide.textAlign = "center";
	txtScoreGuide.textBaseline='alphabetic';
	
	txtScoreNumber = new createjs.Text();
	txtScoreNumber.font = "45px ostrich_sansheavy";
	txtScoreNumber.color = "#ffffff";
	txtScoreNumber.text = 15;
	txtScoreNumber.textAlign = "center";
	txtScoreNumber.textBaseline='alphabetic';
	
	txtScoreGuide.x = canvasW/100*78;
	txtScoreNumber.x = canvasW/100*89;
	txtScoreGuide.y = txtScoreNumber.y = canvasH/100 * 6;
	
	popTerminal = new createjs.Bitmap(loader.getResult('popTerminal'));
	btnOk = new createjs.Bitmap(loader.getResult('btnOk'));
	centerReg(btnOk);
	btnOk.x = canvasW/2;
	btnOk.y = canvasH/100*77;
	
	txtTerminalName = new createjs.Text();
	txtTerminalName.font = "60px ostrich_sansheavy";
	txtTerminalName.color = "#ffffff";
	txtTerminalName.text = terminals_arr[0].name;
	txtTerminalName.textAlign = "center";
	txtTerminalName.textBaseline='alphabetic';
	txtTerminalName.x = canvasW/2;
	txtTerminalName.y = canvasH/100*26;
	
	popResult = new createjs.Bitmap(loader.getResult('popResult'));
	//btnFacebook = new createjs.Bitmap(loader.getResult('btnFacebook'));
	//btnTwitter = new createjs.Bitmap(loader.getResult('btnTwitter'));
	//btnGoogle = new createjs.Bitmap(loader.getResult('btnGoogle'));
	buttonReplay = new createjs.Bitmap(loader.getResult('buttonReplay'));
	
	txtResultTerminal = new createjs.Text();
	txtResultTerminal.font = "55px ostrich_sansheavy";
	txtResultTerminal.color = "#ffffff";
	txtResultTerminal.text = terminals_arr[0].name;
	txtResultTerminal.textAlign = "center";
	txtResultTerminal.textBaseline='alphabetic';
	txtResultTerminal.x = canvasW/2;
	txtResultTerminal.y = canvasH/100*38;
	
	txtResultScore = new createjs.Text();
	txtResultScore.font = "70px ostrich_sansheavy";
	txtResultScore.color = "#ffffff";
	txtResultScore.text = textResultWin;
	txtResultScore.textAlign = "center";
	txtResultScore.textBaseline='alphabetic';
	txtResultScore.x = canvasW/2;
	txtResultScore.y = canvasH/100*47;
	
	//centerReg(btnFacebook);
	//centerReg(btnTwitter);
	//centerReg(btnGoogle);
	centerReg(buttonReplay);
	
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100 * 75;
	
	//btnFacebook.x = canvasW/100 * 40;
	//btnTwitter.x = canvasW/2;
	//btnGoogle.x = canvasW/100 * 60;
	//btnFacebook.y = btnTwitter.y = btnGoogle.y = canvasH/100*63;
	
	resultContainer.addChild(popResult, buttonReplay, txtResultTerminal, txtResultScore, buttonLeaderboard, buttonSubmitScore);
	
	editBg = new createjs.Shape();
	editBg.graphics.beginFill('#fff').drawRect(0, 0, canvasW, canvasH);
	editBg.alpha = .1;
	
	iconLanding = new createjs.Bitmap(loader.getResult('iconLanding'));
	iconTerminal = new createjs.Bitmap(loader.getResult('iconTerminal'));
	iconExitTerminal = new createjs.Bitmap(loader.getResult('iconExitTerminal'));
	iconTakeoff = new createjs.Bitmap(loader.getResult('iconTakeoff'));
	
	iconLanding.x = iconTerminal.x = iconExitTerminal.x = iconTakeoff.x = -200;
	
	centerReg(iconLanding);
	centerReg(iconTerminal);
	centerReg(iconExitTerminal);
	centerReg(iconTakeoff);
	
	mainContainer.addChild(btnStart, welcomeText, buttonLeaderboardMenu);
	editContainer.addChild(editBg, editDotContainer);
	levelContainer.addChild(popTerminal, btnOk, txtTerminalName);
	gameContainer.addChild(terminalContainer, planeContainer, planeIconContainer, editContainer, iconLanding, iconTerminal, iconExitTerminal, iconTakeoff,bgScore, txtScoreGuide, txtScoreNumber, levelContainer, resultContainer);
	
	canvasContainer.addChild(bg, mainContainer, selectContainer, gameContainer, s_y8Logo);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}

/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		//canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
    if(s_isBlacklisted === false)
        {
            if(isLoadComplete === true)
            {
                updateGame();
            }
            
        }
        else
        {
            blacklisted()
        }
	stage.update(event);
	//updateGame();
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}

function blacklisted()
{
    var graphics = new createjs.Graphics().beginFill("#FFFFFF").drawRect(0, 0, canvasW, canvasH/4+50);
             var shape = new createjs.Shape(graphics)
             var tempText1 = new createjs.Text("This website is blacklisted, please go to ", "bold 30px Arial", "#000")
             var tempText2 = new createjs.Text("to play this game. If you are a website owner,\n please unblock games link and request y8.com\n to remove your website from blacklisted list", "bold 30px Arial", "#000")
             //var tempText3 = new createjs.Text("", "bold 22px "+FONT2, "#000")
              var _blackListText = new createjs.Text("http://www.y8.com/games/"+s_gameName,"bold 30px Arial", "#990000");
             tempText1.textAlign = 'center';
             tempText2.textAlign = 'center';
             tempText2.textAlign = 'center';
             _blackListText.textAlign = 'center';
            shape.x = 0;
            shape.y = canvasH - 170;
            shape.alpha = .5
            tempText1.x = canvasW/2;
            tempText1.y = canvasH - 160;
            _blackListText.x =  canvasW/2;
            _blackListText.y = tempText1.y + 30
            tempText2.x = canvasW/2;
            tempText2.y = tempText1.y + 60
            stage.addChild(shape)
            stage.addChild(tempText1);
            stage.addChild(tempText2);
            stage.addChild(_blackListText);
            stage.addEventListener("click", _blackListClick)
            
}

function _blackListClick()
{
     window.open("http://www.y8.com/games/"+s_gameName, "_blank");
}