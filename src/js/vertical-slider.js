(function () {
    $('.vertical-slider')
        .each(function () {
            var $slider = $(this);

            var isScrolling = false;
            var scrollDuration = 750;
            var scrollStep = null;

            var index = 0;
            var last = $slider.find('.vertical-slide').length - 1;

            bindToWheel();
            $(window).on('resize', onResize);
            onResize();

            function bindToWheel() {
                new WheelIndicator({
                    elem: document,
                    callback: function (event) {
                        var direction = event.direction === 'up' ? -1 : 1;

                        move(direction);
                    }
                });
            }

            function onResize() {
                scrollStep = $slider.height();

                move(0, true);
            }

            function move(direction, jump) {
                if (isScrolling) {
                    return;
                }

                isScrolling = true;
                index = getIndex(direction);

                var position = index * scrollStep;
                var duration = jump ? 0 : scrollDuration;

                $slider.animate({ scrollTop: position }, duration, function () {
                    isScrolling = false;
                });

                if (index) {
                    $('.header').addClass('header_dark');
                } else {
                    $('.header').removeClass('header_dark');
                }

            }

            function getIndex(direction) {
                var temp = index + direction;

                return temp < 0 || temp > last ? index : temp;
            }
        });
})();
