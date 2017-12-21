(function () {
    var PADDING = 140;
    var VELOCITY_BOUND = 3;

    $('.history')
        .each(function () {
            var panTriggered = false;
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

                $wrappers.each(function () {
                    hammertime
                        .get('pan')
                        .set({ direction: Hammer.DIRECTION_ALL });

                    hammertime
                        .on('pan', function (event) {
                            if (panTriggered) {
                                return;
                            }

                            var $elem = $(event.target).closest('.history__content-wrapper');
                            var state = $elem.data('state');

                            var direction = getDirection(event, state);

                            if (direction) {
                                Page.$html.trigger('history.move', direction);

                                panTriggered = true;
                                setTimeout(function () {
                                    panTriggered = false;
                                }, 1000);
                            }
                        })
                })
            }

            function getDirection(event, state) {
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


