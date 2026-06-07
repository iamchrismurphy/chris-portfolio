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

  const SCROLL_OFFSET = 24;

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

    document.querySelectorAll('.site-nav__dropdown-link, .site-nav__mobile-sublink').forEach(function (link) {
      if (link.dataset.page === page) {
        link.classList.add('is-current');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function initMobileMenu() {
    const burger = document.querySelector('.site-nav__burger');
    const menu = document.getElementById('site-mobile-menu');
    const header = document.querySelector('.site-header');
    if (!burger || !menu || !header) return;

    function setMenuOpen(open) {
      header.classList.toggle('menu-open', open);
      menu.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    burger.addEventListener('click', function () {
      setMenuOpen(!header.classList.contains('menu-open'));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });
  }

  function initSideNav() {
    const sideNav = document.querySelector('.side-nav');
    if (!sideNav) return;

    const links = Array.from(sideNav.querySelectorAll('.side-nav-link'));
    const sections = links
      .map(function (link) {
        const href = link.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return null;
        return document.querySelector(href);
      })
      .filter(Boolean);

    if (!sections.length) return;

    function setActiveLink(id) {
      links.forEach(function (link) {
        const isActive = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    function scrollToSection(target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        scrollToSection(target);
        setActiveLink(target.id);
      });
    });

    function updateActiveOnScroll() {
      let current = sections[0];

      sections.forEach(function (section) {
        const top = section.getBoundingClientRect().top;
        if (top <= SCROLL_OFFSET + 1) {
          current = section;
        }
      });

      setActiveLink(current.id);
    }

    window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
    updateActiveOnScroll();
  }

  initNextProject();
  markCurrentNav();
  initMobileMenu();
  initSideNav();
})();
