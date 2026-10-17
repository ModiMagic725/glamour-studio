// Gallery filter
function filterGallery(cat, btn) {
    document.querySelectorAll('.glamour-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.gallery-item').forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Lightbox
function openLightbox(src, caption) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxCaption').textContent = caption;
    new bootstrap.Modal(document.getElementById('lightboxModal')).show();
}
