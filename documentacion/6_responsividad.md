# 6. Responsividad

## 6.1 Enfoque Mobile First

El sitio web GymFit ha sido desarrollado siguiendo la metodología "Mobile First", que consiste en:

1. Diseñar primero la experiencia para dispositivos móviles
2. Expandir progresivamente el diseño para dispositivos más grandes
3. Optimizar recursos según el tamaño de pantalla

Este enfoque garantiza que la experiencia sea óptima en todos los dispositivos, priorizando la experiencia móvil que constituye la mayoría del tráfico web actual.

## 6.2 Breakpoints Principales

El sitio utiliza los siguientes puntos de quiebre (breakpoints) para adaptarse a diferentes tamaños de pantalla:

| Breakpoint | Categoría | Descripción |
|------------|-----------|-------------|
| 576px      | Teléfonos pequeños | Ajustes para pantallas muy pequeñas |
| 768px      | Tablets y teléfonos grandes | Cambios de layout significativos |
| 992px      | Tablets grandes y laptops | Aprovechamiento del espacio adicional |
| 1200px     | Desktops y pantallas grandes | Maximización del espacio disponible |

## 6.3 Grid y Layout Flexibles

### 6.3.1 CSS Grid

Implementado para estructuras de página complejas:
```css
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem;
}
```

### 6.3.2 Flexbox

Utilizado para alineación y distribución de elementos:
```css
.feature-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}
```

## 6.4 Imágenes Responsivas

### 6.4.1 Imágenes Fluidas
```css
img {
    max-width: 100%;
    height: auto;
}
```

### 6.4.2 Elemento picture para Art Direction
```html
<picture>
    <source media="(max-width: 768px)" srcset="assets/images/mobile/hero.jpg">
    <source media="(max-width: 1200px)" srcset="assets/images/tablet/hero.jpg">
    <img src="assets/images/desktop/hero.jpg" alt="Hero image">
</picture>
```

## 6.5 Adaptaciones Específicas

### 6.5.1 Menú de Navegación
- Escritorio: Mega-menú horizontal con múltiples columnas
- Móvil: Menú desplegable vertical simplificado

### 6.5.2 Layout de Tarjetas
- Escritorio: 3-4 columnas dependiendo del ancho
- Tablet: 2 columnas
- Móvil: 1 columna

### 6.5.3 Formularios
- Escritorio: Campos en múltiples columnas
- Móvil: Campos apilados verticalmente

### 6.5.4 Tipografía Fluida
```css
h1 {
    font-size: calc(2rem + 1.5vw);
}
```

## 6.6 Pruebas de Responsividad

El sitio ha sido probado en los siguientes entornos:

1. **Dispositivos físicos**:
   - iPhone SE (pequeño)
   - iPhone 12 Pro (medio)
   - iPad Pro (grande)
   - Monitor Desktop (1920×1080)

2. **Herramientas de desarrollo**:
   - Chrome DevTools Device Mode
   - Firefox Responsive Design Mode
   - Browser Stack para pruebas en múltiples dispositivos
