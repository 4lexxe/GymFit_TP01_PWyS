/**
 * Script para funcionalidades del blog fitness:
 * - Filtrado de artículos por tags
 * - Interacciones de comentarios (responder, destacar, likes)
 * - Animaciones con AOS (Animate On Scroll)
 */
$(document).ready(function() {
    console.log('Blog script loaded');
    
    // Inicializar AOS para animaciones de scroll
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
    });

    // Filtros de tags para artículos
    $('.filter-tag').on('click', function() {
        const tag = $(this).data('tag');
        
        // Actualizar estado activo de los botones
        $('.filter-tag').removeClass('active');
        $(this).addClass('active');
        
        if (tag === 'all') {
            // Mostrar todos los artículos con animación
            $('.blog-post').fadeIn(300).css({
                'opacity': '',
                'transform': ''
            });
        } else {
            // Filtrar artículos según el tag
            $('.blog-post').each(function() {
                const postTags = $(this).data('tags');
                
                if (postTags && postTags.includes(tag)) {
                    $(this).fadeIn(400).css({
                        'opacity': '',
                        'transform': ''
                    });
                } else {
                    $(this).fadeOut(200);
                }
            });
        }
        
        // Refrescar las animaciones de AOS después del filtrado
        setTimeout(function() {
            AOS.refresh();
        }, 500);
    });

    // Sistema de comentarios: Responder
    $('.reply-btn').on('click', function() {
        // Cerrar todos los otros formularios de respuesta
        $('.reply-form').not($(this).closest('.comment-content').find('.reply-form')).addClass('d-none');
        
        // Mostrar/ocultar el formulario de respuesta correspondiente
        $(this).closest('.comment-content').find('.reply-form').toggleClass('d-none');
        
        // Si se está mostrando, enfocar el textarea
        if (!$(this).closest('.comment-content').find('.reply-form').hasClass('d-none')) {
            $(this).closest('.comment-content').find('textarea').focus();
        }
    });

    // Cancelar respuesta
    $('.cancel-reply-btn').on('click', function() {
        $(this).closest('.reply-form').addClass('d-none');
    });

    // Enviar respuesta (simulado)
    $('.reply-form').on('submit', function(e) {
        e.preventDefault();
        
        const replyText = $(this).find('textarea').val().trim();
        if (!replyText) return;
        
        // Generar iniciales del comentarista (normalmente se obtendría del usuario logueado)
        const userInitials = 'UV'; // Usuario visitante
        
        // Crear nuevo elemento de respuesta
        const newReply = `
            <div class="reply-item" style="opacity: 0; transform: translateY(20px);">
                <div class="comment-avatar" data-initials="${userInitials}"></div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h5 class="comment-author">Usuario</h5>
                        <span class="comment-date">Ahora</span>
                    </div>
                    <div class="comment-text">
                        <p>${replyText}</p>
                    </div>
                    <div class="comment-actions">
                        <button class="btn-link like-btn"><i class="bi bi-hand-thumbs-up"></i> <span class="likes-count">0</span></button>
                    </div>
                </div>
            </div>
        `;
        
        // Determinar dónde insertar la respuesta
        let $repliesContainer = $(this).closest('.comment-content').find('.comment-replies');
        
        // Si no existe el contenedor de respuestas, crearlo
        if ($repliesContainer.length === 0) {
            $repliesContainer = $('<div class="comment-replies"></div>');
            $(this).after($repliesContainer);
        }
        
        // Añadir la nueva respuesta con animación
        const $newReplyElement = $(newReply).appendTo($repliesContainer);
        
        setTimeout(() => {
            $newReplyElement.css({
                'opacity': '1',
                'transform': 'translateY(0)',
                'transition': 'all 0.5s ease-out'
            });
        }, 50);
        
        // Ocultar el formulario y limpiar el texto
        $(this).addClass('d-none').find('textarea').val('');
        
        // Mostrar notificación de éxito
        showNotification('Tu respuesta ha sido publicada');
    });

    // Función para mostrar notificaciones
    function showNotification(message) {
        // Crear elemento de notificación si no existe
        if ($('#notification').length === 0) {
            $('body').append(`
                <div id="notification" class="blog-notification">
                    <div class="notification-content"></div>
                </div>
            `);
        }
        
        // Mostrar mensaje
        $('#notification .notification-content').text(message);
        $('#notification').addClass('active');
        
        // Auto-ocultar después de 3 segundos
        setTimeout(() => {
            $('#notification').removeClass('active');
        }, 3000);
    }

    // Sistema de like para comentarios
    $('.like-btn').on('click', function() {
        // Toggle del estado activo
        $(this).toggleClass('active');
        
        // Actualizar el icono
        if ($(this).hasClass('active')) {
            $(this).find('i').removeClass('bi-hand-thumbs-up').addClass('bi-hand-thumbs-up-fill');
        } else {
            $(this).find('i').removeClass('bi-hand-thumbs-up-fill').addClass('bi-hand-thumbs-up');
        }
        
        // Actualizar contador
        const $counter = $(this).find('.likes-count');
        let count = parseInt($counter.text());
        
        if ($(this).hasClass('active')) {
            $counter.text(count + 1);
        } else {
            $counter.text(Math.max(0, count - 1));
        }
    });

    // Destacar comentarios
    $('.comment-highlight-btn').on('click', function() {
        const $commentItem = $(this).closest('.comment-item');
        const wasHighlighted = $commentItem.hasClass('highlighted');
        
        // Actualizar estado del botón
        $(this).toggleClass('active');
        
        if ($(this).hasClass('active')) {
            // Destacar comentario
            $(this).find('i').removeClass('bi-star').addClass('bi-star-fill');
            $(this).attr('data-tooltip', 'Quitar destacado');
            $commentItem.addClass('highlighted');
            
            if (!wasHighlighted) {
                showNotification('Comentario destacado');
            }
        } else {
            // Quitar destacado
            $(this).find('i').removeClass('bi-star-fill').addClass('bi-star');
            $(this).attr('data-tooltip', 'Destacar comentario');
            $commentItem.removeClass('highlighted');
            
            if (wasHighlighted) {
                showNotification('Se quitó el destacado del comentario');
            }
        }
    });

    // Enviar un nuevo comentario
    $('.comment-form').on('submit', function(e) {
        e.preventDefault();
        
        // Validar campos requeridos
        const name = $('#commentName').val().trim();
        const email = $('#commentEmail').val().trim();
        const comment = $('#commentText').val().trim();
        
        if (!name || !email || !comment) {
            showNotification('Por favor completa todos los campos obligatorios');
            return;
        }
        
        // Generar iniciales del autor
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        
        // Crear nuevo comentario
        const newComment = `
            <div class="comment-item" style="opacity: 0; transform: translateY(20px);">
                <div class="comment-avatar" data-initials="${initials}"></div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4 class="comment-author">${name}</h4>
                        <span class="comment-date">Ahora</span>
                        <button class="comment-highlight-btn" data-tooltip="Destacar comentario">
                            <i class="bi bi-star"></i>
                        </button>
                    </div>
                    <div class="comment-text">
                        <p>${comment}</p>
                    </div>
                    <div class="comment-actions">
                        <button class="btn-link reply-btn"><i class="bi bi-reply"></i> Responder</button>
                        <button class="btn-link like-btn"><i class="bi bi-hand-thumbs-up"></i> <span class="likes-count">0</span></button>
                    </div>
                    
                    <!-- Formulario de respuesta -->
                    <form class="reply-form d-none">
                        <div class="form-group">
                            <textarea class="form-control" rows="3" placeholder="Escribe tu respuesta..."></textarea>
                        </div>
                        <div class="form-group mt-2 text-end">
                            <button type="button" class="btn btn-sm btn-secondary cancel-reply-btn me-2">Cancelar</button>
                            <button type="submit" class="btn btn-sm btn-primary">Enviar respuesta</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Añadir el comentario al inicio de la lista con animación
        const $newCommentElement = $(newComment).prependTo('.comments-container');
        
        setTimeout(() => {
            $newCommentElement.css({
                'opacity': '1',
                'transform': 'translateY(0)',
                'transition': 'all 0.5s ease-out'
            });
        }, 50);
        
        // Limpiar formulario
        this.reset();
        
        // Actualizar handlers de eventos para el nuevo comentario
        attachEventsToNewComment($newCommentElement);
        
        // Mostrar notificación
        showNotification('¡Gracias por tu comentario!');
        
        // Scroll suave hasta el nuevo comentario
        $('html, body').animate({
            scrollTop: $newCommentElement.offset().top - 100
        }, 800);
    });

    // Añadir eventos a comentarios nuevos
    function attachEventsToNewComment($comment) {
        // Botón de responder
        $comment.find('.reply-btn').on('click', function() {
            $('.reply-form').not($(this).closest('.comment-content').find('.reply-form')).addClass('d-none');
            $(this).closest('.comment-content').find('.reply-form').toggleClass('d-none');
            
            if (!$(this).closest('.comment-content').find('.reply-form').hasClass('d-none')) {
                $(this).closest('.comment-content').find('textarea').focus();
            }
        });
        
        // Botón de cancelar respuesta
        $comment.find('.cancel-reply-btn').on('click', function() {
            $(this).closest('.reply-form').addClass('d-none');
        });
        
        // Formulario de respuesta
        $comment.find('.reply-form').on('submit', function(e) {
            e.preventDefault();
            // Misma lógica que para otros formularios de respuesta
        });
        
        // Botón de like
        $comment.find('.like-btn').on('click', function() {
            $(this).toggleClass('active');
            
            if ($(this).hasClass('active')) {
                $(this).find('i').removeClass('bi-hand-thumbs-up').addClass('bi-hand-thumbs-up-fill');
            } else {
                $(this).find('i').removeClass('bi-hand-thumbs-up-fill').addClass('bi-hand-thumbs-up');
            }
            
            const $counter = $(this).find('.likes-count');
            let count = parseInt($counter.text());
            
            if ($(this).hasClass('active')) {
                $counter.text(count + 1);
            } else {
                $counter.text(Math.max(0, count - 1));
            }
        });
        
        // Botón de destacar
        $comment.find('.comment-highlight-btn').on('click', function() {
            const $commentItem = $(this).closest('.comment-item');
            const wasHighlighted = $commentItem.hasClass('highlighted');
            
            $(this).toggleClass('active');
            
            if ($(this).hasClass('active')) {
                $(this).find('i').removeClass('bi-star').addClass('bi-star-fill');
                $(this).attr('data-tooltip', 'Quitar destacado');
                $commentItem.addClass('highlighted');
                
                if (!wasHighlighted) {
                    showNotification('Comentario destacado');
                }
            } else {
                $(this).find('i').removeClass('bi-star-fill').addClass('bi-star');
                $(this).attr('data-tooltip', 'Destacar comentario');
                $commentItem.removeClass('highlighted');
                
                if (wasHighlighted) {
                    showNotification('Se quitó el destacado del comentario');
                }
            }
        });
    }
});
