(function () {
    var SCROLL_DURATION = 1000;

    $('.achievements, .history')
        .each(function () {
            var $scope = $(this);
            var $wrapper = $scope.find('.horizontal-slider__list-wrapper');
            var $slides = $wrapper.find('.horizontal-slide');
            var $btns = $scope.find('.arrow-button');

            var scrollStep = $slides.eq(0).innerWidth();

            var last = $slides.length - 1;
            var index = $slides.filter('.horizontal-slide_current').index();

            var id = $scope.data('id');

            moveTo(index > -1 ? index : 0, true);

            bindCommonEvents();
            bindToSwipe();

            function bindCommonEvents() {
                $btns
                    .on('click', onArrowClick);

                Page.$win
                    .on('resize', onResize)
                    .on('slider.vertical', onVerticalSliderChange)
                    .on('timeline.click', onTimelineClick);
            }

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
                var direction = $(event.target).closest('.arrow-button').hasClass('arrow-button_next') ? 1 : -1;

                move(direction);
            }

            function updateBtns() {
                $btns
                    .eq(0).prop('disabled', index === 0)
                    .end()
                    .eq(1).prop('disabled', index === last);
            }

            function onResize() {
                scrollStep = $slides.eq(0).innerWidth();

                moveTo(index, true);
            }

            function move(direction) {
                var temp = index + direction;

                if (temp <= last && temp >= 0) {
                    moveTo(temp);
                }
            }

            function moveTo(newIndex, jump) {
                index = newIndex;

                var position = index * scrollStep;
                var duration = jump ? 0 : SCROLL_DURATION;

                $wrapper
                    .stop()
                    .animate({ scrollLeft: position }, duration);

                updateBtns();
                setCurrent();
                setType();
                triggerEvent();
            }

            function setCurrent() {
                $slides
                    .removeClass('horizontal-slide_current')
                    .eq(index)
                    .addClass('horizontal-slide_current');
            }

            function setType() {
                var type = $slides.eq(index).data('type');

                $scope[type === 'dark' ? 'addClass' : 'removeClass']('horizontal-slider_type_dark');
            }

            function triggerEvent() {
                Page.$html.trigger('slider.horizontal', {
                    id: id,
                    type: $slides.eq(index).data('type'),
                    index: index
                });
            }

            function onVerticalSliderChange() {
                if (Page.slide === id) {
                    triggerEvent();
                }
            }

            function onTimelineClick(event, data) {
                data.id === id && moveTo(data.index);
            }
        });
})();


