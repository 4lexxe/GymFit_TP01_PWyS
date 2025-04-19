/**
 * Script para manejar la interacción con la política de privacidad
 */
$(document).ready(function() {
    // Aceptar política de privacidad desde el modal
    $('#acceptPrivacy').on('click', function() {
        $('#privacyPolicy').prop('checked', true).removeClass('is-invalid');
        
        // Mostrar una pequeña notificación de confirmación
        const $formCheck = $('#privacyPolicy').closest('.form-check');
        
        // Agregar una notificación temporal
        const $notification = $('<div class="privacy-accepted-notification">Política aceptada</div>')
            .css({
                'position': 'absolute',
                'right': '0',
                'bottom': '-20px',
                'background-color': 'var(--success-color)',
                'color': 'white',
                'padding': '3px 8px',
                'border-radius': '4px',
                'font-size': '0.8rem',
                'opacity': '0',
                'transition': 'opacity 0.3s'
            })
            .appendTo($formCheck);
        
        setTimeout(() => {
            $notification.css('opacity', '1');
        }, 100);
        
        setTimeout(() => {
            $notification.css('opacity', '0');
            setTimeout(() => $notification.remove(), 300);
        }, 2000);
        
        // Actualiza el estado del formulario
        updateFormStatus();
    });
    
    // Función para actualizar el estado del formulario
    function updateFormStatus() {
        const $submitBtn = $('#submitBtn');
        const $privacyPolicy = $('#privacyPolicy');
        const $formInputs = $('#contactForm').find('input[required], textarea[required]');
        
        // Verificar si todos los campos requeridos son válidos
        const allInputsValid = Array.from($formInputs).every(input => input.checkValidity());
        const privacyAccepted = $privacyPolicy.is(':checked');
        
        // Actualizar estado del botón con transición suave
        if (allInputsValid && privacyAccepted) {
            $submitBtn.removeClass('btn-secondary').addClass('btn-primary');
        } else {
            $submitBtn.removeClass('btn-primary').addClass('btn-secondary');
        }
    }
    
    // Abrir el modal de política de privacidad desde el link
    $('a[data-bs-target="#privacyModal"]').on('click', function(e) {
        e.preventDefault();
        const privacyModal = new bootstrap.Modal(document.getElementById('privacyModal'));
        privacyModal.show();
    });
});
