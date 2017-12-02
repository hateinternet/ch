(function () {
    $('.achievements, .history')
        .each(function () {
            var $scope = $(this);
            var $wrapper = $scope.find('.horizontal-slider__list-wrapper');
            var $slides = $wrapper.find('.horizontal-slide');
            var $btns = $scope.find('.arrow-button');

            var scrollDuration = 500;
            var scrollStep = $slides.eq(0).width();

            var last = $slides.length - 1;
            var index = -1;

            var id = $scope.data('id');

            moveTo(0);

            $btns.on('click', onArrowClick);

            Page.$win
                .on('resize', onResize)
                .on('slider.vertical', onVerticalSliderChange)
                .on('timeline.click', onTimelineClick);

            function onArrowClick(event) {
                var direction = $(event.target).closest('.arrow-button').hasClass('arrow-button_next') ? 1 : -1;
                var temp = index + direction;

                if (temp <= last && temp >= 0) {
                    moveTo(temp);
                }
            }

            function updateBtns() {
                $btns
                    .eq(0).prop('disabled', index === 0)
                    .end()
                    .eq(1).prop('disabled', index === last);
            }

            function onResize() {
                scrollStep = $slides.eq(0).width();

                if (Page.slide === id) {
                    moveTo(index, true);
                }
            }

            function moveTo(newIndex, jump) {
                if (index === newIndex) {
                    return;
                }

                index = newIndex;

                var position = index * scrollStep;
                var duration = jump ? 0 : scrollDuration;

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

                $scope[type === 'dark' ? 'addClass' : 'removeClass']('horizontal-slider__type_dark');
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


