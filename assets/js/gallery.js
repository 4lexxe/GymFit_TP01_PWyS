/**
 * JavaScript para la galería Masonry y efectos de las tarjetas
 */
$(document).ready(function() {
    // Comprobar si Isotope está disponible antes de usarlo
    let $grid;
    let isotopeAvailable = typeof $.fn.isotope === 'function';
    
    if (isotopeAvailable) {
        console.log('Isotope disponible, inicializando galería Masonry');
        try {
            // Inicializar Isotope para la galería Masonry
            $grid = $('.masonry-gallery').isotope({
                itemSelector: '.masonry-item',
                percentPosition: true,
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: '.masonry-item'
                },
                transitionDuration: '0.6s',
                stagger: 30
            });
            
            // Asegurar que las imágenes estén cargadas antes de ejecutar Isotope
            if (typeof $.fn.imagesLoaded === 'function') {
                $grid.imagesLoaded().progress(function() {
                    $grid.isotope('layout');
                });
            }
        } catch (error) {
            console.error('Error al inicializar Isotope:', error);
            isotopeAvailable = false;
        }
    } else {
        console.warn('Isotope no disponible, usando filtrado alternativo');
    }
    
    // Filtrado para la galería (compatible con Isotope o con CSS/JS básico)
    $('.gallery-filters').on('click', '.filter-btn', function() {
        let filterValue = $(this).attr('data-filter');
        
        // Actualizar botón activo
        $('.gallery-filters .filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (isotopeAvailable) {
            // Usar Isotope si está disponible
            if (filterValue === '*') {
                $grid.isotope({ filter: '*' });
            } else {
                $grid.isotope({ filter: filterValue });
            }
        } else {
            // Alternativa con jQuery si Isotope no está disponible
            if (filterValue === '*') {
                $('.masonry-item').fadeIn();
            } else {
                $('.masonry-item').hide();
                $(filterValue).fadeIn();
            }
        }
    });
    
    // Efectos para las tarjetas con zoom
    $('.zoom-card').each(function(index) {
        // Añadir delay para efecto escalonado en carga inicial
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // Hover efecto mejorado para cards
    $('.zoom-card').hover(
        function() {
            // Mouse enter
            $(this).find('.zoom-card-image img').css('transform', 'scale(1.1)');
        },
        function() {
            // Mouse leave
            $(this).find('.zoom-card-image img').css('transform', 'scale(1.0)');
        }
    );
    
    // Inicializar tooltips de Bootstrap si están disponibles
    if (typeof bootstrap !== 'undefined' && typeof bootstrap.Tooltip === 'function') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Animación para tabla de horarios al hacer scroll
    const scheduleTable = $('.schedule-table');
    
    if (scheduleTable.length) {
        $(window).scroll(function() {
            const scrollPosition = $(this).scrollTop();
            const tablePosition = scheduleTable.offset().top;
            
            if (scrollPosition > tablePosition - $(window).height() * 0.8) {
                $('tbody tr').each(function(index) {
                    setTimeout(() => {
                        $(this).addClass('show-row');
                    }, 100 * index);
                });
            }
        });
        
        // Iniciar animación si la tabla ya es visible
        if ($(window).scrollTop() > scheduleTable.offset().top - $(window).height()) {
            $('tbody tr').each(function(index) {
                setTimeout(() => {
                    $(this).addClass('show-row');
                }, 100 * index);
            });
        }
    }
});
