(function () {
    var POPUP_TRANSITION_DURATION = 500;
    var BAR_TRANSITION_DURATION = 500;
    var FULL_ANIMATION_DURATION = 2500;

    var startTime = Date.now();

    $('.loading')
        .each(function () {
            var $popup = $(this);
            var $bar = $popup.find('.loading__progress-bar');

            $popup.on('click', '.button', function () {
                $popup.addClass('loading_closed');

                setTimeout(
                    $popup.remove.bind($popup),
                    POPUP_TRANSITION_DURATION
                );

                Page.$html.trigger('loading.done');
            });

            Page.$body
                .imagesLoaded({ background: true })
                .always(function () {
                    var delta = Date.now() - startTime;
                    var duration = delta <= FULL_ANIMATION_DURATION ?
                        FULL_ANIMATION_DURATION - delta :
                        BAR_TRANSITION_DURATION;

                    setTimeout(
                        $popup.addClass.bind($popup, 'loading_finished'),
                        duration
                    );

                    document.cookie = [
                        'loaded=1',
                        'expires=' + 7 * 24 * 60 * 60 * 1000,
                        'path=/'
                    ].join(';');
                })
                .progress(function (event) {
                    var value = event.progressedCount / event.images.length * .9;

                    $bar.css('transform', 'scaleX(' + value + ')');
                });
        });
})();


