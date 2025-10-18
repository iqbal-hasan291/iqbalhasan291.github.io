// Toggle zoom on .skill-card elements when clicked
(function () {
  'use strict';

  function onCardClick(e) {
    const card = e.currentTarget;
    const grid = card.closest('.skills-grid');

    // If this card is already zoomed, unzoom it
    if (card.classList.contains('zoomed')) {
      card.classList.remove('zoomed');
      if (grid) grid.classList.remove('zoom-active');
      return;
    }

    // Unzoom any other zoomed cards
    document.querySelectorAll('.skill-card.zoomed').forEach(c => c.classList.remove('zoomed'));

    // Zoom this card
    card.classList.add('zoomed');
    if (grid) grid.classList.add('zoom-active');

    // Prevent the page from scrolling while zoomed on small screens
    document.body.style.overflow = 'hidden';
  }

  function closeZoom() {
    let any = false;
    document.querySelectorAll('.skill-card.zoomed').forEach(c => { c.classList.remove('zoomed'); any = true; });
    const grid = document.querySelector('.skills-grid');
    if (grid) grid.classList.remove('zoom-active');
    if (any) document.body.style.overflow = '';
  }

  function onDocumentClick(e) {
    // If click happened inside a zoomed card, ignore (handled by card click)
    if (e.target.closest('.skill-card')) return;
    closeZoom();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeZoom();
  }

  // Attach handlers when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => card.addEventListener('click', onCardClick));

    // clicking outside a card should close any zoomed card
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);
  });
})();
