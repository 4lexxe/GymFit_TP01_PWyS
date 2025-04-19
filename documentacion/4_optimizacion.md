# 4. Optimización y Técnicas de Rendimiento

## 4.1 Estrategias de Optimización Implementadas

### 4.1.1 Critical Rendering Path

Se aplicaron técnicas específicas para optimizar el Critical Rendering Path:

1. **CSS prioritario** mediante `<link rel="preload">`:
```html
<link rel="preload" href="assets/css/utils/colors.css" as="style">
```

2. **Defer de scripts no críticos**:
```html
<script src="assets/js/pricing-toggle.js" defer></script>
```

3. **Inlining de CSS crítico** para la primera renderización:
```html
<style>
  body.dark-mode {
    background-color: #121212 !important;
    color: #f8f9fa !important;
  }
</style>
```

4. **Precarga de recursos visuales críticos**:
```html
<link rel="preload" href="assets/video/gym-background.mp4" as="video" type="video/mp4">
```

### 4.1.2 Arquitectura de Carga

El sitio implementa una estrategia de carga progresiva:

1. **Contenido principal primero**: Se prioriza el contenido visible inicialmente
2. **Recursos secundarios bajo demanda**: Imágenes y scripts no críticos se cargan después
3. **Lazy loading nativo** para imágenes fuera de la vista inicial:
```html
<img src="assets/images/trainer-bio.jpg" loading="lazy" alt="Biografía del entrenador">
```

## 4.2 Métricas de Rendimiento

### 4.2.1 Core Web Vitals

El sitio se optimizó específicamente para las métricas de Core Web Vitals:

1. **Largest Contentful Paint (LCP)** - Mejoras realizadas:
   - Preload del hero video
   - Optimización de imágenes hero
   - Reducción de CSS bloqueante
   - LCP objetivo alcanzado: < 2.5 segundos

2. **First Input Delay (FID)** - Mejoras realizadas:
   - Minimización del JavaScript en el thread principal
   - División de tareas largas de JS
   - Uso de CSS para animaciones en lugar de JS
   - FID objetivo alcanzado: < 100ms

3. **Cumulative Layout Shift (CLS)** - Mejoras realizadas:
   - Dimensiones explícitas para imágenes
   - Espacios reservados para contenido dinámico
   - Indicadores de posición para contenido cargado dinámicamente
   - CLS objetivo alcanzado: < 0.1

### 4.2.2 Herramientas de Diagnóstico Utilizadas

El proyecto se probó iterativamente con:

1. **Lighthouse**: Para análisis general de rendimiento, accesibilidad, mejores prácticas y SEO
2. **WebPageTest**: Para análisis detallado de cascada de renderizado y carga de recursos
3. **Chrome DevTools**: Para análisis de rendimiento específicos y optimizaciones runtime
4. **Performance API**: Para evaluaciones personalizadas en diferentes contextos

## 4.3 Optimización de Recursos

### 4.3.1 Optimización de Imágenes

Se implementó una estrategia múltiple para optimizar imágenes:

1. **Compresión sin pérdida significativa**: Reducción del 40-60% del tamaño original
2. **Formato adecuado según el caso**:
   - JPG para fotografías
   - PNG para elementos con transparencia
   - SVG para iconos y gráficos vectoriales
3. **Responsive images** con srcset para diferentes resoluciones:
```html
<img srcset="assets/images/hero-sm.jpg 640w,
             assets/images/hero-md.jpg 1280w,
             assets/images/hero-lg.jpg 1920w"
     sizes="(max-width: 640px) 640px,
            (max-width: 1280px) 1280w,
            1920px"
     src="assets/images/hero-md.jpg" 
     alt="Hero image">
```
4. **Lazy loading** para imágenes bajo el fold

### 4.3.2 Optimización CSS

El CSS se estructuró para maximizar rendimiento:

1. **División en módulos**: Carga separada de componentes por necesidad
2. **Eliminación de CSS no utilizado** mediante análisis manual
3. **Reutilización de clases** para reducir repetición
4. **Minificación** del código en producción
5. **Simplificación de selectores** para mejorar el tiempo de evaluación:
```css
/* Evitado: selector complejo */
.header .nav-main ul.menu li.menu-item a:hover { }

/* Implementado: selector optimizado */
.menu-link:hover { }
```

### 4.3.3 Optimización JavaScript

El JavaScript se optimizó mediante:

1. **Modularización**: Separación en archivos específicos por funcionalidad
2. **Evitado de jQuery**: Eliminación de dependencias externas pesadas
3. **Delegación de eventos** para reducir el número de event listeners
4. **Lazy initialization** de componentes no críticos
5. **Throttling y debouncing** para funciones invocadas frecuentemente:
```javascript
// Debouncing para resize events
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    updateLayoutForScreenSize();
  }, 250);
});
```

## 4.4 Gestión de Assets

### 4.4.1 Estrategia de Organización

Los assets se organizaron siguiendo un patrón lógico:
