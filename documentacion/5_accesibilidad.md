# 5. Implementación de Accesibilidad

## 5.1 Estructura ARIA

### 5.1.1 Uso de Landmarks ARIA

Se implementaron landmarks ARIA para definir regiones importantes del sitio, permitiendo a los usuarios de tecnologías asistivas navegar más fácilmente:

```html
<header role="banner">
  <nav role="navigation" aria-label="Navegación principal">
    <!-- Navegación -->
  </nav>
</header>

<main role="main" id="main-content">
  <!-- Contenido principal -->
</main>

<aside role="complementary">
  <!-- Contenido complementario -->
</aside>

<footer role="contentinfo">
  <!-- Información de pie de página -->
</footer>
```

### 5.1.2 Estado y Propiedades ARIA

Se utilizaron estados y propiedades ARIA para proporcionar información contextual adicional a las tecnologías asistivas:

```html
<!-- Menú expandible -->
<button aria-expanded="false" aria-controls="menu-dropdown">
  Categorías
</button>
<div id="menu-dropdown" aria-hidden="true">
  <!-- Contenido desplegable -->
</div>

<!-- Estado activo en navegación -->
<a href="clases.html" aria-current="page">Clases</a>

<!-- Descripción de elementos complejos -->
<div class="rating" aria-describedby="rating-desc">
  <!-- Estrellas de valoración -->
</div>
<div id="rating-desc" class="sr-only">
  Valoración de 4 sobre 5 estrellas
</div>
```

### 5.1.3 Atributos ARIA para Widgets Personalizados

Para componentes UI personalizados, se implementaron roles y atributos ARIA específicos:

```html
<!-- Carrusel de testimonios -->
<div class="carousel-container" role="region" aria-roledescription="carrusel" aria-label="Testimonios de clientes">
  <div class="carousel-items">
    <!-- Items del carrusel -->
  </div>
  
  <div class="carousel-controls">
    <button class="carousel-control prev" id="prev-btn" aria-label="Testimonio anterior" aria-controls="testimonial-carousel">❮</button>
    <button class="carousel-control next" id="next-btn" aria-label="Testimonio siguiente" aria-controls="testimonial-carousel">❯</button>
  </div>
</div>

<!-- Toggle switch personalizado -->
<div class="theme-toggle">
  <input type="checkbox" id="darkModeToggle">
  <label for="darkModeToggle" class="theme-toggle-slider" role="switch" aria-checked="false" aria-label="Activar modo oscuro">
    <span class="sr-only">Cambiar a modo oscuro</span>
  </label>
</div>
```

### 5.1.4 Decisiones Técnicas para ARIA

1. **Uso moderado**: Se aplicaron atributos ARIA solo cuando HTML semántico no era suficiente, evitando sobrecarga.

2. **Testing con lectores de pantalla**: Se verificó que cada atributo ARIA funcionara correctamente con NVDA y VoiceOver.

3. **Actualización dinámica**: Los atributos ARIA como `aria-expanded` y `aria-current` se actualizan mediante JavaScript:

```javascript
document.querySelectorAll('.dropdown-toggle').forEach(button => {
  button.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    const targetId = this.getAttribute('aria-controls');
    const target = document.getElementById(targetId);
    
    this.setAttribute('aria-expanded', !expanded);
    target.setAttribute('aria-hidden', expanded);
  });
});
```

## 5.2 Navegación por Teclado

### 5.2.1 Gestión del Focus

Se implementó una gestión cuidadosa del focus para usuarios que navegan por teclado:

```css
/* Estilo de focus visible y consistente */
:focus {
  outline: 3px solid var(--focus-ring-color);
  outline-offset: 2px;
}

/* Asegurar que los elementos interactivos tienen focus visible */
:focus-visible {
  outline: 3px solid var(--focus-ring-color);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.4);
}

/* Eliminar outline para interacciones de mouse pero mantenerlo para teclado */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 5.2.2 Skip Links

Para permitir a los usuarios de teclado saltar bloques repetitivos de contenido, se implementó un skip link:

```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
```

```css
.skip-link {
  position: absolute;
  top: -50px;
  left: 0;
  background: var(--primary-color);
  color: white;
  padding: 10px 15px;
  z-index: 1001;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}
```

### 5.2.3 Focus Trap para Modales

Para modales y diálogos, se implementó un "focus trap" que mantiene el foco dentro del elemento mientras está activo:

```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  });
}

// Uso:
const modal = document.getElementById('successModal');
trapFocus(modal);
```

### 5.2.4 Order de Tabulación Lógico

Se aseguró que el orden de tabulación siguiera un flujo lógico implementando HTML estructurado, evitando el uso de `tabindex > 0` y verificando el orden DOM.

## 5.3 Semántica y Lectores de Pantalla

### 5.3.1 Texto Alternativo Contextual

Se implementó texto alternativo descriptivo y contextual para todas las imágenes:

```html
<!-- Imagen informativa con alt descriptivo -->
<img src="assets/images/yoga-pose.jpg" alt="Instructor demostrando la postura del guerrero en clase de yoga">

<!-- Imagen decorativa con alt vacío -->
<img src="assets/images/decorative-pattern.svg" alt="" role="presentation">

<!-- Imagen compleja con descripción extendida -->
<figure>
  <img src="assets/images/nutrition-chart.jpg" alt="Gráfico nutricional" aria-describedby="nutrition-desc">
  <figcaption id="nutrition-desc">Distribución recomendada de macronutrientes: 40% carbohidratos, 30% proteínas y 30% grasas.</figcaption>
</figure>
```

### 5.3.2 Etiquetas Descriptivas para Formularios

Todos los controles de formulario tienen etiquetas explícitas:

```html
<div class="form-group">
  <label for="name">Nombre completo</label>
  <input type="text" id="name" required pattern="[A-Za-zÀ-ÿ\s]{3,}" aria-describedby="name-help">
  <span id="name-help" class="form-hint">Ingresa tu nombre y apellido</span>
  <span class="validation-message" aria-live="polite">Mínimo 3 letras</span>
</div>
```

### 5.3.3 Creación de Regiones con Encabezados

Se implementó una jerarquía de encabezados lógica para estructurar el contenido:

```html
<main id="main-content">
  <h1>Nuestras Clases</h1>
  
  <section>
    <h2>Clases de Cardio</h2>
    <article>
      <h3>Spinning</h3>
      <!-- Contenido -->
    </article>
    <article>
      <h3>HIIT</h3>
      <!-- Contenido -->
    </article>
  </section>
  
  <section>
    <h2>Clases de Fuerza</h2>
    <!-- Subsecciones con h3 -->
  </section>
</main>
```

### 5.3.4 Contenido Live Regions

Para actualizaciones dinámicas de contenido, se implementaron regiones "live" que notifican a lectores de pantalla:

```html
<div class="notification-container" aria-live="polite" aria-atomic="true">
  <!-- Contenido dinámico -->
</div>
```

```javascript
function showNotification(message) {
  const container = document.querySelector('.notification-container');
  container.textContent = message;
  
  // Para asegurar que se anuncia incluso si el contenido no cambia
  container.setAttribute('data-notification', Date.now());
  
  setTimeout(() => {
    container.textContent = '';
  }, 5000);
}
```

## 5.4 Test de Conformidad WCAG

### 5.4.1 Principio: Perceptible

#### Implementación Técnica para Texto Alternativo (1.1.1)
- Todas las imágenes tienen `alt` apropiado
- SVGs complejos incluyen `<title>` y `<desc>`
- Iconos fonéticos incluyen `aria-hidden="true"` y texto alternativo

#### Implementación Técnica para Contenido Multimedia (1.2.x)
- Videos implementados con controles nativos
- Subtítulos incrustados cuando el video contiene diálogo
- Transcripciones disponibles para contenido de audio

#### Implementación Técnica para Adaptabilidad (1.3.x)
- Layout implementado con CSS Grid y Flexbox para adaptarse a cualquier tamaño
- Orden de lectura lógico independiente del estilo visual
- Uso de HTML semántico para marcar el significado del contenido

### 5.4.2 Principio: Operable

#### Implementación Técnica para Accesibilidad por Teclado (2.1.x)
- Todos los controles operables mediante teclado
- Sin trampas de teclado excepto en modales (con manejo apropiado)
- Teclas de acceso rápido implementadas para navegación principal

#### Implementación Técnica para Tiempo Suficiente (2.2.x)
- Sin contenido con tiempo limitado
- Animaciones pausables mediante controles explícitos

#### Implementación Técnica para Ayudas de Navegación (2.4.x)
- Skip links implementados
- Títulos de página descriptivos y únicos
- Migas de pan para situar al usuario en la jerarquía

### 5.4.3 Principio: Comprensible

#### Implementación Técnica para Legibilidad (3.1.x)
- Atributo `lang` establecido en el elemento html
- Definición de términos técnicos con `<abbr>` y descripciones

#### Implementación Técnica para Previsibilidad (3.2.x)
- Comportamiento consistente de navegación en todo el sitio
- Cambios de contexto solo ocurren con acción explícita del usuario

#### Implementación Técnica para Ayuda de Entrada (3.3.x)
- Validación de formularios con mensajes de error claros
- Etiquetas descriptivas para todos los campos
- Sugerencias para corrección de errores

### 5.4.4 Principio: Robusto

#### Implementación Técnica para Compatibilidad (4.1.x)
- HTML válido según estándares W3C
- Roles, estados y propiedades ARIA adecuados
- Nombres y roles correctos para componentes personalizados

### 5.4.5 Herramientas de Validación Utilizadas

- **WAVE (Web Accessibility Evaluation Tool)**: Validación automatizada de accesibilidad
- **Axe DevTools**: Identificación y resolución de problemas de accesibilidad
- **Validador de Contraste de Color**: Verificación de relaciones de contraste adecuadas
- **Pruebas con lectores de pantalla**: NVDA en Windows y VoiceOver en macOS

### 5.4.6 Resultado de las Pruebas

- **Conformidad WCAG**: Nivel AA alcanzado
- **Puntuación de accesibilidad en Lighthouse**: 97/100
- **Feedback de usuarios con discapacidades**: Incorporado en iteraciones de mejora
