// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.getElementById('primary-navigation');

mobileNavToggle.addEventListener('click', () => {
    const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
    primaryNav.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            primaryNav.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    if (email) {
        // Here you would typically send the email to your backend
        alert('Thank you for subscribing!');
        newsletterForm.reset();
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

 // Star Rating Interaction
 const starElements = document.querySelectorAll('.star');
 let selectedRating = 0;

 starElements.forEach(star => {
     star.addEventListener('mouseover', () => {
         const rating = star.getAttribute('data-rating');
         starElements.forEach(s => {
             const sRating = s.getAttribute('data-rating');
             s.classList.toggle('active', sRating <= rating);
         });
     });

     star.addEventListener('mouseout', () => {
         starElements.forEach(s => {
             s.classList.toggle('active', s.getAttribute('data-rating') <= selectedRating);
         });
     });

     star.addEventListener('click', () => {
         selectedRating = star.getAttribute('data-rating');
     });
 });

 // Review Submission
 const reviewForm = document.getElementById('review-form');
 const reviewsContainer = document.getElementById('existing-reviews');

 reviewForm.addEventListener('submit', function(e) {
     e.preventDefault();

     const quote = document.getElementById('quote').value;
     const name = document.getElementById('name').value;
     const company = document.getElementById('company').value;

     if (selectedRating === 0) {
         alert('Please select a rating');
         return;
     }

     const reviewCard = document.createElement('div');
     reviewCard.className = 'review-card';
     reviewCard.innerHTML = `
         <div class="review-rating">
             <div class="review-stars">
                 ${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}
             </div>
             <span class="review-rating-text">${selectedRating}/5 rating</span>
         </div>
         <blockquote class="review-quote">"${quote}"</blockquote>
         <div class="review-author">${name}</div>
         <div class="review-company">${company}</div>
     `;

     reviewsContainer.insertBefore(reviewCard, reviewsContainer.firstChild);

     // Reset form
     reviewForm.reset();
     selectedRating = 0;
     starElements.forEach(s => s.classList.remove('active'));
 });