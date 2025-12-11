// ============================================
// Projects Filter Functionality
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCategories = document.querySelectorAll('.project-category');
    
    if (!filterButtons.length || !projectCategories.length) return;
    
    // Initialize: Show only endustriyel projects on page load
    projectCategories.forEach(category => {
        const categoryType = category.getAttribute('data-category');
        if (categoryType === 'endustriyel') {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            projectCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                
                if (categoryType === filter) {
                    category.style.display = 'block';
                    // Smooth scroll to first visible category
                    setTimeout(() => {
                        category.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
});

