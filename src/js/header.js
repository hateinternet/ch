(function () {
    $('.header')
        .each(function () {
            var $scope = $(this);
            var $navLinks = $scope.find('.nav__link');

            Page.$html
                .on('slider.vertical', onVerticalSliderChange)
                .on('click', '.menu__burger, .menu__close', onMenuToggle)
                .on('click', '.nav__link', onNavLinkClick)
                .on('click', '.menu__link', onMenuLinkClick);

            function onVerticalSliderChange(event, data) {
                location.hash = data.id;

                $navLinks
                    .removeClass('nav__link_current')
                    .filter('[href*=' + data.id + ']')
                    .addClass('nav__link_current');
            }

            function onMenuToggle() {
                Page.toggleState('menu');
            }

            function onNavLinkClick() {
                var id = this.href.split('#')[1];

                Page.$win.trigger('menu.click', { id: id });
            }

            function onMenuLinkClick() {
                var id = this.href.split('#')[1];

                Page.$win.trigger('menu.click', {
                    id: id,
                    jump: true
                });

                Page.toggleState('menu');

            }
        });
})();


