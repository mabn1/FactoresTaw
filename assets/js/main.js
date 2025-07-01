/**
 * Funcionalidades principales para Noticias TAW
 * - Gestión de noticias
 * - Interacciones de UI
 * - Efectos visuales
 */

document.addEventListener('DOMContentLoaded', () => {
    // ======================
    // 1. MENÚ MÓVIL
    // ======================
    const mobileMenuToggle = () => {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.setAttribute('aria-label', 'Abrir menú');
        
        const navbar = document.querySelector('.navbar-container');
        navbar.prepend(menuBtn);
        
        menuBtn.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
            menuBtn.innerHTML = document.querySelector('.nav-links').classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    };

    // ======================
    // 2. DESTACAR ENLACE ACTIVO
    // ======================
    const setActiveLink = () => {
        const currentPage = location.pathname.split('/').pop();
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentPage);
        });
    };

    // ======================
    // 3. ANIMACIÓN TARJETAS
    // ======================
    const cardHoverEffects = () => {
        document.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    };

    // ======================
    // 4. FILTRADO DE NOTICIAS (Para news.html)
    // ======================
    const filterNews = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (!filterBtns) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterBtns.forEach(b => b.classList.remove('active'));
                // Añadir clase active al botón clickeado
                btn.classList.add('active');
                
                const category = btn.textContent.toLowerCase();
                const newsCards = document.querySelectorAll('.news-card');
                
                newsCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (category === 'todas' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    };

    // ======================
    // 5. INICIALIZADOR
    // ======================
    const init = () => {
        mobileMenuToggle();
        setActiveLink();
        cardHoverEffects();
        filterNews();
    };

    init();
});

// ======================
// FUNCIONES GLOBALES
// ======================

/**
 * Muestra un mensaje flash (para acciones como "Noticia publicada")
 * @param {string} message - Texto a mostrar
 * @param {string} type - Tipo de mensaje (success, error, warning)
 */
function showFlashMessage(message, type = 'success') {
    const flash = document.createElement('div');
    flash.className = `flash-message ${type}`;
    flash.textContent = message;
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.classList.add('fade-out');
        flash.addEventListener('animationend', () => flash.remove());
    }, 3000);
}

/**
 * Formatea fechas a formato legible
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} - Fecha formateada (ej: "20 Jun 2023")
 */
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}
