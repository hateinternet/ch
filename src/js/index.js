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

    setTimeout(function () {
        Page.delState('transition', 'no');
    }, 100);

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
})();
