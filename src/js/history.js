(function () {
    var PADDING = 140;
    var X_VELOCITY_BOUND = 3;
    var Y_VELOCITY_BOUND = 2;

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
                            setStateData(this, this.mcs.topPct);
                        }
                    }
                });
            }

            function bindToScroll() {
                $texts.on('scroll', onScroll);
                $wrappers.on('scroll', onScroll);
            }

            function onScroll() {
                var scrollTop = $(this).scrollTop();
                var maxScrollTop = this.scrollHeight - this.clientHeight;

                var percent = scrollTop / maxScrollTop * 100;

                setStateData(this, percent);
            }

            function setStateData(elem, percent) {
                var state = { 0: 'start', 100: 'end' }[percent] || 'middle';

                setTimeout(function () {
                    $(elem)
                        .closest('.history__slide')
                        .data('state', state);
                }.bind(this), 500);
            }

            function getState(elem) {
                return $(elem)
                    .closest('.history__slide')
                    .data('state');
            }

            function bindToPan() {
                var hammertime = new Hammer($scope[0]);

                var $scrollElement = null;
                var initialScrollTop = null;

                hammertime
                    .get('pan')
                    .set({ direction: Hammer.DIRECTION_VERTICAL });

                hammertime
                    .on('panstart', function (event) {
                        $scrollElement = $(event.target).closest('.history__content-wrapper');
                        initialScrollTop = $scrollElement.scrollTop();
                    })
                    .on('pan', function (event) {
                        $scrollElement.scrollTop(initialScrollTop - event.deltaY);
                    })
                    .on('panend', function () {
                        $scrollElement = null;
                        initialScrollTop = null;
                    });
            }
        });
})();


