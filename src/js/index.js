(function () {
    if (!window.ontouchstart && !navigator.maxTouchPoints) {
        Page.setState('hoverable');
    }

    if (window.devicePixelRatio > 1.5) {
        Page.setState('hidpi');
    }

    window.onhashchange = function (event) {
        event.preventDefault();
    };

    Page.$html
        .on('slider.vertical slider.horizontal', function (event, data) {
            Page
                .setState('slide', data.id)
                .setState('type', data.type === 'dark' ? 'none' : 'dark')
                .setState('logo', data.id === 'collections' ? 'no' : 'yes');
        })
        .on('menu', function (event) {
            switch (event.namespace) {
                case 'show':
                    return Page.setState('menu');
                case 'click':
                case 'hide':
                    return Page.delState('menu');
            }
        })
        .on('dragstart', '[draggable="false"]', function (event) {
              event.preventDefault();
        });

    function calcVH() {
        var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.body.setAttribute("style", "height:" + vH + "px;");
    }
    calcVH();
    window.addEventListener('onorientationchange', calcVH, true);
    window.addEventListener('resize', calcVH, true);
})();
