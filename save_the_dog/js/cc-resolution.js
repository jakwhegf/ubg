window.resolution = (function (exports) {
    class Resolution {
        constructor() {
            this.scaleX = 1;
            this.scaleY = 1;
            this.loadNum = 0;
        }

        init(designWidth, designHeight, cb = new Function()) {
            this.designWidth = designWidth / 2;
            this.designHeight = designHeight / 2;
            this.container = document.querySelector("#Game");
            window.addEventListener("resize", () => {
                this.resize();
            });
            window.addEventListener("orientationchange", (e) => {
                this.resize();
            });
            setTimeout(() => {
                this.resize();
                cb && cb();
            }, 0.05e3);

        }

        get clientWidth() {
            return window.innerWidth || document.body.clientWidth;
        }
        get clientHeight() {
            return window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        }

        isMobile() {
            const ua = navigator.userAgent.toLowerCase();
            return /iphone|ipod|ipad|android|mobile|blackberry|iemobile|opera mini/.test(ua)
                || window.innerWidth <= 768;
        }

        resize() {
            if (this.isMobile()) {
                return;
            }
            var scaleX = this.clientWidth / this.designWidth;
            var scaleY = this.clientHeight / this.designHeight;
            var canvasWidth = this.designWidth;
            var canvasHeight = this.designHeight;
            var canvasStyle = this.container.style;
            scaleX = scaleY = Math.min(scaleX, scaleY);
            canvasWidth = Math.ceil(this.designWidth * scaleX);
            canvasHeight = Math.ceil(this.designHeight * scaleY);
            canvasStyle.width = canvasWidth + 1 + "px";
            canvasStyle.height = canvasHeight + "px";



        }

    }
    return new Resolution();
}({}));





