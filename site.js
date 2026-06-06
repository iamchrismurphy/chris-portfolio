(function () {
  const PROJECT_NAV = {
    'auto-loan': {
      prev: { href: './index.html', label: 'All projects' },
      next: { href: './auto-loan-faq.html', label: 'Auto Loan FAQ' },
    },
    'auto-loan-faq': {
      prev: { href: './auto-loan.html', label: 'Auto Loan Application' },
      next: { href: './mortgage-calculator.html', label: 'Mortgage Calculator' },
    },
    'mortgage-calculator': {
      prev: { href: './auto-loan-faq.html', label: 'Auto Loan FAQ' },
      next: { href: './help-me-decide.html', label: 'Help Me Decide' },
    },
    'help-me-decide': {
      prev: { href: './mortgage-calculator.html', label: 'Mortgage Calculator' },
      next: { href: './sea-of-blue.html', label: 'Sea of Blue' },
    },
    'sea-of-blue': {
      prev: { href: './help-me-decide.html', label: 'Help Me Decide' },
      next: { href: './index.html', label: 'All projects' },
    },
  };

  function initNextProject() {
    const page = document.body.dataset.page;
    const nav = page && PROJECT_NAV[page];
    const container = document.getElementById('next-project');
    if (!nav || !container) return;

    container.innerHTML =
      '<a class="next-project-link" href="' + nav.prev.href + '">' +
      '<span class="arrow">←</span> ' + nav.prev.label +
      '</a>' +
      '<a class="next-project-link" href="' + nav.next.href + '">' +
      nav.next.label + ' <span class="arrow">→</span>' +
      '</a>';
  }

  function markCurrentNav() {
    const page = document.body.dataset.page;
    if (!page) return;

    document.querySelectorAll('.site-nav__dropdown-link').forEach(function (link) {
      if (link.dataset.page === page) {
        link.classList.add('is-current');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  initNextProject();
  markCurrentNav();
})();
