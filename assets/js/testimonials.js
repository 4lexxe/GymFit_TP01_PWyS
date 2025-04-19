/**
 * Script para gestionar los testimonios en el carrusel
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de testimonios cargado');
    
    // Verificar que el carrusel existe
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (!testimonialCarousel) {
        console.error('No se encontró el elemento testimonialCarousel');
        return;
    }

    try {
        // Inicializar el carrusel de Bootstrap
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true,
            keyboard: true,
            pause: 'hover'
        });
        
        console.log('Carrusel inicializado correctamente');
        
        // Agregar iniciales a los avatares de testimonios
        const avatars = document.querySelectorAll('.testimonial-avatar');
        avatars.forEach(function(avatar) {
            const initials = avatar.getAttribute('data-initials');
            avatar.setAttribute('aria-label', `Avatar con iniciales ${initials}`);
        });
        
        // Añadir animación al cambiar de slide
        testimonialCarousel.addEventListener('slide.bs.carousel', function() {
            setTimeout(function() {
                const activeCard = testimonialCarousel.querySelector('.carousel-item.active .testimonial-card');
                if (activeCard) {
                    activeCard.style.opacity = '1';
                    activeCard.style.transform = 'translateY(0)';
                }
            }, 100);
        });
        
        // Función para ajustar la posición de los controles en dispositivos móviles
        function adjustControls() {
            const controls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
            if (window.innerWidth < 768) {
                controls.forEach(control => {
                    control.style.display = 'none';
                });
            } else {
                controls.forEach(control => {
                    control.style.display = 'flex';
                });
            }
        }
        
        // Ejecutar el ajuste de controles al cargar y al cambiar el tamaño de la ventana
        adjustControls();
        window.addEventListener('resize', adjustControls);
        
        // Asegurar que el primer testimonio se muestre correctamente
        setTimeout(function() {
            const firstCard = testimonialCarousel.querySelector('.carousel-item.active .testimonial-card');
            if (firstCard) {
                firstCard.style.opacity = '1';
                firstCard.style.transform = 'translateY(0)';
            }
        }, 300);
    } catch (error) {
        console.error('Error al inicializar el carrusel de testimonios:', error);
    }
});

// Versión jQuery como respaldo
$(document).ready(function() {
    console.log('Inicializando testimonio con jQuery como respaldo');
    
    if (!window.bootstrap || !window.bootstrap.Carousel) {
        console.log('Bootstrap no disponible, inicializando manualmente');
        $('#testimonialCarousel').carousel({
            interval: 5000,
            wrap: true,
            keyboard: true,
            pause: 'hover'
        });
    }
    
    // Asegurar que las tarjetas de testimonios sean visibles
    $('.testimonial-card').css({
        'opacity': '1',
        'transform': 'translateY(0)'
    });
});
