(function () {
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

            $wrapper.find('.horizontal-slider__list').append($first);

            var scrollDuration = 500;
            var scrollStep = $wrapper.eq(0).width();

            var last = $slides.length;
            var index = 0;

            $scope.on('click', '.arrow-button', onArrowClick);
            $(window).on('resize', onResize);
            bindToSwipe();

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

                var direction = $(event.target).hasClass('arrow-button_next') ? 1 : -1;

                move(direction);
            }

            function onResize() {
                scrollStep = $wrapper.eq(0).width();

                moveTo(index, true);
            }

            function move(direction) {
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
                setCurrent(index === last ? 0 : index);
            }

            function moveTo(index, jump) {
                var position = index * scrollStep;
                var duration = jump ? 0 : scrollDuration;

                $wrapper.animate({ scrollLeft: position }, duration);
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
        });
})();


