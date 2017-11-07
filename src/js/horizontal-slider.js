(function () {
    $('.horizontal-slider')
        .each(function () {
            var $scope = $(this);
            var $wrapper = $scope.find('.horizontal-slider__list-wrapper');
            var $slides = $wrapper.find('.horizontal-slide');

            $wrapper.find('.horizontal-slider__list').append($slides.eq(0).clone());

            var scrollDuration = 750;
            var scrollStep = 0;

            var index = 0;
            var last = $slides.length + 1;

            $scope.on('click', '.arrow-button', onArrowClick);
            $(window).on('resize', onResize);
            onResize();

            function onArrowClick(event) {
                var direction =  $(event.target).hasClass('arrow-button_next') ? 1 : -1;

                index = index + direction;

                if (index > last - 1) {
                    moveTo(0, true);

                    index = 1;
                } else if (index < 0) {
                    moveTo(last, true);

                    index = last - 2;
                }

                moveTo(index);
            }

            function onResize() {
                scrollStep = $slides.eq(0).width();

                moveTo(index, true);
            }

            function moveTo(index, jump) {

                var position = index * scrollStep;
                var duration = jump ? 0 : scrollDuration;

                $wrapper.animate({ scrollLeft: position }, duration);
            }
        });
})();


