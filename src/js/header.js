(function () {
    $('.header')
        .each(function () {
            var $scope = $(this);
            var $links = $scope.find('.nav__link');

            Page.$html
                .on('slider.vertical', onVerticalSliderChange)
                .on('click', '.nav__link, .menu__link', onLinkClick)
                .on('click', '.menu__burger, .menu__close', onMenuToggle);

            function onVerticalSliderChange(event, data) {
                location.hash = data.id;

                $links
                    .removeClass('nav__link_current')
                    .filter('[href*=' + data.id + ']')
                    .addClass('nav__link_current');
            }

            function onLinkClick() {
                Page.$win.trigger('menu.click', {
                    id: this.href.split('#')[1],
                    jump: $(this).hasClass('menu__link')
                });
            }

            function onMenuToggle() {
                Page.toggleState('menu');
            }
        });
})();


