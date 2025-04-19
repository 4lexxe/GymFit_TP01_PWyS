# 1. Arquitectura y Estructura del Proyecto

## 1.1 Visión General de la Arquitectura

El sitio web GymFit sigue una arquitectura frontend monolítica basada en HTML, CSS y JavaScript vanila, sin dependencia de frameworks. Esta decisión fue tomada para:

1. **Minimizar la carga inicial**: Al eliminar dependencias de bibliotecas externas, el tiempo de carga se reduce significativamente.
2. **Control total sobre el código**: Permite optimizaciones específicas y personalizadas.
3. **Mantenibilidad a largo plazo**: Evita problemas de compatibilidad con actualizaciones de frameworks.
4. **Rendimiento optimizado**: Código específico para las necesidades del proyecto sin sobrecarga.

La arquitectura implementa un patrón de diseño "Component-Based" donde cada elemento de la UI se estructura como un componente independiente con su propio CSS y, cuando es necesario, JavaScript asociado.

## 1.2 Estructura de Directorios

