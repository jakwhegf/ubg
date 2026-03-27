function logError(text, fatal) {
    console.error(text);

    if (typeof gtag === "function") {
        gtag('event', 'exception', {
            'description': text,
            'fatal': fatal // set to true if the error is fatal
        });
    }
}

// ------------------------------------------------------------------------------

var instantGamesInitialized = false;
var runtimeInitialized = false;

function tryToRun() {
    if (instantGamesInitialized === true && runtimeInitialized === true) {
        try {
            Module.callMain();
        } catch (error) {
            logError(error, true);
        }
    } else {
        setTimeout(function() {
            tryToRun();
        }, 500);
    }
}

window.onload = function() {
    tryToRun();
};

// ------------------------------------------------------------------------------

var UserInfo = {
    uid: "",
    name: "",
    photoUrl: "",
    lang: "en"
};

function updateUserInfo(details) {
    // console.log('login status: ' + JSON.stringify(details));

    UserInfo.uid = details.pid;
    UserInfo.name = details.nickname;
    UserInfo.photoUrl = document.location.protocol == 'https:'
        ? details.avatars.medium_secure_url
        : details.avatars.medium_url;
    UserInfo.lang = details.language;
}

function getLoginStatus(ptr) {
    ID.getLoginStatus(function(data) {
        if (data.status != 'not_linked' && data.authResponse) {
            updateUserInfo(data.authResponse.details);
            Module.ccall('onY8LoginStatus', 'null', ['number','number','string','string','string'], [ptr,true,UserInfo.uid,UserInfo.name,UserInfo.photoUrl]);
        } else {
            ID.login(function(response) {
                var isLogged = false;
                if (response) {
                    updateUserInfo(response.authResponse.details);
                    isLogged = true;
                }
                Module.ccall('onY8LoginStatus', 'null', ['number','number','string','string','string'], [ptr,isLogged,UserInfo.uid,UserInfo.name,UserInfo.photoUrl]);
            });
        }
    });
}

function doLogin(ptr) {
    ID.login(function(response) {
        var isLogged = false;
        if (response) {
            updateUserInfo(response.authResponse.details);
            isLogged = true;
        }
        Module.ccall('onY8Logged', 'null', ['number','number','string','string','string'], [ptr,isLogged,UserInfo.uid,UserInfo.name,UserInfo.photoUrl]);
    });
}

function showFullscreenAdv(mode, ptr) {
    ID.gameBreak(function() {
        // Ad skipped or finished
        Module.ccall('onY8AdsResult', 'null', ['number','string'], [ptr, mode]);
    });
}

// ------------------------------------------------------------------------------
// OFFLINE / KHÔNG CẦN ĐĂNG NHẬP Y8
// Gốc: tải sdk.js → ID.init → instantGamesInitialized. Offline SDK không load → game treo.
// Stub ID: chơi guest (không tài khoản), quảng cáo = bỏ qua ngay.
// ------------------------------------------------------------------------------

window.ID = {
    getLoginStatus: function(cb) {
        cb({ status: 'not_linked' });
    },
    login: function(cb) {
        cb(null);
    },
    gameBreak: function(cb) {
        cb();
    }
};

window.idAsyncInit = function() {};

// ------------------------------------------------------------------------------
// Khởi động WASM đúng thời điểm (sau .mem + initRuntime).
// KHÔNG dùng tồn tại của Module.callMain làm tín hiệu — callMain được gán sớm,
// còn bộ nhớ/heaps có thể chưa sẵn sàng → màn hình đen / lỗi.
// KHÔNG dùng onRuntimeInitialized: (function(){...})() — giá trị thuộc tính = undefined,
// Emscripten không gọi được; runtimeInitialized cũng bị true quá sớm (sai).
// ------------------------------------------------------------------------------

var Module = {
    noInitialRun: true,
    noExitRuntime: true,

    preRun: [],
    postRun: [],

    printErr: function(text) {
        if (arguments.length > 1) {
            text = Array.prototype.slice.call(arguments).join(' ');
        }

        logError(text, false);
    },

    onRuntimeInitialized: function() {
        runtimeInitialized = true;
        instantGamesInitialized = true;
    },

    canvas: (function() {
        var canvas = document.getElementById('canvas');
        return canvas;
    })(),

    setStatus: function(text) {},

    totalDependencies: 0,
    monitorRunDependencies: function(left) {}
};
