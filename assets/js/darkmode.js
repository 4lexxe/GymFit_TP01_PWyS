// Script mejorado para manejar el modo oscuro
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de modo oscuro cargado');
    
    // Obtener elementos del DOM
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeSlider = document.querySelector('.theme-toggle-slider');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (!darkModeToggle) {
        console.error('No se encontró el elemento darkModeToggle');
        return;
    }
    
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    
    // Función para activar modo oscuro
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        if (themeSlider) themeSlider.setAttribute('aria-pressed', 'true');
        localStorage.setItem('theme', 'dark');
        console.log('Modo oscuro activado');
        // Forzar repintado del DOM para asegurar que los cambios se aplican
        document.body.style.display = 'none';
        // Este timeout fuerza al navegador a hacer un reflow
        setTimeout(() => document.body.style.display = '', 5);
        
        // Notificar visualmente al usuario que se cambió el modo
        showThemeChangeNotification('Modo oscuro activado');
    }
    
    // Función para activar modo claro
    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
        if (themeSlider) themeSlider.setAttribute('aria-pressed', 'false');
        localStorage.setItem('theme', 'light');
        console.log('Modo claro activado');
        // Forzar repintado del DOM
        document.body.style.display = 'none';
        setTimeout(() => document.body.style.display = '', 5);
        
        // Notificar visualmente al usuario que se cambió el modo
        showThemeChangeNotification('Modo claro activado');
    }
    
    // Función para mostrar una notificación temporal
    function showThemeChangeNotification(message) {
        let notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '80px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '10px 15px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
    
    // Aplicar tema según preferencias guardadas o del sistema
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else if (savedTheme === 'light') {
        disableDarkMode();
    } else if (prefersDarkScheme.matches) {
        enableDarkMode();
    }
    
    // Cambiar tema al hacer clic en el toggle
    darkModeToggle.addEventListener('change', function() {
        console.log('Toggle cambiado:', darkModeToggle.checked);
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
    
    // Escuchar cambios en la preferencia del sistema
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
});
