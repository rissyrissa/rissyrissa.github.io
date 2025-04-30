// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle (if needed)
    setupMobileMenu();
    
    // Image modal functionality
    setupImageModal();

    setupTestimonialCarousel();
    
    // Testimonial carousel (for index.html)
    if (document.querySelector('.testimonial-carousel')) {
        setupTestimonialCarousel();
    }
    
    // Newsletter form submission (for index.html)
    if (document.getElementById('newsletter-form')) {
        setupNewsletterForm();
    }
    
    // Image gallery click handlers (for breedinformation.html)
    if (document.querySelector('.gallery-grid')) {
        setupGallery();
    }
    
});

// Image Modal Functionality
function setupImageModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    const modalImg = document.getElementById('expandedImg');
    const captionText = document.getElementById('imgCaption');
    const closeModal = document.querySelector('.close-modal');
    
    
    if (!modalImg || !captionText || !closeModal) return;
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}


// Gallery Setup
function setupGallery() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImg');
    const captionText = document.getElementById('imgCaption');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });
}

// Testimonial on Index
function setupTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentIndex = 0;
    
    // Show initial testimonial
    showTestimonial(currentIndex);
    
    // Next testimonial
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Previous testimonial
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }
}

// Newsletter Form
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Simple validation
        if (email && email.includes('@')) {
            // In a real application, you would send this to a server
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

//Interactivty for Timeline for Oreo's Story HTML
function setupTimeline() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const moreContent = this.nextElementSibling;
            moreContent.classList.toggle('active');
            this.textContent = moreContent.classList.contains('active') ? 'Read Less' : 'Read More';
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.container').forEach(container => {
        observer.observe(container);
    });

    // Image modal for timeline images
    document.querySelectorAll('.timeline-img').forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'timeline-modal';
            modal.innerHTML = `
                <span class="close-timeline-modal">&times;</span>
                <img src="${this.src}" alt="${this.alt}" class="timeline-modal-content">
                <div class="timeline-caption">${this.alt}</div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.close-timeline-modal').addEventListener('click', function() {
                modal.remove();
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
}

//JS for Finances to Consider Page
function updateProgress() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const checked = document.querySelectorAll('.item-checkbox:checked');
    const progress = (checked.length / checkboxes.length) * 100;
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '% Complete';
    
    // Change color based on progress
    if (progress < 33) {
        progressBar.style.background = '#ffab91';
    } else if (progress < 66) {
        progressBar.style.background = '#ffcc80';
    } else if (progress < 99) {
        progressBar.style.background = '#c5e1a5';
    } else {
        progressBar.style.background = '#81c784';
        document.getElementById('completionMessage').style.display = 'block';
    }
}

// Initialize with first item expanded for user guidance
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('item1').checked = true;
    updateProgress();
});