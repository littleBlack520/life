//<meta name="viewport" content="initial-scale=1,maximum-scale=1, minimum-scale=1">
(function() {
    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        setFontSize = function() {
            var clientWidth = docEl.clientWidth;
            if (clientWidth > 640) {
                clientWidth = 640;
            }
            docEl.style.fontSize = (clientWidth / 6.4) + 'px';
        };
    setFontSize();
    window.addEventListener(resizeEvt, setFontSize, false);
})();
