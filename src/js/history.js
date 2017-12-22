(function () {
    var PADDING = 140;
    var VELOCITY_BOUND = 3;

    $('.history')
        .each(function () {
            var swipeTriggered = false;
            var hoverable = Page.hasState('hoverable');

            var $scope = $(this);
            var $wrappers = $scope.find('.history__content-wrapper');

            var $titles = $scope.find('.history__title');
            var $texts = $scope.find('.history__text');
            $texts.data('state', 'start');

            hoverable && initScrollBars();
            hoverable || bindToPan();
            hoverable || bindToScroll();

            function initScrollBars() {
                $texts.mCustomScrollbar({
                    theme: 'minimal',
                    scrollInertia: 0,
                    callbacks: {
                        onScroll: function () {
                            var $this = $(this);

                            setTimeout(function () {
                                setStateData($this, this.mcs.topPct);
                            }.bind(this), 250);
                        }
                    }
                });
            }

            function bindToScroll() {
                $texts.on('scroll', onScroll);
                $wrappers.on('scroll', onScroll);
            }

            function onScroll() {
                var $this = $(this);

                var scrollTop = $this.scrollTop();
                var maxScrollTop = this.scrollHeight - this.clientHeight;

                var percent = scrollTop / maxScrollTop * 100;

                setStateData($this, percent);
            }

            function setStateData($elem, percent) {
                $elem.data('state', {
                    0: 'start',
                    100: 'end'
                }[percent] || '');
            }

            function bindToPan() {
                var hammertime = new Hammer($scope[0]);

                var $scrollElement = null;
                var initialScrollTop = null;

                hammertime
                    .get('pan')
                    .set({ direction: Hammer.DIRECTION_ALL });

                hammertime
                    .on('panstart', function (event) {
                        $scrollElement = $(event.target).closest('.history__content-wrapper');
                        initialScrollTop = $scrollElement.scrollTop();
                    })
                    .on('pan', function (event) {
                        $('.debug').text(event.deltaY);

                        if (swipeTriggered) {
                            return;
                        }

                        var state = $scrollElement.data('state');
                        var swipeDirection = getSwipeDirection(event, state);

                        if (!swipeDirection || swipeTriggered) {
                            if (
                                event.direction === Hammer.DIRECTION_UP ||
                                event.direction === Hammer.DIRECTION_DOWN
                            ) {
                                $scrollElement.scrollTop(initialScrollTop - event.deltaY);
                            }

                            return;
                        }

                        Page.$html.trigger('history.swipe', swipeDirection);

                        swipeTriggered = true;
                        setTimeout(function () {
                            swipeTriggered = false;
                        }, 1000);
                    })
                    .on('panend', function () {
                        $scrollElement = null;
                        initialScrollTop = null;
                    });
            }

            function getSwipeDirection(event, state) {
                var velocity = Math.abs(event.overallVelocity);
                var direction = event.direction;

                switch (true) {
                    case velocity < VELOCITY_BOUND:
                        return;
                    case direction === Hammer.DIRECTION_RIGHT:
                        return 'left';
                    case direction === Hammer.DIRECTION_LEFT:
                        return 'right';
                    case direction === Hammer.DIRECTION_DOWN && state === 'start':
                        return 'up';
                    case direction === Hammer.DIRECTION_UP && state === 'end':
                        return 'down';
                }
            }
        });
})();


