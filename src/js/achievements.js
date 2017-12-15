(function () {
    var BREAKPOINT = 520;
    var PADDING = 160;

    $('.achievements')
        .each(function () {
            var $scope = $(this);

            var $contents = $scope.find('.achievements__content');
            var $titles = $scope.find('.achievements__title-wrapper');
            var $images = $scope.find('.achievements__jewellery-image');
            var $diplomas = $scope.find('.achievements__diploma');

            Page.$win
                .on('resize orientationchange', onResize)
                .resize();

            function onResize() {
                if (window.innerHeight > BREAKPOINT) {
                    return clearStyles();
                }

                $contents.forEach(styleContent);
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
        });
})();


