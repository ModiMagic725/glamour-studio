function filterProducts(category) {
    document.querySelectorAll('.glamour-tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const items = document.querySelectorAll('.product-item');
    let visibleCount = 0;

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    document.getElementById('productEmptyMsg').style.display = visibleCount === 0 ? 'block' : 'none';

    const url = new URL(window.location);
    if (category === 'all') {
        url.searchParams.delete('category');
    } else {
        url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url);

    AOS.refresh();
}

function openProductModal(name, brand, desc, price, category, imgUrl) {
    document.getElementById('pModalName').textContent = name;
    document.getElementById('pModalBrand').textContent = brand || '';
    document.getElementById('pModalDesc').textContent = desc;
    document.getElementById('pModalPrice').textContent = price;
    document.getElementById('pModalCat').textContent = category;

    if (imgUrl) {
        document.getElementById('pModalImg').src = imgUrl;
    } else {
        document.getElementById('pModalImg').src = 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&q=80';
    }

    const msg = encodeURIComponent(`Hi! I'd like to enquire about: ${name} (₹${price})`);
    document.getElementById('pModalWa').href = `https://wa.me/919876543210?text=${msg}`;

    new bootstrap.Modal(document.getElementById('productModal')).show();
}
// Apply ?category= from the URL on load (replaces the server-side filter)
(function () {
    var v = new URLSearchParams(location.search).get('category');
    if (!v) return;
    var b = Array.prototype.find.call(document.querySelectorAll('.glamour-tab-btn'), function (x) { return x.getAttribute('onclick') === "filterProducts('" + v + "')"; });
    if (b) b.click();
})();
