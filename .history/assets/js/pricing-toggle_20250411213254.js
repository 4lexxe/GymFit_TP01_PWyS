document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos necesarios
    const pricingSwitch = document.getElementById('pricing-switch');
    const monthlyPrices = document.querySelectorAll('.monthly');
    const annualPrices = document.querySelectorAll('.annual');
    const savingsElements = document.querySelectorAll('.savings');
    
    // Verificar si estamos en la página de precios
    if (!pricingSwitch) return;
    
    console.log('Script de precios cargado');
    
    // Aplicar estado inicial
    function updatePrices() {
        const isAnnual = pricingSwitch.checked;
        
        console.log('Modo de precio:', isAnnual ? 'Anual' : 'Mensual');
        
        // Mostrar/ocultar precios y ahorros según corresponda
        monthlyPrices.forEach(price => {
            price.style.display = isAnnual ? 'none' : 'inline-block';
            if (!isAnnual) {
                setTimeout(() => {
                    price.style.opacity = '1';
                    price.style.transform = 'translateY(0)';
                }, 10);
            }
        });
        
        annualPrices.forEach(price => {
            price.style.display = isAnnual ? 'inline-block' : 'none';
            if (isAnnual) {
                setTimeout(() => {
                    price.style.opacity = '1';
                    price.style.transform = 'translateY(0)';
                }, 10);
            }
        });
        
        // Mostrar/ocultar mensajes de ahorro
        savingsElements.forEach(saving => {
            saving.style.opacity = isAnnual ? '1' : '0';
        });
        
        // Añadir animación a las tarjetas
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            card.classList.add('price-changing');
            setTimeout(() => {
                card.classList.remove('price-changing');
            }, 500);
        });
    }
    
    // Ejecutar al inicio
    updatePrices();
    
    // Cambiar precios cuando se active/desactive el switch
    pricingSwitch.addEventListener('change', updatePrices);
});
