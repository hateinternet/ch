(function () {
    $('.vertical-slider')
        .each(function () {
            var $slider = $(this);
            var $slides = $slider.find('.vertical-slide');

            var isScrolling = false;
            var scrollDuration = 500;
            var scrollStep = $slider.height();

            var index = -1;
            var last = $slides.length - 1;
            var slides = $slides
                .toArray()
                .map(function (slide) {
                    return {
                        id: slide.dataset.id,
                        type: slide.dataset.type
                    };
                });

            function calcVH() {
                var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                document.body.setAttribute("style", "height:" + vH + "px;");
            }
            calcVH();
            window.addEventListener('onorientationchange', calcVH, true);
            window.addEventListener('resize', calcVH, true);

            moveFromHash();
            bindToWin();
            bindToWheel();
            bindToSwipe();

            function moveFromHash() {
                var id = location.hash.slice(1);
                var newIndex = findIndexById(id);

                moveTo(newIndex > -1 ? newIndex : 0, true);
            }

            function bindToWin() {
                Page.$win
                    .on('resize', onResize)
                    .on('menu.click', onMenuClick);
            }

            function onResize() {
                scrollStep = $slider.height();

                moveTo(index, true);
            }

            function onMenuClick(event, data) {
                var newIndex = findIndexById(data.id);

                moveTo(newIndex, data.jump);
            }

            function findIndexById(id) {
                for (var i = 0; i < slides.length; i += 1) {
                    if (slides[i].id === id) {
                        return i;
                    }
                }

                return -1;
            }

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
                var hammertime = new Hammer($slider[0]);

                hammertime
                    .get('swipe')
                    .set({ direction: Hammer.DIRECTION_VERTICAL });

                hammertime.on('swipe', function(event) {
                    switch (event.direction) {
                        case Hammer.DIRECTION_DOWN:
                            return move(-1);
                        case Hammer.DIRECTION_UP:
                            return move(1);
                    }
                });
            }

            function move(direction) {
                var tempIndex = getIndex(direction);

                if (index !== tempIndex) {
                    index = tempIndex;

                    moveTo(index);
                }
            }

            function getIndex(direction) {
                var temp = index + direction;

                return temp < 0 || temp > last ? index : temp;
            }

            function moveTo(newIndex, jump) {
                if (isScrolling) {
                    return;
                }

                index = newIndex;
                isScrolling = true;

                var position = index * scrollStep;
                var duration = jump ? 0 : scrollDuration;

                $slider.animate({ scrollTop: position }, duration, function () {
                    isScrolling = false;
                });

                Page.$html.trigger('slider.vertical', slides[index]);
            }
        });
})();
