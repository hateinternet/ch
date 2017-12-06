(function () {
    $('.gallery')
        .each(function () {
            var $scope = $(this);

            Page.$body.on('click', '.gallery-open, .gallery__close', function () {
                Page.toggleState('gallery');
            });
        });
})();


