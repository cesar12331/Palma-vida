// Global state
let activeTab = 'Inicio';
let selectedColors = {};
let selectedSizes = {};
let lastSelectedProduct = '';
let lastSelectedColor = '';
let lastSelectedSize = '';
let isDragging = false;

// Products data
const products = [
    {
        id: 1,
        name: "ARTESANIA#1",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Cada tejido es una historia, cada diseño una expresión de nuestra cultura."
    },
    {
        id: 2,
        name: "ARTESANIA#2",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Cada tejido es una historia, cada diseño una expresión de nuestra cultura."
    },
    {
        id: 3,
        name: "ARTESANIA#3",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Cada tejido es una historia, cada diseño una expresión de nuestra cultura."
    },
    {
        id: 4,
        name: "ARTESANIA#4",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Cada tejido es una historia, cada diseño una expresión de nuestra cultura."
    },
    {
        id: 5,
        name: "ARTESANIA#5",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Cada tejido es una historia, cada diseño una expresión de nuestra cultura."
    },
    {
        id: 6,
        name: "ARTESANIA#6",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Cada tejido es una historia, cada diseño una expresión de nuestra cultura."
    },
    {
        id: 7,
        name: "ARTESANIA#7",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Cada tejido es una historia, cada diseño una expresión de nuestra cultura."
    },
    {
        id: 8,
        name: "ARTESANIA#8",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        description: "Cada tejido es una historia, cada diseño una expresión de nuestra cultura."
    }
];

// DOM Elements
const navTabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('.section');
const catalogGrid = document.getElementById('catalog-grid');
const scrollUpBtn = document.querySelector('.scroll-up');
const scrollDownBtn = document.querySelector('.scroll-down');
const scrollbarThumb = document.querySelector('.scrollbar-thumb');
const scrollbarTrack = document.querySelector('.scrollbar-track');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    generateCatalog();
    initializeScrollbar();
    initializeOrderForm();
});

// Navigation functionality
function initializeNavigation() {
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Update active tab
    activeTab = tabName;
    
    // Update navigation appearance
    navTabs.forEach(tab => {
        tab.classList.remove('active');
        const indicator = tab.querySelector('.nav-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    });
    
    const activeTabElement = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTabElement) {
        activeTabElement.classList.add('active');
        let indicator = activeTabElement.querySelector('.nav-indicator');
        if (!indicator) {
            indicator = document.createElement('span');
            indicator.className = 'nav-indicator';
            activeTabElement.appendChild(indicator);
        }
        indicator.style.display = 'inline-block';
    }
    
    // Show/hide sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(tabName);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    // Move clicked tab to front (reorder)
    const tabsContainer = document.querySelector('.navigation-tabs');
    if (activeTabElement && tabsContainer) {
        tabsContainer.insertBefore(activeTabElement, tabsContainer.firstChild);
    }
}

// Catalog functionality
function generateCatalog() {
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        catalogGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        
        <div class="color-section">
            <div class="color-header">PERSONALIZA TU COLOR</div>
            <div class="color-options">
                <button class="color-btn red" data-product="${product.id}" data-color="red"></button>
                <button class="color-btn black" data-product="${product.id}" data-color="black"></button>
                <button class="color-btn purple" data-product="${product.id}" data-color="purple"></button>
            </div>
        </div>
        
        <div class="size-section">
            <div class="size-header">TAMAÑOS:</div>
            <div class="size-options">
                <button class="size-btn" data-product="${product.id}" data-size="pequeño">
                    <strong>PEQUEÑO:</strong> 8cm - 12cm
                </button>
                <button class="size-btn" data-product="${product.id}" data-size="mediano">
                    <strong>MEDIANO:</strong> 13cm - 18cm
                </button>
                <button class="size-btn" data-product="${product.id}" data-size="grande">
                    <strong>GRANDE:</strong> 20cm - 25cm
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners for color selection
    const colorBtns = card.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product'));
            const color = this.getAttribute('data-color');
            selectColor(productId, color, this);
        });
    });
    
    // Add event listeners for size selection
    const sizeBtns = card.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product'));
            const size = this.getAttribute('data-size');
            selectSize(productId, size, this);
        });
    });
    
    return card;
}

function selectColor(productId, color, buttonElement) {
    selectedColors[productId] = color;
    
    // Update visual selection
    const productCard = buttonElement.closest('.product-card');
    const colorBtns = productCard.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => btn.classList.remove('selected'));
    buttonElement.classList.add('selected');
    
    // Update last selected values
    const product = products.find(p => p.id === productId);
    if (product) {
        lastSelectedProduct = product.name;
        lastSelectedColor = color;
        updateOrderForm();
    }
}

function selectSize(productId, size, buttonElement) {
    selectedSizes[productId] = size;
    
    // Update visual selection
    const productCard = buttonElement.closest('.product-card');
    const sizeBtns = productCard.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => btn.classList.remove('selected'));
    buttonElement.classList.add('selected');
    
    // Update last selected values
    const product = products.find(p => p.id === productId);
    if (product) {
        lastSelectedProduct = product.name;
        lastSelectedSize = size;
        updateOrderForm();
    }
}

// Scrollbar functionality
function initializeScrollbar() {
    if (!catalogGrid || !scrollUpBtn || !scrollDownBtn || !scrollbarThumb) return;
    
    // Scroll buttons
    scrollUpBtn.addEventListener('click', () => scrollCatalog('up'));
    scrollDownBtn.addEventListener('click', () => scrollCatalog('down'));
    
    // Track scroll position
    catalogGrid.addEventListener('scroll', updateScrollbarPosition);
    
    // Draggable scrollbar
    scrollbarThumb.addEventListener('mousedown', handleScrollbarDrag);
    
    // Initial position
    updateScrollbarPosition();
}

function scrollCatalog(direction) {
    if (!catalogGrid) return;
    
    const scrollAmount = direction === 'up' ? -300 : 300;
    catalogGrid.scrollBy({ top: scrollAmount, behavior: 'smooth' });
}

function updateScrollbarPosition() {
    if (!catalogGrid || !scrollbarThumb) return;
    
    const { scrollTop, scrollHeight, clientHeight } = catalogGrid;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const maxPosition = 90; // Prevent scrollbar from going to the very bottom
    
    scrollbarThumb.style.top = `${Math.min(scrollPercentage, maxPosition)}%`;
}

function handleScrollbarDrag(e) {
    isDragging = true;
    scrollbarThumb.classList.add('dragging');
    
    const handleMouseMove = (e) => {
        if (!isDragging || !catalogGrid || !scrollbarTrack) return;
        
        const rect = scrollbarTrack.getBoundingClientRect();
        const percentage = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
        const scrollTop = percentage * (catalogGrid.scrollHeight - catalogGrid.clientHeight);
        
        catalogGrid.scrollTop = scrollTop;
    };
    
    const handleMouseUp = () => {
        isDragging = false;
        scrollbarThumb.classList.remove('dragging');
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    e.preventDefault();
}

// Order form functionality
function initializeOrderForm() {
    const productSelect = document.getElementById('product-select');
    const colorSelect = document.getElementById('color-select');
    const sizeSelect = document.getElementById('size-select');
    const orderForm = document.getElementById('order-form');
    
    if (productSelect) {
        productSelect.addEventListener('change', function() {
            lastSelectedProduct = this.value;
            updateSelectionPreview();
        });
    }
    
    if (colorSelect) {
        colorSelect.addEventListener('change', function() {
            lastSelectedColor = this.value;
            updateSelectionPreview();
        });
    }
    
    if (sizeSelect) {
        sizeSelect.addEventListener('change', function() {
            lastSelectedSize = this.value;
            updateSelectionPreview();
        });
    }
    
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
}

function updateOrderForm() {
    const productSelect = document.getElementById('product-select');
    const colorSelect = document.getElementById('color-select');
    const sizeSelect = document.getElementById('size-select');
    
    if (productSelect && lastSelectedProduct) {
        productSelect.value = lastSelectedProduct;
    }
    
    if (colorSelect && lastSelectedColor) {
        const colorMap = {
            'red': 'Rojo',
            'black': 'Negro',
            'purple': 'Morado'
        };
        colorSelect.value = colorMap[lastSelectedColor] || lastSelectedColor;
    }
    
    if (sizeSelect && lastSelectedSize) {
        sizeSelect.value = lastSelectedSize;
    }
    
    updateSelectionPreview();
}

function updateSelectionPreview() {
    const preview = document.getElementById('selection-preview');
    const productSpan = document.getElementById('selected-product');
    const colorSpan = document.getElementById('selected-color');
    const sizeSpan = document.getElementById('selected-size');
    
    if (lastSelectedProduct || lastSelectedColor || lastSelectedSize) {
        if (preview) preview.style.display = 'block';
        if (productSpan) productSpan.textContent = lastSelectedProduct || '';
        if (colorSpan) colorSpan.textContent = lastSelectedColor || '';
        if (sizeSpan) sizeSpan.textContent = lastSelectedSize || '';
    } else {
        if (preview) preview.style.display = 'none';
    }
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const orderData = {
        nombre: formData.get('nombre') || e.target.querySelector('input[type="text"]').value,
        email: formData.get('email') || e.target.querySelector('input[type="email"]').value,
        producto: document.getElementById('product-select').value,
        color: document.getElementById('color-select').value,
        tamaño: document.getElementById('size-select').value,
        cantidad: e.target.querySelector('input[type="number"]').value,
        comentarios: e.target.querySelector('textarea').value
    };
    
    // Simple validation
    if (!orderData.nombre || !orderData.email) {
        alert('Por favor completa todos los campos requeridos.');
        return;
    }
    
    // Simulate order submission
    alert('¡Gracias por tu pedido! Te contactaremos pronto para confirmar los detalles.');
    
    // Reset form
    e.target.reset();
    lastSelectedProduct = '';
    lastSelectedColor = '';
    lastSelectedSize = '';
    updateSelectionPreview();
    
    console.log('Pedido enviado:', orderData);
}

// Smooth scrolling for navigation
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    updateScrollbarPosition();
});

// Intersection Observer for section detection (optional enhancement)
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && sectionId !== activeTab) {
                // Optional: Auto-update active tab based on scroll position
                // switchTab(sectionId);
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});