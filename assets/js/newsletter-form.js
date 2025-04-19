/**
 * Newsletter form validation and submission with jQuery
 */
$(document).ready(function() {
    // Seleccionar el formulario de newsletter
    const $newsletterForm = $('#newsletterForm');
    const $submitBtn = $newsletterForm.find('.submit-btn');
    const $spinner = $submitBtn.find('.spinner');
    const $successMessage = $('#successMessage');
    const $errorMessage = $('#errorMessage');
    const $emailInput = $newsletterForm.find('input[type="email"]');

    // Validación de Bootstrap
    $newsletterForm.on('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        // Resetear mensajes
        $successMessage.css('opacity', 0);
        $errorMessage.css('opacity', 0);
        
        // Comprobar validez del formulario
        if ($newsletterForm[0].checkValidity() === false) {
            $newsletterForm.addClass('was-validated');
            return;
        }

        // Si es válido, mostrar spinner y enviar
        $submitBtn.prop('disabled', true);
        $submitBtn.find('i').hide();
        $spinner.css('display', 'inline-block');
        
        // Simular envío del formulario (reemplazar con llamada AJAX real en producción)
        setTimeout(function() {
            // Simulación de respuesta exitosa (90% éxito / 10% error para demostrar ambos casos)
            const success = Math.random() > 0.1;
            
            if (success) {
                // Éxito
                $successMessage.css('opacity', 1);
                $emailInput.val('');
                $newsletterForm.removeClass('was-validated');
            } else {
                // Error
                $errorMessage.css('opacity', 1);
            }
            
            // Restaurar botón
            $spinner.hide();
            $submitBtn.find('i').show();
            $submitBtn.prop('disabled', false);
            
            // Ocultar mensaje después de un tiempo
            setTimeout(function() {
                $successMessage.css('opacity', 0);
                $errorMessage.css('opacity', 0);
            }, 5000);
        }, 1500); // Simular tiempo de carga
    });
    
    // Validación en tiempo real
    $emailInput.on('input', function() {
        if ($newsletterForm.hasClass('was-validated')) {
            $newsletterForm[0].checkValidity();
        }
    });
});
