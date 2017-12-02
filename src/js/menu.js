(function () {
    $('.header')
        .each(function () {
            var $scope = $(this);
            var $links = $scope.find('.nav__link');

            //     .on('click', '.header__burger', onItemClick)
            //     .on('click', '.header__close', onItemClick)

            Page.$html
                .on('slider.vertical', onVerticalSliderChange)
                .on('click', '.nav__link', onLinkClick);

            function onVerticalSliderChange(event, data) {
                location.hash = data.id;

                $links
                    .removeClass('nav__link_current')
                    .filter('[href*=' + data.id + ']')
                    .addClass('nav__link_current');
            }

            function onLinkClick() {
                var id = this.href.split('#')[1];

                Page.$win.trigger('menu.click', id);
            }
        });
})();


