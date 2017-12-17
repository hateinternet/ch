(function () {
    var SCROLL_DURATION = 1000;
    var AUTOCHANGE_DURATION = 8000;

    $('.philosophy .horizontal-slider')
        .each(function () {
            var $scope = $(this);
            var $wrapper = $scope.find('.horizontal-slider__list-wrapper');
            var $slides = $wrapper
                .find('.horizontal-slide')
                .map(function (index) {
                    this.dataset.id = index;

                    return this;
                });
            var $first = $slides.eq(0).clone();

            var timeout = null;

            $wrapper.find('.horizontal-slider__list').append($first);

            var scrollStep = $wrapper.eq(0).width();

            var last = $slides.length;
            var index = -1;
            var direction = null;

            $scope.on('click', '.arrow-button', onArrowClick);
            $(window).on('resize', onResize);
            bindToSwipe();

            move(1);

            function bindToSwipe() {
                if (Page.hasState('hoverable')) {
                    return;
                }

                var hammertime = new Hammer($scope[0]);

                hammertime
                    .get('swipe')
                    .set({ direction: Hammer.DIRECTION_HORIZONTAL });

                hammertime.on('swipe', function(event) {
                    switch (event.direction) {
                        case Hammer.DIRECTION_RIGHT:
                            return move(-1);
                        case Hammer.DIRECTION_LEFT:
                            return move(1);
                    }
                });
            }

            function onArrowClick(event) {
                if ($wrapper.is(':animated')) {
                    return;
                }

                var newDirection = $(event.target).hasClass('arrow-button_next') ? 1 : -1;

                move(newDirection);
            }

            function onResize() {
                scrollStep = $wrapper.eq(0).width();

                moveTo(index, true);
            }

            function move(newDirection) {
                direction = newDirection;

                var temp = index + direction;

                if (temp > last) {
                    moveTo(0, true);

                    temp = 1;
                } else if (temp < 0) {
                    moveTo(last, true);

                    temp = last - 1;
                }

                index = temp;

                moveTo(index);
                removeCurrent();
                resetAutochangeTimeout();
                setCurrent(index === last ? 0 : index);
            }

            function moveTo(index, jump) {
                var position = index * scrollStep;
                var duration = jump ? 0 : SCROLL_DURATION;

                $wrapper.animate({ scrollLeft: position }, duration);

                Page.$html.trigger('slider.horizontal', {
                    id: 'philosophy',
                    index: index,
                    type: 'dark',
                    direction: direction
                });

                direction = null;
            }

            function removeCurrent() {
                $wrapper
                    .find('.horizontal-slide_current')
                    .removeClass('horizontal-slide_current');
            }

            function setCurrent(index) {
                $wrapper
                    .find('.horizontal-slide[data-id=' + index + ']')
                    .addClass('horizontal-slide_current');
            }

            function resetAutochangeTimeout() {
                // clearTimeout(timeout);
                // timeout = setTimeout(move.bind(null, 1), AUTOCHANGE_DURATION);
            }
        });
})();


