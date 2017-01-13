var isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    animEndEventName = whichAnimationEvent();



function whichAnimationEvent() {
    var a,
        el = document.createElement('surface'),
        animations = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        }

    for (a in animations) {
        if (el.style[a] !== undefined) {
            return animations[a];
        }
    }
}

function nextPage($currPage, $nextPage) {

    if (isAnimating) {
        return false;
    }

    isAnimating = true;


    var outClass = 'page-rotateCubeLeftOut page-ontop',
        inClass = 'page-rotateCubeLeftIn';
    $nextPage.addClass('page-current');
    $currPage.addClass(outClass).on(animEndEventName, function() {
        $currPage.off(animEndEventName);
        endCurrPage = true;

        if (endNextPage) {
            onEndAnimation($currPage, $nextPage);
        }
    });

    $nextPage.addClass(inClass).on(animEndEventName, function() {
        $nextPage.off(animEndEventName);
        endNextPage = true;

        if (endCurrPage) {
            onEndAnimation($currPage, $nextPage);
        }
    });



}

function onEndAnimation($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    resetPage($outpage, $inpage);
    isAnimating = false;
}

function resetPage($outpage, $inpage) {
    $outpage.removeClass("page-current page-rotateCubeLeftOut page-ontop");
    $inpage.removeClass("page-rotateCubeLeftIn");

}
