(function () {
    $('.history')
        .each(function () {
            var $scope = $(this);

            var $titles = $scope.find('.history__title');
            var $texts = $scope.find('.history__text');

            var padding = 160;

            initScrollBars();
            bindToWin();

            function initScrollBars() {
                $texts.mCustomScrollbar({
                    theme: 'minimal',
                    scrollInertia: 500,
                    callbacks: {
                        onScroll: function () {
                            this.dataset.state = {
                                0: 'start',
                                100: 'end'
                            }[this.mcs.topPct];
                        }
                    }
                });
            }

            function bindToWin() {
                Page.$win.on('resize', function () {
                    if (this.innerWidth > 767) {
                        $texts.attr('style', '');

                        return;
                    }

                    var imageHeight = $scope.find('.history__image-wrapper').eq(0).height();
                    var windowHeight = this.innerHeight;

                    $texts.each(function (index) {
                        var $text = $(this);

                        var titleHeight = $titles.eq(index).height();
                        var height = windowHeight - imageHeight - titleHeight - padding;

                        $text
                            .height(height)
                            .mCustomScrollbar('update');
                    });
                }).resize();
            }
        });
})();


