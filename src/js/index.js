(function () {
    delayTransitions();
    checkIfHidpi();
    checkIfHoverable();

    Page.$win
        .on('hashchange', preventDefault);

    Page.$html
        .on('slider.vertical slider.horizontal', function (event, data) {
            Page
                .setState('slide', data.id)
                .setState('type', data.type === 'dark' ? 'none' : 'dark')
                .setState('logo', data.id === 'collections' ? 'no' : 'yes');
        })
        .on('dragstart', '[draggable="false"]', preventDefault);



    function preventDefault(event) {
        event.preventDefault();
    }

    function delayTransitions() {
        setTimeout(function () {
            Page.delState('transition', 'no');
        }, 100);
    }

    function checkIfHidpi() {
        if (window.devicePixelRatio > 1.5) {
            Page.setState('hidpi');
        }
    }

    function checkIfHoverable() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            return;
        }

        Page.setState('hoverable');
    }
})();
