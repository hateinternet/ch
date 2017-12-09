(function () {
    $('.history')
        .each(function () {
            var $scope = $(this);

            var $titles = $scope.find('.history__title');
            var $texts = $scope.find('.history__text');

            var padding = 160;
            var imageHeight = $scope.find('.history__image-wrapper').eq(0).height();

            Page.$win.on('resize', function () {
                if (this.innerWidth > 768) {
                    $texts.attr('style', '');

                    return;
                }

                var windowHeight = this.innerHeight;

                $texts.each(function (index) {
                    var $text = $(this);

                    var titleHeight = $titles.eq(index).height();
                    var height = windowHeight - imageHeight - titleHeight - padding;

                    $text.height(height);
                });
            }).resize();
        });
})();


