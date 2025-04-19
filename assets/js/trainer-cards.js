/**
 * Funcionalidades para la página de entrenadores:
 * - Tarjetas flip con click para dispositivos táctiles
 * - Barras de habilidades animadas
 * - Sistema de rating interactivo
 */
$(document).ready(function() {
    // Detectar dispositivos táctiles y habilitar flip por click
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        $('.flip-card').on('click', function() {
            $(this).toggleClass('flipped');
        });
    }
    
    // Animación de las barras de habilidades cuando son visibles
    function animateSkillBars() {
        $('.skill-progress').each(function() {
            const $this = $(this);
            const value = $this.data('value');
            
            // Si ya está animada, no hacer nada
            if ($this.hasClass('animated')) return;
            
            // Comprobar si está en el viewport
            const top = $this.offset().top;
            const bottom = top + $this.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (bottom > viewportTop && top < viewportBottom) {
                // Establecer el ancho final con animación de jQuery (sin usar easing personalizada)
                $this.addClass('animated');
                $this.find('.progress-bar').animate({
                    width: value + '%'
                }, 1500); // Quitado el easing personalizado
            }
        });
    }
    
    // Verificar las barras al cargar y al hacer scroll
    animateSkillBars();
    $(window).on('scroll', animateSkillBars);
    
    // Filtrado de entrenadores
    $('.filter-btn').on('click', function() {
        const filterValue = $(this).data('filter');
        
        // Actualizar botón activo
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filterValue === '*') {
            // Mostrar todos los entrenadores
            $('.trainer-item').removeClass('hidden').fadeIn();
        } else {
            // Ocultar los que no coinciden
            $('.trainer-item').not('.' + filterValue).addClass('hidden').fadeOut();
            // Mostrar los que coinciden
            $('.trainer-item.' + filterValue).removeClass('hidden').fadeIn();
        }
    });
    
    // Sistema de rating interactivo en el formulario
    $('.user-rating input').on('change', function() {
        const ratingValue = $(this).val();
        $('.live-rating-value').text(ratingValue + '/5');
    });
    
    // Hover para mostrar posible valoración antes de seleccionar
    $('.user-rating label').hover(
        function() {
            const value = $(this).prev('input').val();
            $('.live-rating-value').text(value + '/5');
        },
        function() {
            // Al quitar el mouse, volver al valor seleccionado o 0
            const selectedValue = $('.user-rating input:checked').val() || 0;
            $('.live-rating-value').text(selectedValue + '/5');
        }
    );
    
    // Completar nombre del entrenador en el formulario modal
    $('#trainerModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const trainerName = button.data('trainer');
        const modal = $(this);
        modal.find('#trainerName').val(trainerName);
    });
    
    // Validación y envío del formulario
    $('#sendContactForm').on('click', function() {
        const form = document.getElementById('trainerContactForm');
        
        if (form.checkValidity()) {
            // Mostrar spinner (opcional)
            $(this).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...');
            
            // Simulación de envío (reemplazar por AJAX real)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                $(this).html('Enviar');
                
                // Cerrar modal
                $('#trainerModal').modal('hide');
                
                // Mostrar alerta de éxito
                const alertHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>¡Enviado correctamente!</strong> El entrenador se pondrá en contacto contigo pronto.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                $('.container').prepend(alertHTML);
                
                // Resetear formulario
                form.reset();
                $('.live-rating-value').text('0/5');
            }, 1500);
            
        } else {
            // Mostrar validaciones nativas del navegador
            form.reportValidity();
        }
    });
    
    // Función para detectar cambios en elementos visibles
    function handleVisibilityChanges() {
        // Animación para elementos que entran en el viewport
        $('.trainer-item').each(function() {
            const $this = $(this);
            const top = $this.offset().top;
            const bottom = top + $this.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height() * 0.85;
            
            if (bottom > viewportTop && top < viewportBottom) {
                if (!$this.hasClass('animated')) {
                    $this.addClass('animated');
                    $this.find('.flip-card').css({
                        'opacity': 0,
                        'transform': 'translateY(20px)'
                    }).animate({
                        opacity: 1,
                        transform: 'translateY(0px)'
                    }, 600); // Sin easing personalizado
                }
            }
        });
    }
    
    // Ejecutar en carga y scroll
    handleVisibilityChanges();
    $(window).on('scroll', handleVisibilityChanges);
});
