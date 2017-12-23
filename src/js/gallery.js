(function () {
    var SCROLL_DURATION = 700;
    var EXTRA_ITEMS = 2;

    $('.gallery')
        .each(function () {
            var $gallery = $(this);

            var $year = $gallery.find('.gallery__year');
            var $title = $gallery.find('.gallery__title');

            var $currentCount = $gallery.find('.gallery__count-current');
            var $totalCount = $gallery.find('.gallery__count-total');

            var $list = $gallery.find('.gallery__list');
            var $items = null;
            var $images = null;
            var $infos = null;

            var index = null;
            var stepWidth = 0;

            bindCommonEvents();
            bindToSwipe();
            bindToWin();

            function bindCommonEvents() {
                Page.$body
                    .on('click', '.gallery-open', function () {
                        var $data = $(this).closest('[data-gallery]');
                        var data = $data.data('gallery');

                        if (!data) {
                            return;
                        }

                        updateGallery(data);
                        Page.setState('gallery');
                    })
                    .on('click', '.gallery__close', function () {
                        Page.delState('gallery');
                    })
                    .on('click', '.gallery__item', function () {
                        var isNext = $(this).index() >= index;

                        move(isNext ? 1 : -1);
                    })
                    .on('click', '.gallery .arrow-button', function () {
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

            function bindToWin() {
                Page.$win
                    .on('resize orientationchange', function () {
                            if (!$items) {
                                return;
                            }

                            updateDimensions();
                            moveList(true);
                        }
                    )
                    .on('keydown', function (event) {
                        if (Page.hasState('gallery') && event.which === 27) {
                            Page.delState('gallery');
                        }
                    });
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
                updateInfo(data);
                updateList(data.list);

                updateDimensions();

                moveTo(data.list.length > 1 ? EXTRA_ITEMS : 0, true);
            }

            function updateInfo(data) {
                $totalCount
                    .html(data.list.length);

                $title
                    .html(data.title);

                $year
                    .html(data.year)
                    [data.year ? 'show' : 'hide']();
            }

            function updateList(list) {
                $list.html(list.reduce(function (html, item, index) {
                    return html + itemHtml(item, index);
                }, ''));

                if (list.length > 1) {
                    addFakes();
                }

                cacheElems();
            }

            function itemHtml(item, index) {
                return '' +
                    '<figure class="gallery__item" data-id="' + index + '">' +
                        imgHtml(item) +
                        captionHtml(item) +
                    '</figure>';
            }

            function imgHtml(item) {
                return '' +
                    '<img ' +
                        'class="gallery__item-image" ' +
                        'alt="' + item.title + '" ' +
                        'src="' + item.image + '" ' +
                        'srcset="' + item.image.replace(/\.[^\.]*$/, '@2x$&') + ' 2x" ' +
                    '/>'
            }

            function captionHtml(item) {
                return '' +
                    '<figcaption class="gallery__item-info">' +
                        '<div class="gallery__item-title">' + item.title + '</div>' +
                        (item.text ? '<div class="gallery__item-text">' + item.text + '</div>' : '') +
                    '</figcaption>';
            }

            function addFakes() {
                var $children = $list.children();

                for (var i = 0; i < EXTRA_ITEMS; i += 1) {
                    $list
                        .append(
                            $children
                                .eq(i)
                                .clone()
                                .addClass('.gallery__item_fake')
                        )
                        .prepend(
                            $children
                                .eq(-(i + 1))
                                .clone()
                                .addClass('.gallery__item_fake')
                        );
                }
            }

            function cacheElems() {
                $items = $list.children();
                $images = $list.find('.gallery__item-image');
                $infos = $list.find('.gallery__item-info');
            }

            function move(direction) {
                var newIndex = index + direction;
                var realLast = $items.length - EXTRA_ITEMS - 1;

                if (newIndex < EXTRA_ITEMS) {
                    moveTo(realLast + 1, true);

                    newIndex = realLast;
                } else if (newIndex > realLast) {
                    moveTo(EXTRA_ITEMS - 1, true);

                    newIndex = EXTRA_ITEMS;
                }

                moveTo(newIndex);
            }

            function moveTo(newIndex, jump) {
                if ($list.is(':animated')) {
                    return;
                }

                index = newIndex;

                setCurrent();
                moveList(jump);
            }

            function setCurrent() {
                $currentCount
                    .html(index - EXTRA_ITEMS + 1);

                $items
                    .removeClass('gallery__item_current')
                    .filter('[data-id=' + $items.eq(index).data('id') + ']')
                    .addClass('gallery__item_current');
            }

            function moveList(jump) {
                var scrolLeft = stepWidth * index + stepWidth / 2;
                var duration = jump ? 0 : SCROLL_DURATION;

                $list.animate({ scrollLeft: scrolLeft }, duration);
            }
        });
})();


