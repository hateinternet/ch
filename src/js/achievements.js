(function () {
    $('.achievements')
        .each(function () {
            var $scope = $(this);

            var padding = 160;

            var $contents = $scope.find('.achievements__content');
            var $titles = $scope.find('.achievements__title-wrapper');
            var $images = $scope.find('.achievements__jewellery-image');
            var $diplomas = $scope.find('.achievements__diploma');

            Page.$win.on('resize', function () {
                if (this.innerHeight > 520) {
                    $contents.attr('style', '');
                    $diplomas.attr('style', '');

                    return;
                }

                var scopeHeight = $scope.height();

                $contents.each(function (index) {
                    var $content = $(this);

                    var titleHeight = $titles.eq(index).height();
                    var imageHeight = $images.eq(index).height();

                    var height = scopeHeight - padding - titleHeight - imageHeight;

                    $content.height(height);
                    $diplomas.eq(index).height(height);
                });
            }).resize();
        });
})();


