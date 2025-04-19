/**
 * Script para la página de precios:
 * - Toggle entre precios mensuales/anuales
 * - Efectos interactivos para la tabla de precios
 * - Tooltips explicativos
 */
$(document).ready(function() {
    // Seleccionar elementos necesarios
    const $pricingSwitch = $('#pricing-switch');
    const $monthlyPrices = $('.monthly');
    const $annualPrices = $('.annual');
    const $savingsElements = $('.savings');
    const $pricingTable = $('.pricing-table');
    
    // Verificar si estamos en la página de precios
    if (!$pricingSwitch.length) return;
    
    console.log('Script de precios cargado');
    
    // Inicializar tooltips de Bootstrap
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Efectos avanzados para la tabla de precios
    if ($pricingTable.length) {
        // Efecto hover para resaltar filas completas
        $pricingTable.on('mouseenter', 'tbody tr', function() {
            $(this).addClass('highlighted-row');
        }).on('mouseleave', 'tbody tr', function() {
            $(this).removeClass('highlighted-row');
        });
        
        // Efecto hover para resaltar columnas completas
        $pricingTable.on('mouseenter', 'th, td', function() {
            if ($(this).is('th')) {
                // Si es un encabezado, obtener el índice para resaltar toda la columna
                let columnIndex = $(this).index();
                $pricingTable.find('tr').each(function() {
                    $(this).find('th, td').eq(columnIndex).addClass('highlighted-cell');
                });
            } else {
                // Si es una celda normal, resaltar solo la columna correspondiente
                let columnIndex = $(this).index();
                $pricingTable.find('tr').each(function() {
                    $(this).find('td').eq(columnIndex).addClass('highlighted-cell');
                });
            }
        }).on('mouseleave', 'th, td', function() {
            $pricingTable.find('.highlighted-cell').removeClass('highlighted-cell');
        });
        
        // Efecto de click para seleccionar un plan (opcional)
        $pricingTable.on('click', '.plan-header', function() {
            $pricingTable.find('.plan-header').removeClass('selected-plan');
            $(this).addClass('selected-plan');
            
            // Animar la selección
            $(this).addClass('pulse-animation');
            setTimeout(() => {
                $(this).removeClass('pulse-animation');
            }, 500);
            
            // Mostrar mensaje de plan seleccionado
            const planName = $(this).find('h3').text();
            showToast(`Has seleccionado el plan ${planName}`);
        });
    }

    // Función para mostrar notificación toast
    function showToast(message) {
        // Crear toast si no existe
        if ($('#priceToast').length === 0) {
            const toastHTML = `
                <div id="priceToast" class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body"></div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            `;
            $('body').append($('<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>').append(toastHTML));
        }
        
        // Configurar y mostrar el toast
        const $toast = $('#priceToast');
        $toast.find('.toast-body').text(message);
        
        const toast = new bootstrap.Toast($toast, {
            animation: true,
            autohide: true,
            delay: 3000
        });
        toast.show();
    }
    
    // Aplicar estado inicial y gestionar cambio entre precios mensuales y anuales
    function updatePrices() {
        const isAnnual = $pricingSwitch.prop('checked');
        
        console.log('Modo de precio:', isAnnual ? 'Anual' : 'Mensual');
        
        // Añadir/quitar clase al body para controlar estilos CSS
        $('body').toggleClass('annual-pricing', isAnnual);
        
        // Mostrar/ocultar precios mensuales/anuales con animación
        $monthlyPrices.css({
            'display': isAnnual ? 'none' : 'inline-block',
            'transform': 'translateY(20px)',
            'opacity': '0'
        });
        
        $annualPrices.css({
            'display': isAnnual ? 'inline-block' : 'none',
            'transform': 'translateY(20px)',
            'opacity': '0'
        });
        
        // Aplicar animación a los precios visibles
        setTimeout(() => {
            if (isAnnual) {
                $annualPrices.css({
                    'transform': 'translateY(0)',
                    'opacity': '1'
                });
            } else {
                $monthlyPrices.css({
                    'transform': 'translateY(0)',
                    'opacity': '1'
                });
            }
        }, 50);
        
        // Mostrar/ocultar mensajes de ahorro con animación
        $savingsElements.animate({
            opacity: isAnnual ? 1 : 0,
            height: isAnnual ? 'auto' : '0'
        }, 300);
        
        // Añadir animación a las tarjetas
        $('.pricing-card').each(function(index) {
            $(this).removeClass('price-changing');
            void this.offsetWidth; // Trigger reflow para reiniciar la animación
            $(this).addClass('price-changing');
            
            // Resaltar el ahorro en planes anuales
            const $savings = $(this).find('.savings');
            if (isAnnual && $savings.length) {
                setTimeout(() => {
                    $savings.addClass('highlight-savings');
                    setTimeout(() => {
                        $savings.removeClass('highlight-savings');
                    }, 1000);
                }, index * 100 + 200);
            }
        });
        
        // Cambiar texto en la tabla según plan seleccionado
        $('.cta-row a').each(function() {
            const buttonText = isAnnual ? 'Contratar plan anual' : 'Contratar plan mensual';
            $(this).text(buttonText);
        });
    }
    
    // Ejecutar al inicio
    updatePrices();
    
    // Cambiar precios cuando se active/desactive el switch
    $pricingSwitch.on('change', function() {
        updatePrices();
        
        // Mostrar mensaje del modo seleccionado
        const modeText = $(this).prop('checked') ? 'Precios anuales' : 'Precios mensuales';
        showToast(`${modeText} activados`);
    });
    
    // Manejar los tooltips personalizados para características específicas
    $('.feature-info').on('click', function(e) {
        e.preventDefault();
        const featureInfo = $(this).data('feature-info');
        
        // Crear un tooltip personalizado con más detalles
        $('<div class="custom-tooltip"></div>')
            .html(featureInfo)
            .appendTo('body')
            .css({
                top: e.pageY - 20,
                left: e.pageX + 20
            })
            .fadeIn(200);
            
        // Ocultar después de un tiempo o al hacer clic
        setTimeout(function() {
            $('.custom-tooltip').fadeOut(200, function() {
                $(this).remove();
            });
        }, 3000);
    });
    
    // Cerrar tooltips personalizados al hacer clic en cualquier lugar
    $(document).on('click', function(e) {
        if (!$(e.target).hasClass('feature-info')) {
            $('.custom-tooltip').fadeOut(200, function() {
                $(this).remove();
            });
        }
    });
    
    // Animación para FAQs
    $('.accordion-button').on('click', function() {
        if (!$(this).hasClass('collapsed')) {
            $(this).closest('.accordion-item')
                .addClass('highlight-faq')
                .siblings()
                .removeClass('highlight-faq');
        }
    });
});
