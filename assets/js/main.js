$(document).ready(function() {
    // Toggle de modo oscuro
    $('#darkModeToggle').on('change', function() {
        if($(this).is(':checked')) {
            $('body').addClass('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            $('body').removeClass('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Verificar preferencia de tema guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        $('body').addClass('dark-mode');
        $('#darkModeToggle').prop('checked', true);
    }

    // Megamenú mejorado con jQuery
    $('.dropdown').on('mouseenter', function() {
        if ($(window).width() >= 992) {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(300);
        }
    });

    $('.dropdown').on('mouseleave', function() {
        if ($(window).width() >= 992) {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(300);
        }
    });

    // Prevenir cierre de menú al hacer clic dentro de un megamenú
    $('.megamenu').on('click', function(e) {
        e.stopPropagation();
    });

    // Animación contador de estadísticas
    const counters = $('.counter-number');
    const speed = 200;

    function animateCounters() {
        counters.each(function() {
            const $this = $(this);
            const target = parseInt($this.text());
            let count = 0;
            
            const updateCount = () => {
                const increment = Math.trunc(target / speed);
                
                if(count < target) {
                    count += increment || 1;
                    $this.text(count + (String($this.text()).includes('+') ? '+' : ''));
                    setTimeout(updateCount, 20);
                } else {
                    $this.text(target + (String($this.text()).includes('+') ? '+' : ''));
                }
            };
            
            updateCount();
        });
    }

    // Activar animación de contadores cuando sean visibles
    const counterSection = $('.counter');
    
    // Verificar si el elemento counterSection existe antes de usarlo
    $(window).on('scroll', function() {
        if (counterSection.length > 0) {
            const scrollTop = $(window).scrollTop();
            const elementOffset = counterSection.offset().top;
            const distance = (elementOffset - scrollTop);
            
            if (distance < $(window).height() - 100 && !counterSection.hasClass('counted')) {
                counterSection.addClass('counted');
                animateCounters();
            }
        }
    });

    // Inicializar tooltips de Bootstrap
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Animaciones del hero con video
    function initHeroVideo() {
        // Verificar si existe el elemento hero-video-container
        if ($('.hero-video-container').length) {
            // Animación del overlay
            $("#video-overlay").animate({
                opacity: 0.7
            }, 1000);
            
            // Secuencia de animaciones para los elementos del hero
            setTimeout(function() {
                // Fadeín del título
                $(".hero-title").removeClass('invisible').hide().fadeIn(1000);
                
                // Fadeín del subtítulo con delay
                setTimeout(function() {
                    $(".hero-subtitle").removeClass('invisible').hide().fadeIn(1000);
                    
                    // Slidedown de los botones
                    setTimeout(function() {
                        $(".hero-buttons").removeClass('invisible').hide().slideDown(800);
                        
                        // Finalmente mostrar el indicador de scroll
                        setTimeout(function() {
                            $(".scroll-indicator").removeClass('invisible').hide().fadeIn(500);
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }
    }
    
    // Inicializar las animaciones del hero
    initHeroVideo();
    
    // Efecto parallax en hero section
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        
        // Verificar que los elementos existen antes de modificar sus propiedades
        if ($('.hero-bg-video').length > 0) {
            $('.hero-bg-video').css('transform', 'translateY(' + (scrollTop * 0.3) + 'px)');
        }
        
        // Verificar que el elemento hero-video existe antes de modificar sus propiedades
        if ($('.hero-video').length > 0) {
            $('.hero-video').css('transform', 'translate(-50%, -50%) translateY(' + scrollTop * 0.2 + 'px)');
        }
    });

    // Scroll suave para anclas
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-bs-toggle]').on('click', function(event) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
            location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
                return false;
            }
        }
    });

    // Animar elementos al hacer scroll
    $(window).on('scroll', function() {
        $('.animate__animated:not(.animate__animated--triggered)').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate__animated--triggered');
                // Extraer clases de animación para re-aplicar
                const classes = $(this).attr('class').split(' ');
                const animationClasses = classes.filter(cls => cls.startsWith('animate__') && cls !== 'animate__animated' && cls !== 'animate__animated--triggered');
                
                // Re-aplicar clases para activar animación
                $(this).removeClass(animationClasses.join(' ')).addClass(animationClasses.join(' '));
            }
        });
    });

    // Animación para las tarjetas de clases destacadas
    $('.featured-card').hover(
        function() {
            $(this).find('.overlay-content').stop(true, false).animate({
                opacity: 1,
                top: '0'
            }, 300);
        },
        function() {
            $(this).find('.overlay-content').stop(true, false).animate({
                opacity: 0,
                top: '20px'
            }, 300);
        }
    );
    
    // Contador animado con jQuery - Función corregida
    function isElementInViewport(el) {
        // Si el elemento no existe, retornar false
        if (!el) {
            return false;
        }
        
        if (typeof jQuery === "function" && el instanceof jQuery) {
            // Si es un elemento jQuery y está vacío, retornar false
            if (el.length === 0) {
                return false;
            }
            el = el[0];
        }
        
        // Verificar si el elemento existe antes de acceder a getBoundingClientRect
        if (!el) {
            return false;
        }
        
        try {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        } catch (e) {
            console.error("Error al comprobar si el elemento está visible:", e);
            return false;
        }
    }
    
    // Función para animar los contadores - Corregida
    function initCounters() {
        const countersSection = $('#counters-section');
        
        // Verificar si el elemento existe
        if (countersSection.length === 0 || !isElementInViewport(countersSection) || countersSection.hasClass('counted')) {
            return;
        }
        
        countersSection.addClass('counted');
        
        $('.counter-number').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.attr('data-count') || '0');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Iniciar contador cuando sea visible al hacer scroll
    $(window).scroll(function() {
        initCounters();
    });
    
    // Verificar si el contador está visible al cargar la página
    $(document).ready(function() {
        setTimeout(initCounters, 500);
    });

    // Personalización del carrusel de testimonios
    const testimonialCarousel = $('#testimonialCarousel');
    
    if (testimonialCarousel.length) {
        // Inicializar el carrusel con configuración personalizada
        const carousel = new bootstrap.Carousel(testimonialCarousel[0], {
            interval: 5000,
            wrap: true,
            keyboard: true
        });
        
        // Variable para rastrear si el carrusel está pausado
        let isPaused = false;
        
        // Pausar el carrusel al pasar el mouse
        testimonialCarousel.on('mouseenter', function() {
            isPaused = true;
            carousel.pause();
        });
        
        // Reanudar el carrusel al quitar el mouse
        testimonialCarousel.on('mouseleave', function() {
            if (isPaused) {
                isPaused = false;
                carousel.cycle();
            }
        });
        
        // Animación personalizada para los items del carrusel
        testimonialCarousel.on('slide.bs.carousel', function(e) {
            // Obtener el ítem actual y el próximo
            const activeItem = $(e.relatedTarget);
            
            // Aplicar efecto de entrada
            setTimeout(function() {
                activeItem.find('.testimonial-card').css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }, 100);
            
            // Resetear efecto para otros ítems
            testimonialCarousel.find('.carousel-item:not(.active) .testimonial-card').css({
                'opacity': '0',
                'transform': 'translateY(20px)'
            });
        });
        
        // Contadores para mostrar progreso
        let totalItems = $('.carousel-item').length;
        let currentIndex = 1;
        
        // Actualizar contador si existe un elemento con clase counter
        if ($('.carousel-counter').length) {
            $('.carousel-counter').text(currentIndex + ' / ' + totalItems);
        }
        
        // Actualizar contador al cambiar de slide
        testimonialCarousel.on('slid.bs.carousel', function() {
            currentIndex = $('div.active').index() + 1;
            if ($('.carousel-counter').length) {
                $('.carousel-counter').text(currentIndex + ' / ' + totalItems);
            }
        });
        
        // Iniciar con animación del primer testimonio
        setTimeout(function() {
            testimonialCarousel.find('.carousel-item.active .testimonial-card').css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 200);
        
        // Funciones para control externo del carrusel si es necesario
        window.nextTestimonial = function() {
            carousel.next();
        };
        
        window.prevTestimonial = function() {
            carousel.prev();
        };
        
        window.jumpToTestimonial = function(index) {
            carousel.to(index);
        };
    }
});
