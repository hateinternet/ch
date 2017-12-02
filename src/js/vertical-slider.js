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

            moveFromHash();
            bindToWin();
            bindToWheel();
            bindToSwipe();

            function moveFromHash() {
                var id = location.hash.slice(1);

                index = findIndexById(id);

                console.log(index);

                moveTo(index > -1 ? index : 0, true);
            }

            function bindToWin() {
                Page.$win
                    .on('resize', onResize)
                    .on('menu.click', onMenuClick);
            }

            function onResize() {
                scrollStep = $slider.height();

                move(0, true);
            }

            function onMenuClick(event, id) {
                var jump = Page.hasState('menu');

                index = findIndexById(id);

                moveTo(index > -1 ? index : 0, jump);
            }

            function findIndexById(id) {
                for (var i = 0; i < slides.length; i += 1) {
                    if (slides[i].id === id) {
                        return i;
                    }
                }

                return -1;
            }

            var isDown = false;
            var initY = 0;
            var initScroll = 0;
            var delta = 0;

            Page.$win
                .on('mousedown touchstart', function (event) {
                    if (isScrolling) {
                        return;
                    }

                    isDown = true;
                    initY = event.clientY;
                    initScroll = $slider.scrollTop();
                })
                .on('mousemove touchmove', function (event) {
                    if (isDown) {
                        delta = initY - event.clientY;

                        $slider.scrollTop(initScroll + delta);
                    }
                })
                .on('mouseup touchend', function () {
                    if (Math.abs(delta) > scrollStep / 10) {
                        move(delta > 0 ? 1 : -1);
                    } else {
                        moveTo(index);
                    }

                    isDown = false;
                });

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

            function moveTo(index, jump) {
                if (isScrolling) {
                    return;
                }

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
