(function () {
    $('.loading')
        .each(function () {
            var scopeTransitionDuration = 500;
            var progressBarTransitionDuration = 200;

            var $scope = $(this);
            var $progressBar = $scope.find('.loading__progress-bar');

            $scope.on('click', '.button', function () {
                $scope.addClass('loading_closed');

                setTimeout(
                    $scope.remove.bind($scope),
                    scopeTransitionDuration
                );
            });

            Page.$body
                .imagesLoaded()
                .always(function () {
                    setTimeout(
                        $scope.addClass.bind($scope, 'loading_finished'),
                        progressBarTransitionDuration
                    );

                    document.cookie = [
                        'loaded=1',
                        'expires=' + 7 * 24 * 60 * 60 * 1000,
                        'path=/'
                    ].join(';');
                })
                .progress(function (event) {
                    var value = event.progressedCount / event.images.length;

                    $progressBar.css('transform', 'scaleX(' + value + ')');
                });
        });
})();


