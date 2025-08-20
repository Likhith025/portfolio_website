document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.top-bar .middle a');
  const sections = document.querySelectorAll('.snap-section');
  const scrollDownArrow = document.querySelector('.scroll-down');

  // Navbar highlighting
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Scroll-down arrow visibility
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollDownArrow.classList.add('hidden');
      } else {
        scrollDownArrow.classList.remove('hidden');
      }
    });
  }, { root: null, threshold: 0.1 });

  footerObserver.observe(document.querySelector('footer'));

  // Scroll-down arrow click handler
  scrollDownArrow.addEventListener('click', (e) => {
    e.preventDefault();
    const currentSection = Array.from(sections).find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    });
    const currentIndex = Array.from(sections).indexOf(currentSection);
    const nextSection = sections[currentIndex + 1];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});