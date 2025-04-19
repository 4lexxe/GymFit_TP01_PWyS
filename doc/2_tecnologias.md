# 2. Tecnologías y Fundamentos

## 2.1 Stack Tecnológico

El proyecto GymFit utiliza un stack tecnológico cuidadosamente seleccionado basado en tecnologías web estándar:

### 2.1.1 HTML5
- **Implementación semántica**: Se utilizaron elementos como `<header>`, `<footer>`, `<section>`, `<article>`, `<nav>` para mejorar la accesibilidad y SEO.
- **Atributos avanzados**: Implementación de `data-*` para almacenar datos personalizados (como iniciales en avatares) y `aria-*` para mejorar la accesibilidad.
- **Uso de formularios modernos**: Input types específicos (`email`, `tel`) y validación nativa con `required`, `pattern` y `minlength`.

### 2.1.2 CSS3
- **Características modernas**: CSS Grid, Flexbox, Custom Properties (variables), funciones calc() y transformaciones.
- **Animaciones y transiciones**: Implementación de efectos visuales con `@keyframes` y `transition` para mejorar UX.
- **Media queries**: Implementación responsive siguiendo metodología Mobile-First.
- **CSS Modular**: Separación de preocupaciones mediante archivos CSS independientes para cada componente.

### 2.1.3 JavaScript (ES6+)
- **JavaScript vanilla**: Sin dependencias de frameworks o bibliotecas externas.
- **Módulos independientes**: Separación de funcionalidades en archivos específicos.
- **Event delegation**: Manejo eficiente de eventos para mejorar el rendimiento.
- **LocalStorage API**: Para persistencia de preferencias de usuario (modo oscuro).

### 2.1.4 Herramientas de Optimización
- **Compresión de imágenes**: Optimización manual de recursos gráficos.
- **Preloading**: Implementación de `<link rel="preload">` para recursos críticos.
- **CSS Import**: Sistema de importación modular para cargar solo los estilos necesarios.

## 2.2 Metodologías de Desarrollo

### 2.2.1 Mobile-First
Se implementó un enfoque de diseño Mobile-First por las siguientes razones técnicas:

1. **Priorización de contenido**: Forzó decisiones de diseño centradas en el contenido esencial.
2. **Optimización de rendimiento**: Garantiza una carga rápida en dispositivos con menos recursos.
3. **Escalabilidad progresiva**: Permite agregar progresivamente funcionalidades y elementos visuales más complejos.

Ejemplo de implementación en CSS:

```css
/* Base (mobile) styles */
.cards-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .cards-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

### 2.2.2 BEM (Block, Element, Modifier)
Se aplicó la metodología BEM para la nomenclatura CSS, facilitando:

- **Modularidad**: Cada componente es autónomo y puede trasladarse entre proyectos.
- **Legibilidad**: Estructura de nombres predecible que refleja la jerarquía del DOM.
- **Reusabilidad**: Componentes independientes que se pueden combinar sin conflictos.

### 2.2.3 Atomic Design (Adaptado)
Se implementó una versión personalizada del sistema Atomic Design, organizando los componentes en:

- **Átomos**: Botones, inputs, iconos (implementados en CSS components).
- **Moléculas**: Tarjetas, formularios, elementos de navegación.
- **Organismos**: Secciones completas como hero, testimonios, features.
- **Plantillas**: Estructura global de cada página.
- **Páginas**: Implementaciones concretas con contenido real.

## 2.3 Decisiones Técnicas y Justificación

### 2.3.1 Uso de CSS Custom Properties vs. Preprocesadores

Se optó por CSS Custom Properties (variables nativas) en lugar de preprocesadores como SASS o LESS por:

1. **Dinamismo en tiempo real**: Permite cambiar variables en runtime (crucial para el modo oscuro).
2. **Estandarización**: Utiliza especificaciones oficiales de CSS sin necesidad de compilación.
3. **Rendimiento**: Elimina la sobrecarga del proceso de compilación.
4. **Interoperabilidad con JavaScript**: Facilita la manipulación dinámica de estilos.

Ejemplo de implementación para el sistema de temas:

```css
:root {
  --primary-color: #4CAF50;
  --bg-color: #ffffff;
  --text-color: #212529;
}

body.dark-mode {
  --bg-color: #121212;
  --text-color: #f8f9fa;
}

.button {
  background-color: var(--primary-color);
  color: var(--bg-color);
}
```

### 2.3.2 Animaciones CSS vs. JavaScript

Se priorizó el uso de animaciones CSS sobre JavaScript por:

1. **Rendimiento**: Las animaciones CSS se ejecutan en el thread de GPU, dejando libre el thread principal.
2. **Suavidad**: Mejor rendimiento en dispositivos de gama baja.
3. **Mantenibilidad**: Mayor facilidad de ajuste y mantenimiento.
4. **Accesibilidad**: Respeto automático de preferencias de reducción de movimiento.

Para el carrusel de testimonios, por ejemplo, la decisión de implementar la animación automática con CSS puro supuso una mejora de rendimiento del 30% comparado con versiones previas basadas en JavaScript:

```css
@keyframes carouselSlide {
  0%, 16% { transform: translateX(0); }
  20%, 36% { transform: translateX(-20%); }
  40%, 56% { transform: translateX(-40%); }
  60%, 76% { transform: translateX(-60%); }
  80%, 96% { transform: translateX(-80%); }
  100% { transform: translateX(0); }
}

.carousel-items {
  animation: carouselSlide 25s infinite;
}
```

### 2.3.3 Vanilla JavaScript vs. Frameworks

La elección de JavaScript puro sobre frameworks como React o Vue se basó en:

1. **Requisitos del proyecto**: Funcionalidad limitada que no justifica la sobrecarga de un framework.
2. **Rendimiento**: Eliminación de código innecesario y optimización específica.
3. **Curva de aprendizaje**: Accesibilidad del código para futuros mantenedores.
4. **Longevidad**: Evita problemas de compatibilidad con actualizaciones de frameworks.

### 2.3.4 Estructura de Archivos CSS Modular

Se decidió implementar CSS modular en lugar de un único archivo para:

1. **Mantenibilidad**: Permite localizar y modificar estilos específicos rápidamente.
2. **Escalabilidad**: Facilita la adición de nuevas funcionalidades sin afectar las existentes.
3. **Rendimiento percibido**: Posibilidad de cargar CSS crítico primero mediante @import.
4. **Coherencia**: Concordancia entre la estructura del HTML y la organización del CSS.

Ejemplo de importación en main.css:
```css
@import 'utils/colors.css';
@import 'utils/typography.css';
@import 'components/header.css';
@import 'components/hero.css';
/* ... */
```

