(function () {
    $('.loading')
        .each(function () {
            var scopeTransition = 500;
            var progressBarTransition = 200;

            var $scope = $(this);
            var $progressBar = $scope.find('.loading__progress-bar');

            $scope.on('click', '.button', function () {
                $scope.addClass('loading_closed');

                setTimeout($scope.remove.bind($scope), scopeTransition);
            });

            Page.$body
                .imagesLoaded()
                .always(function () {
                    setTimeout(
                        $scope.addClass.bind($scope, 'loading_finished'),
                        progressBarTransition
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


