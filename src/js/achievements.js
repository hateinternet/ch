(function () {
    var BREAKPOINT = 520;
    var PADDING = 130;

    $('.achievements')
        .each(function () {
            var $scope = $(this);

            var $contents = $scope.find('.achievements__content');
            var $titles = $scope.find('.achievements__title-wrapper');
            var $images = $scope.find('.achievements__jewellery-image');
            var $diplomas = $scope.find('.achievements__diploma');

            Page.$win.on('resize orientationchange', onResize);
            setTimeout(Page.$win.resize.bind(Page.$win), 100);

            $('.page_hoverable')
                .on('mouseenter mouseleave', '.gallery-open', onHover);

            function onResize() {
                if (window.innerHeight > BREAKPOINT) {
                    return clearStyles();
                }

                $contents.each(styleContent);
            }

            function styleContent() {
                $contents.each(function (index) {
                    var $content = $(this);

                    var titleHeight = $titles.eq(index).height();
                    var imageHeight = $images.eq(index).height();

                    var height = window.innerHeight - titleHeight - imageHeight - PADDING;

                    $content.height(height);
                    $diplomas.eq(index).height(height);
                });
            }

            function clearStyles() {
                $contents.attr('style', '');
                $diplomas.attr('style', '');
            }

            function onHover(event) {
                var $scope = $(this).closest('.achievements__slide');
                var needClass = event.type === 'mouseenter';

                $scope.toggleClass('gallery-open_hovered', needClass);
            }
        });
})();


