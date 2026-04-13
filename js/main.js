// ========== MODEL ==========
const MenuModel = {
    items: [
        {
            id: 1,
            nombre: 'Espresso',
            emoji: '☕',
            descripcion: 'Espresso intenso y auténtico. Extracción perfecta de 30ml en 25 segundos. Crema densa y aroma envolvente.',
            precio: '$3.50'
        },
        {
            id: 2,
            nombre: 'Cappuccino',
            emoji: '🥛',
            descripcion: 'Mezcla perfecta de espresso, leche vaporizada y espuma cremosa. La proporción ideal: 1/3 espresso, 2/3 leche.',
            precio: '$4.50'
        },
        {
            id: 3,
            nombre: 'Latte',
            emoji: '☕',
            descripcion: 'Bebida suave con espresso y leche caliente. Más suave que cappuccino con latte art profesional.',
            precio: '$4.50'
        },
        {
            id: 4,
            nombre: 'Americano',
            emoji: '💧',
            descripcion: 'Dos shots de espresso diluidos en agua caliente. Sabor fuerte pero más accesible que el espresso puro.',
            precio: '$3.75'
        },
        {
            id: 5,
            nombre: 'Mocca',
            emoji: '🍫',
            descripcion: 'Combinación irresistible: espresso, leche vaporizada y chocolate derretido. Postre en una taza.',
            precio: '$5.00'
        },
        {
            id: 6,
            nombre: 'Macchiato',
            emoji: '⚫',
            descripcion: 'Espresso "manchado" con un toque de espuma. La esencia del espresso con suavidad de la leche.',
            precio: '$4.00'
        }
    ]
};

// ========== VIEW ==========
const MenuView = {
    renderMenuCards: function(items) {
        const container = document.getElementById('menuContainer');
        container.innerHTML = '';
        
        items.forEach(item => {
            const card = `
                <div class="col-md-6 col-lg-4">
                    <div class="menu-card" data-id="${item.id}">
                        <div class="card-img-top">${item.emoji}</div>
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">Aroma premium y sabor inigualable</p>
                            <div class="menu-price">${item.precio}</div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    },

    showModal: function(item) {
        const modal = new bootstrap.Modal(document.getElementById('menuModal'));
        const title = document.getElementById('menuTitle');
        const description = document.getElementById('menuDescription');
        const loader = document.getElementById('loaderContainer');
        
        title.textContent = item.nombre;
        loader.style.display = 'block';
        description.innerHTML = '';
        
        // Simular carga
        setTimeout(() => {
            loader.style.display = 'none';
            description.innerHTML = `
                <h6 class="text-custom mb-3">Descripción</h6>
                <p class="mb-4">${item.descripcion}</p>
                <h6 class="text-custom mb-3">Precio</h6>
                <p class="menu-price">${item.precio}</p>
                <button class="btn btn-custom w-100 mt-3">Agregar al Carrito</button>
            `;
        }, 1500);
        
        modal.show();
    }
};

// ========== CONTROLLER ==========
const MenuController = {
    init: function() {
        this.renderMenu();
        this.attachEventListeners();
    },

    renderMenu: function() {
        MenuView.renderMenuCards(MenuModel.items);
    },

    attachEventListeners: function() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.menu-card');
            if (card) {
                const id = card.getAttribute('data-id');
                const item = MenuModel.items.find(i => i.id == id);
                MenuView.showModal(item);
            }
        });
    }
};

// ========== FORMULARIO ==========
const FormController = {
    init: function() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validar
        if (!nombre || !email || !mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Email a hola@cafeteria (simulado)
        console.log('Mensaje enviado:', { nombre, email, mensaje });
        
        // Mostrar éxito
        alert('¡Mensaje enviado! Nos pondremos en contacto pronto. 📧');
        document.getElementById('contactForm').reset();
    }
};

// ========== INIT APP ==========
document.addEventListener('DOMContentLoaded', () => {
    MenuController.init();
    FormController.init();
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-card').forEach(card => {
        observer.observe(card);
    });
});
