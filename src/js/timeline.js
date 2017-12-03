(function () {
    $('.timeline')
        .each(function () {
            var $scope = $(this);

            var id = $scope.data('id');

            var $items = $scope.find('.timeline__item');
            var items = prepareItems();

            Page.$win.on('slider.horizontal', onHorizontalSliderChange);
            $scope.on('click', '.timeline__item', onItemClick);

            updateTimeline(0);

            function prepareItems() {
                var result = [];

                $items.each(function () {
                    var $item = $(this);
                    var $text = $item.find('.timeline__text');

                    var count = $item.data('count');
                    var item = {
                        $dom: $item,
                        $text: $text,
                    };

                    item.$dom.data('index', result.length);

                    if (!count) {
                        item.text = item.$text.html();

                        return result.push(item);
                    }

                    for (var i = 0; i < count; i += 1) {
                        item = $.extend({}, item, {
                            text: diplomaText(count),
                            currentText: currentDiplomaText(i, count)
                        });

                        item.$text.html(item.text);

                        result.push(item);
                    }
                });

                return result;
            }

            function diplomaText(count) {
                var cases = [2, 0, 1, 1, 1, 2];
                var titles = ['диплом', 'диплома', 'дипломов'];

                return count + ' ' + titles[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
            }

            function currentDiplomaText(index, count) {
                return (index + 1) + '/' + count + ' дипломов';
            }

            function onItemClick() {
                Page.$html.trigger('timeline.click', {
                    id: id,
                    index: $(this).data('index')
                });
            }

            function onHorizontalSliderChange(event, data) {
                if (data.id !== id || typeof data.index !== 'number') {
                    return;
                }

                updateTimeline(data.index);
            }

            function updateTimeline(index) {
                $items.removeClass('timeline__item_current timeline__item_prev');

                var current = items[index];

                setCurrent(current);
                setPrev(index, current);
                setNext(index, current);
            }

            function setCurrent(item) {
                item.$dom.addClass('timeline__item_current');
                item.$text.html(item.currentText || item.text);
            }

            function setPrev(index, current) {
                for (var i = index; i >= 0; --i) {
                    var item = items[i];

                    if (current.$dom !== item.$dom) {
                        item.$text.html(item.text);
                        item.$dom.addClass('timeline__item_prev');

                        break;
                    }
                }
            }

            function setNext(index, current) {
                for (var i = index; i < items.length; ++i) {
                    var item = items[i];

                    if (current.$dom !== item.$dom) {
                        item.$text.html(item.text);

                        break;
                    }
                }
            }
        });
})();


