(function () {
    $('.timeline')
        .each(function () {
            var $scope = $(this);
            var $items = $scope.find('.timeline__item');

            var id = $scope.data('id');

            $items.on('click', onItemClick);
            Page.$win.on('slider.horizontal', onHorizontalSliderChange);

            function onItemClick() {
                Page.$html.trigger('timeline.click', {
                    id: id,
                    index: $(this).index()
                });
            }

            function onHorizontalSliderChange(event, data) {
                if (data.id === id && typeof data.index === 'number') {
                    $items
                        .removeClass('timeline__item_current timeline__item_prev')
                        .eq(data.index).addClass('timeline__item_current')
                        .end()
                        .eq(data.index - 1).addClass('timeline__item_prev');
                }
            }
        });
})();


