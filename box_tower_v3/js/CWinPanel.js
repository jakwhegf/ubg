function CWinPanel(oSpriteBg, bEnd) {

    var _oBg;
    var _oTitleTextStoke;
    var _oTitleText;
    var _oNewScoreTextStroke;
    var _oNewScoreText;
    var _oBestScoreTextStroke;
    var _oBestScoreText;
    var _oGroup;
    var _oButMenu;
    var _oButRestart;
    var _oFlagContainer;

    this._init = function (oSpriteBg) {
        var iSizeFontSecondaryText = 50;

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible = false;

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;
        _oGroup.addChild(oFade);

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oGroup.addChild(_oBg);

        _oTitleTextStoke = new createjs.Text("", "100px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oTitleTextStoke.x = CANVAS_WIDTH / 2;
        _oTitleTextStoke.y = 500;
        _oTitleTextStoke.textAlign = "center";
        _oTitleTextStoke.outline = 5;

        _oGroup.addChild(_oTitleTextStoke);

        _oTitleText = new createjs.Text("", "100px " + FONT_GAME, TEXT_COLOR);
        _oTitleText.x = CANVAS_WIDTH / 2;
        _oTitleText.y = _oTitleTextStoke.y;
        _oTitleText.textAlign = "center";

        _oGroup.addChild(_oTitleText);

        _oNewScoreTextStroke = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oNewScoreTextStroke.x = CANVAS_WIDTH / 2;
        _oNewScoreTextStroke.y = CANVAS_HEIGHT_HALF - 50;
        _oNewScoreTextStroke.textAlign = "center";
        _oNewScoreTextStroke.outline = 5;

        _oGroup.addChild(_oNewScoreTextStroke);

        _oNewScoreText = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR);
        _oNewScoreText.x = CANVAS_WIDTH / 2;
        _oNewScoreText.y = _oNewScoreTextStroke.y;
        _oNewScoreText.textAlign = "center";

        _oGroup.addChild(_oNewScoreText);

        _oBestScoreTextStroke = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oBestScoreTextStroke.x = CANVAS_WIDTH / 2;
        _oBestScoreTextStroke.y = CANVAS_HEIGHT_HALF + 30;
        _oBestScoreTextStroke.textAlign = "center";
        _oBestScoreTextStroke.outline = 5;

        _oGroup.addChild(_oBestScoreTextStroke);

        _oBestScoreText = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR);
        _oBestScoreText.x = CANVAS_WIDTH / 2;
        _oBestScoreText.y = _oBestScoreTextStroke.y;
        _oBestScoreText.textAlign = "center";

        _oGroup.addChild(_oBestScoreText);

        var oSpriteButRestart = s_oSpriteLibrary.getSprite("but_restart");
        _oButRestart = new CGfxButton(CANVAS_WIDTH * 0.5 + 290, CANVAS_HEIGHT * 0.5 + 160, oSpriteButRestart, _oGroup);
        _oButRestart.pulseAnimation();
        _oButRestart.addEventListener(ON_MOUSE_DOWN, this._onRestart, this);

        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_home");
        _oButMenu = new CGfxButton(CANVAS_WIDTH * 0.5 - 290, CANVAS_HEIGHT * 0.5 + 160, oSpriteButHome, _oGroup);
        _oButMenu.addEventListener(ON_MOUSE_DOWN, this._onExit, this);

        _oFlagContainer = new createjs.Container();

        _oGroup.addChild(_oFlagContainer);

        _oGroup.on("click", function () {});

        s_oStage.addChild(_oGroup);
        
        if(s_isLogin === false)
            {
                this.createSubmitScoreBtn()
            }
            else
            {
                this.createLeaderboardBtn()
            }
            s_oMain.createY8Logo("g_menulogo", CANVAS_WIDTH/2, CANVAS_HEIGHT/2+320)
            try {
            console.log('Showing Ads')
            showNextAd()
            }
            catch (e) {
                console.log(e + ' Error Showing Ads')
                showMessage()
            }
            
    };

    this.unload = function () {
        _oGroup.removeAllEventListeners();
        s_oStage.removeChild(_oGroup);
        if (_oButMenu) {
            _oButMenu.unload();
            _oButMenu = null;
        }

        if (_oButRestart) {
            _oButRestart.unload();
            _oButRestart = null;
        }
        
        if(s_isLogin === false)
        {
              _oLeaderboardBtn1.unload();
        }
        else
        {
              _oLeaderboardBtn.unload();
         }  
         s_oMain.removeY8Logo()
    };
    
    this.createSubmitScoreBtn = function()
    {
        var oSprite = s_oSpriteLibrary.getSprite('but_submit_score');
        _pLeaderboardBtn = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT/2 + 160};            
       _oLeaderboardBtn1 = new CGfxButton(_pLeaderboardBtn.x,_pLeaderboardBtn.y,oSprite, _oGroup);
       _oLeaderboardBtn1.addEventListener(ON_MOUSE_UP, this._showLeaderboard, this);
    }
    this.createLeaderboardBtn = function()
    {
        var oSprite = s_oSpriteLibrary.getSprite('but_leaderboard_End');
        _pLeaderboardBtn = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT/2 + 160};            
       _oLeaderboardBtn = new CGfxButton(_pLeaderboardBtn.x,_pLeaderboardBtn.y,oSprite, _oGroup);
       _oLeaderboardBtn.addEventListener(ON_MOUSE_UP, this._showLeaderboard, this);
    }
    
    this._showLeaderboard = function()
    {
        console.log('_showLeaderboard')
        if(s_isLogin === false)
        {
            this._onLoginClicked()
        }
        else
        {
            ID.GameAPI.Leaderboards.list({table:'Leaderboard'})
        } 
    }
    
    this._onLoginClicked = function () {
            ID.login(this.idCallback);
    };
    
    this.idCallback = function(response){
          if (response) {
          if(response.status === 'ok')
           {
              _oLeaderboardBtn1.unload()
               s_gameOver.createLeaderboardBtn()
              s_oMain.getUserName(response.authResponse.details.nickname, true)
               console.log('idCallback s_iScore ' + s_iScore)
              s_oMain.submitScore(s_iScore)
           }
           else
           {
             ID.login(this.idCallback);
           }
         }
     }

    this.show = function (iScore) {
        s_iScore = iScore;
        s_oMain.submitScore(s_iScore)
        _oTitleTextStoke.text = TEXT_GAMEOVER;
        _oTitleText.text = TEXT_GAMEOVER;

        _oNewScoreTextStroke.text = TEXT_SCORE + ": " + iScore;
        _oNewScoreText.text = TEXT_SCORE + ": " + iScore;

        _oBestScoreTextStroke.text = TEXT_BEST_SCORE + ": " + s_iBestScore;
        _oBestScoreText.text = TEXT_BEST_SCORE + ": " + s_iBestScore;

        _oGroup.visible = true;

        createjs.Tween.get(_oGroup).wait(MS_WAIT_SHOW_GAME_OVER_PANEL).to({alpha: 1}, 1250, createjs.Ease.cubicOut).call(function () {
            if (s_oAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_oAdsLevel = 1;
            } else {
                s_oAdsLevel++;
            }
        });
        s_oMain.ShowY8Anim(true)
        $(s_oMain).trigger("save_score", iScore);
        $(s_oMain).trigger("share_event", iScore);
    };

    this._onContinue = function () {
        var oParent = this;
        createjs.Tween.get(_oGroup, {override: true}).to({alpha: 0}, 750, createjs.Ease.cubicOut).call(function () {
            oParent.unload();
        });

        _oButContinue.block(true);
        _oButMenu.block(true);
        s_oGame.onContinue();
    };

    this._onRestart = function () {
        _oButRestart.block(true);
            this.unload();
            s_oGame.restartGame();
    };

    this._onExit = function () {

        this.unload();

        s_oGame.onExit();
    };

    this._init(oSpriteBg, bEnd);
    s_gameOver = this;
    return this;
}

var s_gameOver;