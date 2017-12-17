(function () {
    $('.philosophy-mobile')
        .each(function () {
            var $scope = $(this);
            var $items = $scope.find('.philosophy__content');

            $scope.append($items.first().clone());

            $items = $scope.find('.philosophy__content');

            var index = 0;
            var last = $items.length - 1;

            moveTo(index, true);

            Page.$html.on('slider.horizontal', function (event, data) {
                if (data.id !== 'philosophy' || !data.direction) {
                    return;
                }

                move(data.direction);
            });

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

                setTimeout(function () {
                    moveTo(index);
                }, 16);
            }

            function moveTo(newIndex, jump) {
                if (jump) {
                    $scope.addClass('philosophy-mobile_transition_no');
                }

                $items
                    .removeClass('philosophy__content_current')
                    .removeClass('philosophy__content_prev')
                    .removeClass('philosophy__content_next');


                $items.eq(newIndex).addClass('philosophy__content_current');
                $items.eq(getSiblingIndex(1)).addClass('philosophy__content_next');
                $items.eq(getSiblingIndex(-1)).addClass('philosophy__content_prev');

                setTimeout(function () {
                    $scope.removeClass('philosophy-mobile_transition_no');
                }, 16);
            }

            function getSiblingIndex(direction) {
                var temp = index + direction;

                switch (true) {
                    case temp > last:
                        return 1;
                    case temp < 0:
                        return last - 1;
                    default:
                        return temp;
                }
            }
        });
})();


