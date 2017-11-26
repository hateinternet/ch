(function () {
    $('.vertical-slider')
        .each(function () {
            var $slider = $(this);
            var $slides = $slider.find('.vertical-slide');

            var isScrolling = false;
            var scrollDuration = 500;
            var scrollStep = $slider.height();

            var index = 0;
            var last = $slides.length - 1;

            bindToWheel();
            bindToSwipe();
            $(window).on('resize', onResize);

            function bindToWheel() {
                new WheelIndicator({
                    elem: $slider[0],
                    callback: function (event) {
                        var direction = event.direction === 'up' ? -1 : 1;

                        move(direction);
                    }
                });
            }

            function bindToSwipe() {
                // var hammertime = new Hammer(document.body);
                //
                // hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
                //
                // Hammer(document.body).on('swipe', function (event) {
                //     console.log(event);
                // });
            }

            function onResize() {
                scrollStep = $slider.height();

                move(0, true);
            }

            function move(direction, jump) {
                if (isScrolling) {
                    return;
                }

                var tempIndex = getIndex(direction);

                if (index === tempIndex) {
                    return;
                }

                isScrolling = true;
                index = tempIndex;

                var position = index * scrollStep;
                var duration = jump ? 0 : scrollDuration;
                var slide = $slides.eq(index).data('slide');

                $slider.animate({ scrollTop: position }, duration, function () {
                    isScrolling = false;
                });

                !jump && Page.setState(slide);
            }

            function getIndex(direction) {
                var temp = index + direction;

                return temp < 0 || temp > last ? index : temp;
            }
        });
})();
