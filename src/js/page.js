(function () {
    var button = document.querySelector('.header__burger');

    button.addEventListener('click', function () {
        document.body.classList.toggle('page_menu-opened');
    });
})();
