// COUNTER NUMBER

const animateValue = (element, start, end, suffix, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = Math.floor(easedProgress * (end - start) + start);
        element.textContent = currentValue + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
  };
  
  // Easing function for smoother animation
  const easeOutCubic = (x) => {
    return 1 - Math.pow(1 - x, 3);
  };
  
  // Intersection Observer for triggering animations when elements come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.getAttribute('data-target'));
            const suffix = element.getAttribute('data-suffix');
            animateValue(element, 0, target, suffix, 2000);
            observer.unobserve(element);
        }
    });
  }, {
    threshold: 0.1
  });
  
  // Start observing all number elements
  document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(number => observer.observe(number));
  });
  