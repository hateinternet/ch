(function () {
    var BREAKPOINT = 768;

    $('.history')
        .each(function () {
            var hoverable = Page.hasState('hoverable');

            var $scope = $(this);
            var $wrappers = $scope.find('.history__content-wrapper');
            var $texts = $scope.find('.history__text');

            if (hoverable) {
                initScrollBars()
            } else {
                bindToPan();
                bindToScroll();
                bindToWin();
            }

            setStateData(0);

            function initScrollBars() {
                $texts
                    .mCustomScrollbar({
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
                $texts.on('scroll', onScroll).scroll();
                $wrappers.on('scroll', onScroll).scroll();
            }

            function onScroll() {
                var scrollTop = $(this).scrollTop();
                var maxScrollTop = this.scrollHeight - this.clientHeight;

                var percent = maxScrollTop > 0 ? scrollTop / maxScrollTop * 100 : null;

                setStateData(this, percent);
            }

            function setStateData(elem, percent) {
                var state = getState(percent);
                var $slide = $(elem).closest('.history__slide');

                setTimeout(function () {
                    $slide.data('state', state);
                }.bind(this), 500);
            }

            function getState(percent) {
                switch (percent) {
                    case null:
                        return 'short';
                    case 0:
                        return 'start';
                    case 100:
                        return 'end';
                    default:
                        return 'middle';
                }
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
                        var selector = window.innerWidth >= BREAKPOINT ?
                            '.history__text' :
                            '.history__content-wrapper';

                        $scrollElement = $(event.target).closest(selector);
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

            function bindToWin() {
                Page.$win.on('resize orientationchange', function () {
                    $texts.scroll();
                    $wrappers.scroll();
                })
            }
        });
})();


