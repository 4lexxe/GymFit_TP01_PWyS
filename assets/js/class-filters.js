/**
 * Filtros avanzados con jQuery para la página de clases
 */
$(document).ready(function() {
    // Inicialización
    console.log('Class filters initialized');
    
    // Toggle entre filtros CSS y jQuery
    const $filterMethodToggle = $('#filterMethodToggle');
    const $cssFilters = $('.filter-options');
    const $jqueryFilters = $('.jquery-filters');
    
    // Función para cambiar entre métodos de filtrado
    $filterMethodToggle.on('change', function() {
        if ($(this).is(':checked')) {
            // Activar filtros jQuery
            $cssFilters.addClass('d-none');
            $jqueryFilters.removeClass('d-none');
            initializeJQueryFilters();
        } else {
            // Activar filtros CSS
            $jqueryFilters.addClass('d-none');
            $cssFilters.removeClass('d-none');
            // Mostrar todas las clases al volver a CSS
            $('#all').prop('checked', true);
            $('.class-item').show();
        }
    });
    
    // Inicializar filtros jQuery
    function initializeJQueryFilters() {
        // Mostrar todas las clases al inicio
        $('.class-item').show();
        
        // Configurar el primer botón como activo
        $('.jquery-filters .filter-btn:first-child').addClass('active');
        
        // Manejar clicks en botones de filtro
        $('.jquery-filters .filter-btn').on('click', function() {
            // Quitar clase active de todos los botones
            $('.jquery-filters .filter-btn').removeClass('active');
            
            // Agregar clase active al botón seleccionado
            $(this).addClass('active');
            
            // Obtener categoría a filtrar
            const filterValue = $(this).data('filter');
            
            // Aplicar filtrado con efectos
            if (filterValue === 'all') {
                // Mostrar todas las clases con animación
                $('.class-item').each(function(index) {
                    const $item = $(this);
                    setTimeout(function() {
                        $item.fadeIn(300).css({
                            'transform': 'scale(1)',
                            'opacity': '1'
                        });
                    }, index * 100);
                });
            } else {
                // Ocultar clases que no coinciden con el filtro
                $('.class-item').not(`[data-category="${filterValue}"]`).fadeOut(300).css({
                    'transform': 'scale(0.8)',
                    'opacity': '0'
                });
                
                // Mostrar clases que coinciden con el filtro
                $(`.class-item[data-category="${filterValue}"]`).each(function(index) {
                    const $item = $(this);
                    setTimeout(function() {
                        $item.fadeIn(300).css({
                            'transform': 'scale(1)',
                            'opacity': '1'
                        });
                    }, index * 100);
                });
            }
        });
    }
    
    // Funcionalidad para el modal
    $('.card').on('click', '.btn[data-bs-target="#classModal"]', function() {
        // Obtener información de la clase seleccionada
        const className = $(this).closest('.card').find('.card-title').text();
        const classDescription = $(this).closest('.card').find('.card-text').text();
        const classCategory = $(this).closest('.card').find('.category-tag').text();
        const classImage = $(this).closest('.card').find('img').attr('src');
        
        // Actualizar el modal con la información
        $('#modalClassName').text(className);
        $('#classModal .modal-body p').text(classDescription);
        $('#classModal .img-fluid').attr('src', classImage);
        
        // Agregar categoría al título
        $('#classModalLabel').html(`${className} <span class="badge bg-primary">${classCategory}</span>`);
    });
    
    // Funcionalidad para mostrar detalles al hover en tarjetas
    $('.card').hover(
        function() {
            $(this).find('.class-details').slideDown(300);
        },
        function() {
            $(this).find('.class-details').slideUp(300);
        }
    );
    
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    
    // Inicialización de animaciones para tarjetas
    $('.class-item').each(function(index) {
        const $item = $(this);
        setTimeout(function() {
            $item.addClass('show');
        }, index * 100);
    });
    
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
    
    // Añadir funcionalidad para filtrado específico de horarios
    $('#schedule-filter').on('change', function() {
        const day = $(this).val();
        
        if (day === 'all') {
            $('.schedule-table tbody tr').show();
        } else {
            $('.schedule-table tbody tr').each(function() {
                const dayColumn = $(this).find('td').eq(day === 'weekday' ? 1 : (day === 'saturday' ? 2 : 3));
                const hasClass = dayColumn.text().trim() !== '-';
                
                if (hasClass) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });
    
    // Añadir funcionalidad de búsqueda para horarios
    $('#schedule-search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        if (!searchTerm) {
            $('.schedule-table tbody tr').show();
            return;
        }
        
        $('.schedule-table tbody tr').each(function() {
            const classText = $(this).text().toLowerCase();
            if (classText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
