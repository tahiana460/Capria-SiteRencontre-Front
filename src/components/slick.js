export default function initial(){
    $('.wrap-slick3').each(function(){
        $(this).find('.slick3').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 6000,

            arrows: true,
            appendArrows: $(this).find('.wrap-slick3-arrows'),
            prevArrow:'<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
            nextArrow:'<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',

            dots: true,
            appendDots: $(this).find('.wrap-slick3-dots'),
            dotsClass:'slick3-dots',
            customPaging: function(slick, index) {
                var portrait = $(slick.$slides[index]).data('thumb');
                return '<img src=" ' + portrait + ' "/><div class="slick3-dot-overlay"></div>';
            },  
        });
    });
}