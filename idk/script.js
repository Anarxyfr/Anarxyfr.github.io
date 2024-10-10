document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const target = this.getAttribute('href');
        
        // Smooth scroll to the target section
        window.scrollTo({
            top: document.querySelector(target).offsetTop,
            behavior: 'smooth'
        });
    });
});
