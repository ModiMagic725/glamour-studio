// Client-side role filtering
function filterTeam(role) {
    document.querySelectorAll('.glamour-tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const items = document.querySelectorAll('.team-item');
    let visibleCount = 0;

    items.forEach(item => {
        if (role === 'all' || item.dataset.role === role) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    document.getElementById('teamEmptyMsg').style.display = visibleCount === 0 ? 'block' : 'none';

    const url = new URL(window.location);
    if (role === 'all') {
        url.searchParams.delete('role');
    } else {
        url.searchParams.set('role', role);
    }
    window.history.pushState({}, '', url);

    AOS.refresh();
}

// Senior Owl Carousel
$('.senior-owl').owlCarousel({
    loop: true, margin: 24, nav: false, dots: true,
    autoplay: true, autoplayTimeout: 4500,
    autoplayHoverPause: true,
    responsive: {
        0:   { items: 1 },
        576: { items: 2 },
        992: { items: 3 },
        1200:{ items: 4 }
    }
});
// Apply ?role= from the URL on load (replaces the server-side filter)
(function () {
    var v = new URLSearchParams(location.search).get('role');
    if (!v) return;
    var b = Array.prototype.find.call(document.querySelectorAll('.glamour-tab-btn'), function (x) { return x.getAttribute('onclick') === "filterTeam('" + v + "')"; });
    if (b) b.click();
})();
