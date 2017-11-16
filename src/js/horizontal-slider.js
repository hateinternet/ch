(function () {
    $('.horizontal-slider')
        .each(function () {
            var $scope = $(this);
            var $wrapper = $scope.find('.horizontal-slider__list-wrapper');
            var $slides = $wrapper.find('.horizontal-slide');
            var last = $slides.length - 1;

            var isInfinite = $scope.hasClass('horizontal-slider_infinite');

            if (isInfinite) {
                $wrapper.find('.horizontal-slider__list').append($slides.eq(0).clone());

                last += 2;
            }

            var scrollDuration = 750;
            var scrollStep = 0;

            var index = 0;

            $scope.on('click', '.arrow-button', onArrowClick);
            $(window).on('resize', onResize);
            onResize();

            function onArrowClick(event) {
                var direction = $(event.target).hasClass('arrow-button_next') ? 1 : -1;
                var temp = index + direction;

                isInfinite ? handleInfinite(temp) : handleFinite(temp);

                console.log(index);
            }

            function handleInfinite(temp) {
                if (temp > last - 1) {
                    moveTo(0, true);

                    temp = 1;
                } else if (temp < 0) {
                    moveTo(last, true);

                    temp = last - 2;
                }

                index = temp;

                moveTo(index);
            }

            function handleFinite(temp) {
                if (temp <= last && temp >= 0) {
                    index = temp;

                    moveTo(index);
                }
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


