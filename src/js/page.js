console.log('hello');

var horizSliders = document.querySelectorAll('.horizontal-slider');

horizSliders.forEach(function (block) {
    var sliderLoop = block.dataset.loop;
    var slider = block.querySelector('.horizontal-slider__list');
    var slides = slider.querySelectorAll('.horizontal-slide');
    var countSlides = slides.length;
    var currentSlide = 1;
    var offset = 0;
    var offsetModifier = (block.classList.contains('horizontal-slider_shifted')) ? 90 : 100;

    var animateSlide = function (currentOffset, nextOffset) {
        slider.animate([
            { transform: 'translate3d(' + currentOffset + '%, 0, 0)' },
            { transform: 'translate3d(' + nextOffset + '%, 0, 0)' }
        ], {
            duration: 200,
            easing: 'linear',
            delay: 0,
            fill: 'forwards'
        });
    };

    var prevSlide = function () {
        if (currentSlide > 1) {
            currentSlide--;
            animateSlide(offset, offset + offsetModifier);
            offset += offsetModifier;
        }
        if (!sliderLoop) {

            if (currentSlide === 1) {
                prevBtn.disabled = true;
            }
            if (nextBtn.disabled) {
                nextBtn.disabled = false;
            }
        }
    };

    var nextSlide = function () {
        if (currentSlide < countSlides) {
            currentSlide++;
            animateSlide(offset, offset - offsetModifier);
            offset -= offsetModifier;
        }
        if (!sliderLoop) {

            if (currentSlide === countSlides) {
                nextBtn.disabled = true;
            }
            if (prevBtn.disabled) {
                prevBtn.disabled = false;
            }
        }
    };

    var prevBtn = block.querySelector('.arrow-button_prev');
    var nextBtn = block.querySelector('.arrow-button_next');
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
});
