# 3. Implementación Frontend

## 3.1 Estructura HTML Semántica

La implementación HTML del sitio se desarrolló priorizando la semántica correcta para mejorar la accesibilidad, SEO y mantenibilidad del código.

### 3.1.1 Uso de Elementos Semánticos

Se implementaron elementos HTML5 semánticos para proporcionar estructura y significado al contenido:

```html
<header class="header clip-diagonal">
  <nav class="nav-main">
    <!-- Navegación principal -->
  </nav>
</header>

<main id="main-content">
  <section class="hero snap-section">
    <!-- Contenido principal visible -->
  </section>
  
  <section class="features snap-section">
    <!-- Características destacadas -->
  </section>
  
  <!-- Más secciones... -->
</main>

<footer class="footer">
  <!-- Pie de página con información de contacto -->
</footer>
```

### 3.1.2 Atributos de Accesibilidad

Se implementaron atributos ARIA y otros elementos de accesibilidad para mejorar la experiencia de usuarios con tecnologías asistivas:

```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>

<button class="carousel-control prev" id="prev-btn" aria-label="Testimonio anterior">❮</button>

<img src="assets/images/yoga.png" alt="Personas practicando yoga en grupo">

<label for="pricing-switch" class="pricing-label">
  <span>Mensual</span>
  <span>Anual</span>
  <div class="toggle-slider"></div>
</label>
```

### 3.1.3 Metadata y SEO

Se aplicaron prácticas de SEO técnico mediante metadatos descriptivos:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GymFit - Tu gimnasio de confianza</title>
  <meta name="description" content="GymFit ofrece clases de fitness, entrenamiento personal y nutrición para todos los niveles. Transforma tu vida con nuestros planes personalizados.">
  <!-- Preload para recursos esenciales -->
  <link rel="preload" href="assets/video/gym-background.mp4" as="video" type="video/mp4">
  <link rel="preload" href="assets/css/utils/colors.css" as="style">
</head>
```

## 3.2 Arquitectura CSS

### 3.2.1 Sistema de Arquitectura ITCSS (Adaptado)

Se implementó una versión adaptada de la arquitectura ITCSS (Inverted Triangle CSS) para organizar los estilos por especificidad y alcance:

1. **Configuración** (utils/): Variables y configuraciones globales
2. **Elementos** (components/): Estilos específicos de componentes
3. **Objetos** (layout/): Estructuras de layout reusables
4. **Utilidades** (utils/effects.css): Clases de utilidad para modificaciones puntuales

Esta organización permite:
- Control preciso sobre la cascada CSS
- Prevención de especificidad conflictiva
- Mejor rendimiento del navegador al procesar CSS

### 3.2.2 Sistema de Variables CSS

Se desarrolló un sistema completo de variables CSS para unificar y facilitar el mantenimiento:

```css
:root {
  /* Colores principales */
  --primary-color: #4CAF50;
  --secondary-color: #2196F3;
  --accent-color: #FF4081;
  
  /* Escala de grises */
  --gray-100: #f8f9fa;
  --gray-200: #e9ecef;
  /* ... */
  
  /* Fuentes y tipografía */
  --font-primary: 'Poppins', sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.5;
  
  /* Espaciado y ritmo vertical */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Bordes y sombras */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.1);
}
```

### 3.2.3 Sistema de Diseño

Se creó un sistema de diseño consistente aplicado a través de CSS:

```css
/* Sistema tipográfico escalable */
h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }

/* Sistema de espaciado consistente */
.mb-1 { margin-bottom: var(--spacing-xs); }
.mb-2 { margin-bottom: var(--spacing-sm); }
.mb-3 { margin-bottom: var(--spacing-md); }

/* Sistema de colores */
.bg-primary { background-color: var(--primary-color); }
.text-primary { color: var(--primary-color); }
```

### 3.2.4 CSS Grid y Flexbox

La decisión de cuándo utilizar CSS Grid o Flexbox se basó en criterios específicos:

- **Grid**: Para layouts bidimensionales (filas y columnas)
```css
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
```

- **Flexbox**: Para alineación en un solo eje o distribución de espacio
```css
.testimonial-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Esta estrategia optimiza el rendimiento del render browser y simplifica el código.

## 3.3 Funcionalidad JavaScript

### 3.3.1 Patrón de Módulos

Se implementó el patrón de módulos para el código JavaScript, encapsulando funcionalidades relacionadas:

```javascript
// darkmode.js - Implementación de un módulo para gestionar el tema
document.addEventListener('DOMContentLoaded', function() {
  // Variables privadas del módulo
  const darkModeToggle = document.getElementById('darkModeToggle');
  const themeSlider = document.querySelector('.theme-toggle-slider');
  
  // Funciones privadas
  function enableDarkMode() {
    document.body.classList.add('dark-mode');
    // ...
  }
  
  function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    // ...
  }
  
  // Inicialización y binding de eventos
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function() {
      if (darkModeToggle.checked) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });
  }
});
```

### 3.3.2 Event Delegation

Se utilizó event delegation para mejorar el rendimiento en componentes interactivos:

```javascript
// En lugar de asignar listeners a cada botón
document.addEventListener('DOMContentLoaded', function() {
  const testimonialCarousel = document.getElementById('testimonial-carousel');
  
  // Un solo listener para todo el carrusel
  if (testimonialCarousel) {
    testimonialCarousel.addEventListener('click', function(e) {
      if (e.target.matches('#prev-btn') || e.target.closest('#prev-btn')) {
        goToPrevSlide();
      } else if (e.target.matches('#next-btn') || e.target.closest('#next-btn')) {
        goToNextSlide();
      }
    });
  }
});
```

### 3.3.3 Progressive Enhancement

Se implementó JavaScript siguiendo el principio de mejora progresiva, asegurando que la funcionalidad básica funcione sin JS:

```html
<!-- El carrusel funciona con CSS y radio buttons sin necesidad de JS -->
<div class="carousel-container" id="testimonial-carousel">
  <input type="radio" name="slider" id="item-1" checked>
  <input type="radio" name="slider" id="item-2">
  <!-- Más inputs... -->
  
  <div class="carousel-items">
    <!-- Elementos del carrusel... -->
  </div>
  
  <div class="carousel-nav">
    <label for="item-1"></label>
    <label for="item-2"></label>
    <!-- Más labels... -->
  </div>
</div>
```

JavaScript solo añade funcionalidades extra (autoplay, navegación con botones) pero no es esencial.

## 3.4 Componentes Reutilizables

### 3.4.1 Botones

Se diseñó un sistema de botones escalable con variantes:

```css
/* Base button */
.btn {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Variants */
.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-outline {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

/* Sizes */
.btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
.btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
```

### 3.4.2 Cards

El sistema de tarjetas implementa una estructura flexible que se adapta a diferentes contenidos:

```html
<article class="card">
  <img src="assets/images/yoga.png" alt="Clase de yoga">
  <div class="card-content">
    <h3>Yoga</h3>
    <p>Encuentra tu equilibrio interior y mejora tu flexibilidad.</p>
    <a href="#" class="card-button">Ver detalles</a>
  </div>
</article>
```

```css
.card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.card-content {
  padding: var(--spacing-lg);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
```

### 3.4.3 Formularios

Los elementos de formulario siguen un diseño consistente:

```html
<div class="form-group">
  <label for="email">Email</label>
  <input type="email" id="email" required placeholder="Tu correo electrónico">
  <span class="validation-message">Email inválido</span>
</div>
```

```css
.form-group {
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--gray-300);
  border-radius: var(--border-radius-md);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  outline: none;
}
```

Este enfoque modular permite ensamblar nuevas páginas o secciones rápidamente utilizando componentes ya establecidos.
