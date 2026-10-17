// Team Owl Carousel
$('.team-owl').owlCarousel({
    loop: true, margin: 0, nav: false, dots: true,
    autoplay: true, autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
        0:   { items: 1 },
        576: { items: 2 },
        992: { items: 3 },
        1200:{ items: 4 }
    }
});

// Reviews Owl Carousel
$('.reviews-owl').owlCarousel({
    loop: true, margin: 20, nav: false, dots: true,
    autoplay: true, autoplayTimeout: 5000,
    autoplayHoverPause: true,
    animateIn: 'fadeIn', animateOut: 'fadeOut',
    responsive: {
        0:   { items: 1 },
        768: { items: 2 },
        1200:{ items: 3 }
    }
});

// Product modal placeholder
function openProductModal(id) {
    window.location.href = 'products.html';
}
