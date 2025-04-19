/**
 * Script para el formulario de contacto avanzado
 * - Validación en tiempo real con Bootstrap y jQuery
 * - Spinner al enviar
 * - Modal de confirmación
 */
$(document).ready(function() {
    // Cache elementos DOM
    const $contactForm = $('#contactForm');
    const $submitBtn = $('#submitBtn');
    const $submitSpinner = $('#submitSpinner');
    const $submitText = $('#submitText');
    const $messageInput = $('#message');
    const $charCount = $('#charCount');
    const $formInputs = $contactForm.find('input, textarea');
    const maxCharacters = 500;
    
    // Modal de confirmación
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    
    // Función de validación en tiempo real para campos individuales - mejorada
    function validateField(field) {
        const $field = $(field);
        
        // Verificar validez según reglas HTML5
        const isValid = field.checkValidity();
        
        // Aplicar estilos y feedbacks visuales inmediatamente
        if (isValid) {
            $field.removeClass('is-invalid').addClass('is-valid');
            // Mostrar feedback positivo con animación
            $field.siblings('.valid-feedback').fadeIn(200);
            $field.siblings('.invalid-feedback').hide();
        } else {
            $field.removeClass('is-valid').addClass('is-invalid');
            // Mostrar feedback negativo con animación
            $field.siblings('.invalid-feedback').fadeIn(200);
            $field.siblings('.valid-feedback').hide();
        }
        
        // Actualizar el estado del formulario
        updateFormStatus();
        
        return isValid;
    }
    
    // Función para actualizar el estado general del formulario
    function updateFormStatus() {
        const allValid = Array.from($formInputs).every(input => input.checkValidity());
        
        if (allValid && $('#privacyPolicy').is(':checked')) {
            $submitBtn.removeClass('btn-secondary').addClass('btn-primary');
        } else {
            $submitBtn.removeClass('btn-primary').addClass('btn-secondary');
        }
    }
    
    // Validación en tiempo real para todos los campos con debounce
    let debounceTimeout;
    $formInputs.on('input', function() {
        const field = this;
        
        // Limpiar timeout anterior
        clearTimeout(debounceTimeout);
        
        // Establecer nuevo timeout para ejecutar validación
        debounceTimeout = setTimeout(function() {
            validateField(field);
        }, 300); // Esperar 300ms después de que el usuario deje de escribir
    });
    
    // Contador de caracteres para el textarea con actualización en tiempo real
    $messageInput.on('input', function() {
        const currentLength = $(this).val().length;
        $charCount.text(currentLength);
        
        // Animación del contador
        $charCount.addClass('pulse');
        setTimeout(() => $charCount.removeClass('pulse'), 300);
        
        // Cambiar color del contador cuando se acerca al límite
        if (currentLength > maxCharacters * 0.9) {
            $charCount.css({'color': '#dc3545', 'font-weight': 'bold'}).addClass('warning-shake');
        } else if (currentLength > maxCharacters * 0.7) {
            $charCount.css({'color': '#fd7e14', 'font-weight': '500'}).removeClass('warning-shake');
        } else {
            $charCount.css({'color': '', 'font-weight': 'normal'}).removeClass('warning-shake');
        }
        
        // Limitar caracteres
        if (currentLength > maxCharacters) {
            $(this).val($(this).val().substring(0, maxCharacters));
            $charCount.text(maxCharacters);
            
            // Mostrar alerta de límite con una experiencia mejorada para móvil
            $('.char-limit-alert')
                .fadeIn(200)
                .css('display', 'block')
                .delay(2000)
                .fadeOut(200);
        }
    });
    
    // Validación especial para el checkbox de política de privacidad
    $('#privacyPolicy').on('change', function() {
        if ($(this).is(':checked')) {
            $(this).removeClass('is-invalid').closest('.form-check').find('.invalid-feedback').fadeOut(200);
        } else {
            $(this).addClass('is-invalid').closest('.form-check').find('.invalid-feedback').fadeIn(200);
        }
        updateFormStatus();
    });
    
    // Manejo del envío del formulario con validación mejorada
    $contactForm.on('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        let isFormValid = true;
        $formInputs.each(function() {
            if (!validateField(this)) {
                isFormValid = false;
            }
        });
        
        // Validar el checkbox de privacidad
        if (!$('#privacyPolicy').is(':checked')) {
            $('#privacyPolicy').addClass('is-invalid').closest('.form-check').find('.invalid-feedback').fadeIn(200);
            isFormValid = false;
        }
        
        if (!isFormValid) {
            // Animar el formulario para indicar error
            $contactForm.addClass('shake');
            setTimeout(() => $contactForm.removeClass('shake'), 500);
            
            // Usar la función mejorada
            scrollToInvalidField();
            return;
        }
        
        // Recopilar datos del formulario
        const formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone: $('#phone').val().trim() || 'No proporcionado',
            subject: $('#subject').val(),
            message: $('#message').val(),
            privacyPolicy: $('#privacyPolicy').is(':checked')
        };
        
        // Mostrar spinner y deshabilitar botón con animación
        $submitText.fadeOut(200, function() {
            $submitSpinner.fadeIn(200);
            $submitText.text('Enviando...').fadeIn(200);
        });
        $submitBtn.prop('disabled', true).addClass('processing');
        
        // Simular envío AJAX (reemplazar con llamada AJAX real)
        setTimeout(function() {
            // Completar datos en el modal de confirmación
            $('#confirmationDetails').html(`
                Hemos recibido tu mensaje <strong>${formData.firstName} ${formData.lastName}</strong>.<br>
                Te contactaremos a <strong>${formData.email}</strong> a la brevedad.<br><br>
                <small class="text-muted">Referencia: ${Date.now()}</small>
            `);
            
            // Restaurar botón
            $submitSpinner.fadeOut(200);
            $submitText.text('Enviar Mensaje');
            $submitBtn.prop('disabled', false).removeClass('processing');
            
            // Mostrar modal de confirmación con animación
            confirmationModal.show();
            $('.checkmark-circle').addClass('animate');
            $('.checkmark-check').addClass('animate');
            
            // Reproducir sonido de éxito (opcional)
            // const successSound = new Audio('../assets/sounds/success.mp3');
            // successSound.play();
            
            // Reiniciar formulario y validaciones con animación
            $contactForm.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
            $contactForm[0].reset();
            $charCount.text('0');
            
            // Animar sección de formulario
            $('.contact-form-container').addClass('success-animation');
            setTimeout(() => $('.contact-form-container').removeClass('success-animation'), 1000);
        }, 2000); // Simular tiempo de carga
    });
    
    // Manejo avanzado del modal de confirmación
    $('#confirmationModal').on('shown.bs.modal', function() {
        // Iniciar animación del checkmark cuando se muestra el modal
        $('.success-animation').addClass('animate');
        
        // Enfocar al botón "Aceptar" por accesibilidad
        $(this).find('.modal-footer .btn-primary').focus();
        
        // Configurar cierre automático después de 8 segundos
        setTimeout(() => {
            if ($(this).hasClass('show')) {
                confirmationModal.hide();
            }
        }, 8000);
    });
    
    $('#confirmationModal').on('hidden.bs.modal', function() {
        // Resetear animaciones
        $('.success-animation').removeClass('animate');
        
        // Scroll hacia arriba con animación
        $('html, body').animate({
            scrollTop: $contactForm.offset().top - 100
        }, 500);
    });
    
    // Validación de campos en tiempo real al perder el foco
    $formInputs.on('blur', function() {
        // Solo validar si el campo no está vacío o si es requerido
        if ($(this).val().trim() !== '' || $(this).prop('required')) {
            validateField(this);
        }
    });
    
    // Efectos visuales para mejorar UX
    $formInputs.on('focus', function() {
        // Animar etiqueta al enfocar
        $(this).parent().find('label').addClass('text-primary').addClass('focused');
    }).on('blur', function() {
        // Restaurar etiqueta al perder foco
        $(this).parent().find('label').removeClass('text-primary').removeClass('focused');
    });
    
    // Inicialización de tooltips para campos con información adicional
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Animación de entrada para elementos del formulario
    function animateFormElements() {
        $('.contact-form-container, .contact-card').css({
            'opacity': 0,
            'transform': 'translateY(20px)'
        });
        
        setTimeout(function() {
            $('.contact-form-container').animate({
                'opacity': 1,
                'transform': 'translateY(0)'
            }, 500);
            
            setTimeout(function() {
                $('.contact-card').animate({
                    'opacity': 1,
                    'transform': 'translateY(0)'
                }, 500);
            }, 300);
        }, 300);
    }
    
    // Manejar el scroll en móviles más suavemente
    function scrollToInvalidField() {
        const $firstInvalid = $contactForm.find('.is-invalid').first();
        
        if ($firstInvalid.length) {
            const offset = $firstInvalid.offset().top;
            const scrollPosition = offset - window.innerHeight * 0.2;
            
            $('html, body').animate({
                scrollTop: scrollPosition
            }, {
                duration: 500,
                complete: function() {
                    setTimeout(function() {
                        $firstInvalid.focus();
                    }, 200);
                }
            });
        }
    }
    
    // Iniciar animaciones
    animateFormElements();
});
