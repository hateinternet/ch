(function () {
    Page.setState('js');

    delayTransitions();
    checkIfHidpi();
    checkIfHoverable();

    Page.$win
        .on('hashchange', preventDefault);

    Page.$html
        .on('slider.horizontal', function (event, data) {
            if (Page.slide !== data.id) {
                return;
            }

            Page.setState('type', data.type === 'dark' ? 'none' : 'dark');
        })
        .on('slider.vertical', function (event, data) {
            Page
                .setState('type', data.type === 'dark' ? 'none' : 'dark')
                .setState('slide', data.id)
                .delState('menu');
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
