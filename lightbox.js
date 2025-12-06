document.addEventListener('DOMContentLoaded', function () {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '\n    <button class="lightbox-close" aria-label="Close">✕</button>\n    <img src="" alt="Enlarged image">\n  ';
  document.body.appendChild(overlay);

  const overlayImage = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  // Open function
  function openLightbox(src, alt) {
    overlayImage.src = src;
    overlayImage.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Close function
  function closeLightbox() {
    overlay.classList.remove('open');
    overlayImage.src = '';
    document.body.style.overflow = '';
  }

  // Click handler: delegate to images inside main
  document.body.addEventListener('click', function (e) {
    const el = e.target;
    if (el && el.tagName === 'IMG') {
      // Only open for images inside <main> or images with specific classes
      if (el.closest('main') || el.classList.contains('photo-item') || el.classList.contains('tree-image') || el.classList.contains('side-image') || el.classList.contains('image-left') || el.classList.contains('image-right')) {
        e.preventDefault();
        openLightbox(el.src, el.alt);
      }
    }

    // Close when clicking the overlay background (but not the image)
    if (el === overlay || el === closeBtn) {
      closeLightbox();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});
