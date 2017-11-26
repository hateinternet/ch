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
            var index = 0;

            updateBtns(index);

            $btns.on('click', onArrowClick);
            Page.$win.on('resize', onResize);

            function onArrowClick(event) {
                var direction = $(event.target).closest('.arrow-button').hasClass('arrow-button_next') ? 1 : -1;
                var temp = index + direction;

                if (temp <= last && temp >= 0) {
                    index = temp;

                    updateBtns(index);
                    moveTo(index);
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

                moveTo(index, true);
            }

            function moveTo(index, jump) {
                var position = index * scrollStep;
                var duration = jump ? 0 : scrollDuration;

                $wrapper.animate({ scrollLeft: position }, duration);

                var slide = $scope.data('slide');
                var type = $slides.eq(index).data('type') || null;

                Page.setState(slide, type);
            }
        });
})();


