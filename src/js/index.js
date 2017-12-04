(function () {
    (function checkIfHoverable() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            return;
        }

        Page.setState('hoverable');
    })();

    if (window.devicePixelRatio > 1.5) {
        Page.setState('hidpi');
    }

    setTimeout(function () {
        Page.delState('transition', 'no');
    }, 100);

    Page.$win
        .on('hashchange', function (event) {
            event.preventDefault();
        });

    Page.$html
        .on('slider.vertical slider.horizontal', function (event, data) {
            Page
                .setState('slide', data.id)
                .setState('type', data.type === 'dark' ? 'none' : 'dark')
                .setState('logo', data.id === 'collections' ? 'no' : 'yes');
        })
        .on('dragstart', '[draggable="false"]', function (event) {
              event.preventDefault();
        });
})();
