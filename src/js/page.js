var Page = {
    $win: $(window),
    $doc: $(document),
    $html: $('html'),
    $body: $('body'),
    $header: $('.header'),

    scrollTo: _scrollTo,
    scrollDuration: 700,
    scrollTop: 0,

    calcPosition: _calcPosition,
    setModal: _setModal,
    scrollBarWidth: (function () {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);

        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild(outer);

        return (w1 - w2);
    })()
};

function _scrollTo(pos, duration) {
    var $scrollElem = $('html, body');

    if ($scrollElem.is(':animated')) {
        $scrollElem.stop();
    }

    $.Deferred(function (promise) {
        $scrollElem.animate(
            { scrollTop: pos },
            typeof duration === 'number' ? duration : Page.scrollDuration,
            promise.resolve
        );
    })
}

function _calcPosition(elem, offset) {
    offset = typeof offset === 'number' ? offset : 10;

    return $(elem).offset().top + -Page.scrollOffset() - offset;
}

function _setModal(yes) {
    Page.$html.toggleClassIf(yes, 'page_modal');

    if (document.body.scrollHeight > document.body.clientHeight) {
        var offset = yes ? Page.scrollBarWidth : 0;

        Page.$body.css('margin-right', offset);
        Page.$header.css('right', offset);
    }

    return Page;
}

$.fn.toggleClassIf = function (condition, className) {
    return $(this)[condition ? 'addClass' : 'removeClass'](className);
};

(function () {
    (function detectFeatures() {
        var hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints;

        Page.$html
            .toggleClassIf(window.devicePixelRatio > 1.5, 'page_hidpi')
            .toggleClassIf(!hasTouch, 'page_hoverable');
    })();

    Page.$html.on('click', '.header__burger, .header__close', function onBurgerClick() {
        Page.$html.toggleClass('page_menu');
    });
})();

(function () {
    var gallery = document.querySelector('.gallery');
    var galleryCloseBtn = document.querySelector('.gallery__close-button');
    galleryCloseBtn.addEventListener('click', function () {
        gallery.style.display = 'none';
    });
})();
