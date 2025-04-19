# 7. Guía de Mantenimiento

## 7.1 Actualizaciones de Contenido

### 7.1.1 Cambiar Textos
Para actualizar textos en el sitio, busque el contenido directamente en los archivos HTML correspondientes:

```html
<!-- Ejemplo: cambiar el título principal -->
<h1 class="animated fadeInUp">Transforma tu vida</h1>
```

### 7.1.2 Actualizar Imágenes
Para reemplazar imágenes:
1. Prepare la nueva imagen con dimensiones similares a la original
2. Optimice la imagen para web (compresión, tamaño adecuado)
3. Reemplace el archivo en la carpeta `assets/images/`
4. Si cambia el nombre del archivo, actualice la referencia en el HTML:

```html
<img src="assets/images/NOMBRE_ARCHIVO.jpg" alt="Descripción de la imagen">
```

### 7.1.3 Añadir Nuevas Clases o Servicios
Para agregar una nueva clase al carrusel en la página de clases:

1. Agregue una nueva entrada en el HTML:
```html
<article class="gallery-item nueva-categoria" style="--item-index: 7">
    <img src="../assets/images/nueva-clase.jpg" alt="Nueva Clase">
    <div class="overlay">
        <h3>Nombre de la Nueva Clase</h3>
        <p>Descripción breve de la nueva clase</p>
    </div>
</article>
```

2. Actualice los filtros si es necesario:
```html
<input type="radio" name="filter" id="nueva-categoria">
<label for="nueva-categoria" class="btn-filter">Nueva Categoría</label>
```

## 7.2 Modificaciones de Estilo

### 7.2.1 Cambiar Colores
Los colores principales se definen en `assets/css/utils/colors.css`:

```css
:root {
    /* Colores principales */
    --primary-color: #4CAF50;
    --secondary-color: #2196F3;
    --accent-color: #FF4081;
    /* ... otros colores ... */
}
```

Modifique estos valores para actualizar el esquema de colores en todo el sitio.

### 7.2.2 Ajustar Fuentes
Las tipografías se configuran en `assets/css/utils/typography.css`:

```css
:root {
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Arial', sans-serif;
    /* ... tamaños de fuente ... */
}
```

Para cambiar la fuente principal:
1. Actualice la variable `--font-primary`
2. Si es necesario, agregue la importación de la nueva fuente:

```css
@import url('https://fonts.googleapis.com/css2?family=NuevaFuente:wght@300;400;500;600;700&display=swap');
```

## 7.3 Agregar Nuevas Páginas

Para añadir una nueva página al sitio:

1. Cree un nuevo archivo HTML en la carpeta `pages/`
2. Copie la estructura básica de una página existente:
   - Header con navegación
   - Estructura main con secciones
   - Footer
3. Actualice el título, meta tags y contenido específico
4. Agregue enlaces a la nueva página en el menú de navegación

## 7.4 Depuración de Problemas Comunes

### 7.4.1 Elementos que no se muestran correctamente
- Verifique la consola del navegador (F12) para errores
- Revise las rutas de archivos y recursos
- Confirme la compatibilidad con el navegador

### 7.4.2 Problemas de responsividad
- Use las herramientas de desarrollo del navegador para probar diferentes tamaños
- Verifique los media queries en el CSS correspondiente
- Asegúrese de que el viewport meta tag esté presente

### 7.4.3 Problemas de modo oscuro
- Verifique que darkmode.js esté cargado correctamente
- Asegúrese que todas las variables de color tengan sus equivalentes para modo oscuro
- Pruebe borrando localStorage si el cambio de modo persiste incorrectamente
