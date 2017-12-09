(function () {
    $('.gallery')
        .each(function () {
            var $gallery = $(this);

            var $title = $gallery.find('.gallery__title');
            var $year = $gallery.find('.gallery__year');

            var $index = $gallery.find('.gallery__count-current');
            var $total = $gallery.find('.gallery__count-total');

            var $list = $gallery.find('.gallery__list');
            var $items = null;
            var $images = null;
            var $infos = null;

            var index = 0;
            var stepWidth = 0;

            bindCommonEvents();
            bindToSwipe();

            function bindCommonEvents() {
                Page.$win
                    .on('resize orientationchange', onResize)
                    .on('keydown', function (event) {
                        event.which === 27 && Page.delState('gallery');
                    });

                Page.$body.on('click', '.gallery-open', function () {
                    var data = $(this).data('gallery');

                    if (!data) {
                        return;
                    }

                    updateGallery(data);
                    Page.setState('gallery');
                });

                $gallery
                    .on('click', '.gallery__close', function () {
                        Page.delState('gallery');
                    })
                    .on('click', '.gallery__item', function () {
                        var newIndex = $(this).index();

                        moveTo(newIndex);
                    })
                    .on('click', '.arrow-button', function () {
                        var direction = $(this).hasClass('arrow-button_next') ? 1 : -1;

                        move(direction);
                    });
            }

            function bindToSwipe() {
                if (Page.hasState('hoverable')) {
                    return;
                }

                var hammertime = new Hammer($gallery[0]);

                hammertime
                    .get('swipe')
                    .set({ direction: Hammer.DIRECTION_HORIZONTAL });

                hammertime.on('swipe', function (event) {
                    switch (event.direction) {
                        case Hammer.DIRECTION_RIGHT:
                            return move(-1);
                        case Hammer.DIRECTION_LEFT:
                            return move(1);
                    }
                });
            }

            function onResize() {
                updateDimensions();
                moveTo(index, true);
            }

            function updateDimensions() {
                stepWidth = $items.eq(0).innerWidth();

                var listHeight = $list.height();

                $images.each(function (index) {
                    var infoHeight = $infos.eq(index).innerHeight();

                    $(this).css('max-height', listHeight - infoHeight);
                });
            }

            function updateGallery(data) {
                index = 0;

                updateTitle(data);
                updateList(data.list);
                updateCount();
                updateDimensions();

                moveTo(0, true);
            }

            function updateTitle(data) {
                $title.text(data.title);
                $year
                    .text(data.year)
                    [data.year ? 'show' : 'hide']();
            }

            function updateCount() {
                $index.text(index + 1);
                $total.text($items.length);
            }

            function updateList(list) {
                var html = '';

                list.forEach(function (item) {
                    html += '' +
                        '<figure class="gallery__item">' +
                            imgHtml(item) +
                            '<figcaption class="gallery__item-info">' +
                                '<div class="gallery__item-title">' + item.title + '</div>' +
                                (item.text ? '<div class="gallery__item-text">' + item.text + '</div>' : '') +
                            '</figcaption>' +
                        '</figure>';
                });

                $list.html(html);
                $items = $list.children();
                $images = $list.find('.gallery__item-image');
                $infos = $list.find('.gallery__item-info');
            }

            function imgHtml(item) {
                return '' +
                    '<img ' +
                        'class="gallery__item-image" ' +
                        'alt="' + item.title + '" ' +
                        'src="' + item.image + '" ' +
                        'srcset="' + item.image.replace(/\.[^\.]*$/, '_2x$&') + ' 2x" ' +
                    '/>'
            }

            function move(direction) {
                var newIndex = index + direction;
                var last = $items.length - 1;

                if (newIndex < 0) {
                    newIndex = last
                } else if (newIndex > last) {
                    newIndex = 0;
                }

                moveTo(newIndex);
            }

            function moveTo(newIndex, jump) {
                index = newIndex;

                setCurrent();
                updateCount();
                moveList(jump);
            }

            function setCurrent() {
                $items
                    .removeClass('gallery__item_current')
                    .eq(index).addClass('gallery__item_current');
            }

            function moveList(jump) {
                var scrolLeft = stepWidth * index + stepWidth / 2;
                var duration = jump ? 0 : 500;

                $list
                    .stop()
                    .animate({ scrollLeft: scrolLeft }, duration);
            }
        });
})();


