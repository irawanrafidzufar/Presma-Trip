const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark")
})

//navbar
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links ul li a');

    function updateNavBackground() {
        const navLinks = document.querySelector('.nav-links ul');
        const activeLink = navLinks.querySelector('a.active');
        
        if (activeLink) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = navLinks.getBoundingClientRect();
            
            navLinks.style.setProperty('--left', `${linkRect.left - navRect.left}px`);
            navLinks.style.setProperty('--width', `${linkRect.width}px`);
        }
    }

    function updateActiveNavLink() {
        const scrollPosition = window.pageYOffset + 101;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const current = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === current) {
                        link.classList.add('active');
                    }
                });
            }
        });

        updateNavBackground(); // Tambahkan ini
    }

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        const targetPosition = targetSection.offsetTop - 100; // Kurangi 100px untuk margin

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('resize', updateActiveNavLink);

    // Panggil fungsi saat halaman dimuat untuk mengatur status awal
    updateActiveNavLink();

    // Panggil updateNavBackground saat halaman dimuat
    updateNavBackground();

    // Tambahkan event listener untuk resize
    window.addEventListener('resize', updateNavBackground);
});
