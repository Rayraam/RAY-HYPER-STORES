// Global Variables
let allProducts = [];
let displayedProducts = [];
let currentPage = 1;
const PRODUCTS_PER_PAGE = 12;
let isLoading = false;

// Cart System (using in-memory storage for Claude.ai compatibility)
let cartItems = []; // In your environment, replace with localStorage
let currentCurrency = 'INR';
const CART_STORAGE_KEY = 'raystore_cart';
let exchangeRates = {
    'INR': 1,
    'GBP': 0.012,
    'USD': 0.012,
    'CAD': 0.016,
    'LKR': 3.65
};
let userCountry = 'IN';

// WhatsApp Configuration
const WHATSAPP_NUMBER = '919698639115';

// Enhanced Sample Products Data with specifications
const sampleProducts = [
    {
        id: 1,
        name: "SR001-Kalyani Cotton/Lata Gadwal Paithani Saree",
        category: "sarees",
        subCategory: "Kalyani Cotton",
        price: 1223,
        originalPrice: 1223,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=800&fit=crop&q=80"
        ],
        description: "Beautiful red silk saree with golden border perfect for weddings and special occasions",
        specifications: {
            "Material": "100% Cotton with Acrylic thread",
            "Length": "6.30 meters with blouse",
            "Work": "Thread puttas all over",
            "Pallu": "Grand jari pallu",
            "Blouse": "Contrast blouse included",
            "Care": "Dry clean recommended",
            "Origin": "Handloom"
        },
        inStock: true,
        isNew: true,
        onSale: false,
        tags: ["cotton", "paithani", "traditional", "handloom"]
    },
    {
        id: 2,
        name: "Gold Plated Necklace Set",
        category: "jewelry",
        subCategory: "Necklace Sets",
        price: 1800,
        originalPrice: 2200,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop&q=80"
        ],
        description: "Elegant gold plated necklace with matching earrings perfect for parties",
        specifications: {
            "Material": "Gold Plated Brass",
            "Set Includes": "Necklace + Earrings",
            "Chain Length": "16-18 inches adjustable",
            "Closure": "Lobster clasp",
            "Occasion": "Party, Festival, Wedding",
            "Care": "Keep away from water and chemicals",
            "Weight": "65 grams (approx)"
        },
        inStock: true,
        isNew: true,
        onSale: true,
        tags: ["gold", "necklace", "party", "elegant"]
    },
    {
        id: 3,
        name: "Blue Cotton Handloom Saree",
        category: "sarees",
        subCategory: "Cotton Handloom",
        price: 1200,
        originalPrice: 1200,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=800&fit=crop&q=80"
        ],
        description: "Comfortable blue cotton handloom saree perfect for daily wear",
        specifications: {
            "Material": "100% Pure Cotton",
            "Length": "6.30 meters with blouse",
            "Weave": "Handloom",
            "Border": "Traditional border design",
            "Blouse": "Running blouse included",
            "Care": "Machine wash cold",
            "GSM": "120 GSM"
        },
        inStock: true,
        isNew: false,
        onSale: false,
        tags: ["cotton", "daily", "blue", "comfortable"]
    },
    {
        id: 4,
        name: "Pearl Drop Earrings",
        category: "jewelry",
        subCategory: "Earrings",
        price: 800,
        originalPrice: 1000,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&q=80"
        ],
        description: "Elegant pearl drop earrings with silver finish",
        specifications: {
            "Material": "Sterling Silver with Pearl",
            "Pearl Type": "Freshwater Pearl",
            "Drop Length": "2.5 inches",
            "Closure": "French hook",
            "Occasion": "Daily wear, Office, Party",
            "Care": "Store in jewelry box, avoid moisture",
            "Weight": "8 grams"
        },
        inStock: true,
        isNew: false,
        onSale: true,
        tags: ["pearl", "earrings", "silver", "elegant"]
    },
    {
        id: 5,
        name: "Green Banarasi Silk Saree",
        category: "sarees",
        subCategory: "Banarasi Silk",
        price: 4500,
        originalPrice: 5500,
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=800&fit=crop&q=80"
        ],
        description: "Exquisite green Banarasi silk saree with heavy gold zari work",
        specifications: {
            "Material": "Pure Banarasi Silk",
            "Length": "6.30 meters with blouse",
            "Work": "Heavy Zari Work",
            "Weave": "Handwoven",
            "Blouse": "Matching blouse piece",
            "Care": "Dry clean only",
            "Thread Count": "High density weave"
        },
        inStock: true,
        isNew: true,
        onSale: false,
        tags: ["banarasi", "silk", "premium", "green"]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
async function initializeApp() {
    console.log('🏪 RAY HYPER STORE starting...');
    
    // Detect user location and set currency
    await detectUserLocation();
    
    // Load products
    loadProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize cart
    initializeCart();
    
    // Initialize animations
    initializeAnimations();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Setup intersection observer
    setupIntersectionObserver();
    
    // Update currency display
    updateCurrencyDisplay();
    
    console.log('✅ RAY HYPER STORE initialized successfully!');
}

// Detect User Location for Currency
async function detectUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        userCountry = data.country_code;
        
        // Set currency based on country
        switch(userCountry) {
            case 'GB':
                currentCurrency = 'GBP';
                break;
            case 'US':
                currentCurrency = 'USD';
                break;
            case 'CA':
                currentCurrency = 'CAD';
                break;
            case 'LK':
                currentCurrency = 'LKR';
                break;
            default:
                currentCurrency = 'INR';
        }
        
        console.log(`🌍 Detected country: ${userCountry}, Currency: ${currentCurrency}`);
    } catch (error) {
        console.log('📍 Using default location (India)');
        userCountry = 'IN';
        currentCurrency = 'INR';
    }
}

// Convert price to current currency
function convertPrice(priceINR) {
    const convertedPrice = priceINR * exchangeRates[currentCurrency];
    return Math.round(convertedPrice * 100) / 100;
}

// Format price with currency symbol
function formatPrice(price) {
    const convertedPrice = convertPrice(price);
    const symbols = {
        'INR': '₹',
        'GBP': '£',
        'USD': '$',
        'CAD': 'C$',
        'LKR': 'Rs.'
    };
    
    return `${symbols[currentCurrency]}${convertedPrice.toLocaleString()}`;
}

// Initialize Cart System
function initializeCart() {
    console.log('🛒 Initializing cart system...');
    
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
            console.log('✅ Loaded', cartItems.length, 'items from cart storage');
        } else {
            cartItems = [];
            console.log('🆕 Starting with empty cart');
        }
    } catch (error) {
        console.log('⚠️ Error loading cart, starting fresh:', error.message);
        cartItems = [];
    }
    
    updateCartCounter();
    console.log('🛒 Cart system initialized successfully');
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    console.log('🛒 Adding to cart:', productId, 'quantity:', quantity);
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        console.error('❌ Product not found:', productId);
        showCartNotification('❌ Product not found!', 'error');
        return;
    }
    
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        // ITEM ALREADY EXISTS - INCREASE QUANTITY
        const existingItem = cartItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        
        const maxQuantity = 10;
        if (newQuantity > maxQuantity) {
            showCartNotification(`⚠️ Maximum ${maxQuantity} items allowed per product`, 'warning');
            return;
        }
        
        cartItems[existingItemIndex].quantity = newQuantity;
        cartItems[existingItemIndex].addedAt = new Date().toISOString();
        
        showCartNotification(`📝 Updated quantity to ${newQuantity} for ${product.name}`, 'info');
        console.log('📝 Updated existing item quantity:', newQuantity);
        
    } else {
        // NEW ITEM - ADD TO CART
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            subCategory: product.subCategory,
            description: product.description,
            quantity: quantity,
            addedAt: new Date().toISOString()
        };
        
        cartItems.push(cartItem);
        showCartNotification(`✅ ${product.name} added to cart!`, 'success');
        console.log('✅ Added new item to cart:', product.name);
    }
    
    saveCartToStorage();
    updateCartCounter();
}

// Remove item from cart
function removeFromCart(productId) {
    console.log('🗑️ Removing from cart:', productId);
    
    const itemToRemove = cartItems.find(item => item.id === productId);
    if (itemToRemove) {
        cartItems = cartItems.filter(item => item.id !== productId);
        saveCartToStorage();
        updateCartCounter();
        
        const cartDrawer = document.getElementById('cartDrawer');
        if (cartDrawer && cartDrawer.classList.contains('open')) {
            updateCartDrawerContent(cartDrawer);
        }
        
        showCartNotification(`🗑️ ${itemToRemove.name} removed from cart`, 'info');
        console.log('✅ Item removed from cart');
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        console.log('💾 Cart saved to storage');
    } catch (error) {
        console.error('❌ Error saving cart:', error.message);
        showCartNotification('⚠️ Error saving cart', 'warning');
    }
}

// Update cart counter in header
function updateCartCounter() {
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Show cart notification
function showCartNotification(message, type = 'success') {
    console.log('🔔 Notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c', 
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Load Products
function loadProducts() {
    console.log('📦 Loading products...');
    
    allProducts = [...sampleProducts];
    console.log('✅ Loaded', allProducts.length, 'sample products');
    
    filterAndDisplayProducts();
    
    // Try to load from external JSON file
    fetch('./data/products.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('External products file not found');
        })
        .then(data => {
            if (data.products && data.products.length > 0) {
                allProducts = data.products;
                console.log('✅ Updated with', allProducts.length, 'products from JSON file');
                filterAndDisplayProducts();
            }
        })
        .catch(error => {
            console.log('ℹ️ Using sample data:', error.message);
        });
}

// Setup Event Listeners
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Category filters
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryChange);
    }
    
    const subCategoryFilter = document.getElementById('subCategoryFilter');
    if (subCategoryFilter) {
        subCategoryFilter.addEventListener('change', handleSubCategoryChange);
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', handleSortChange);
    }
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', handlePriceChange);
    }
    
    // View toggle buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', handleViewChange);
    });
    
    // Currency selector
    const currencySelector = document.getElementById('currencySelector');
    if (currencySelector) {
        currencySelector.addEventListener('change', handleCurrencyChange);
    }
    
    // Cart icon
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCartDrawer);
    }
    
    // Navigation and other existing listeners
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    console.log('✅ All event listeners set up successfully');
}

// Handle Currency Change
function handleCurrencyChange(event) {
    currentCurrency = event.target.value;
    updateCurrencyDisplay();
    filterAndDisplayProducts(); // Refresh to show new prices
    console.log('💱 Currency changed to:', currentCurrency);
}

// Update Currency Display
function updateCurrencyDisplay() {
    const currencySelector = document.getElementById('currencySelector');
    if (currencySelector) {
        currencySelector.value = currentCurrency;
    }
}

// Handle Sub Category Change
function handleSubCategoryChange(event) {
    console.log('📂 Sub-category changed to:', event.target.value);
    filterAndDisplayProducts();
}

// Populate sub-categories based on main category
function populateSubCategories(category) {
    const subCategoryFilter = document.getElementById('subCategoryFilter');
    if (!subCategoryFilter) return;
    
    let subCategories = [];
    
    if (category === 'sarees') {
        subCategories = ['All Sub-Categories', 'Kalyani Cotton', 'Lata Gadwal Paithani', 'Cotton Handloom', 'Banarasi Silk'];
    } else if (category === 'jewelry') {
        subCategories = ['All Sub-Categories', 'Necklace Sets', 'Earrings', 'Bangles', 'Rings'];
    } else {
        subCategories = ['All Sub-Categories'];
    }
    
    subCategoryFilter.innerHTML = subCategories.map((subCat, index) => 
        `<option value="${index === 0 ? 'all' : subCat.toLowerCase().replace(/\s+/g, '')}">${subCat}</option>`
    ).join('');
}

// Handle Category Change
function handleCategoryChange(event) {
    const category = event.target.value;
    console.log('📂 Category changed to:', category);
    
    populateSubCategories(category);
    filterAndDisplayProducts();
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle Search
function handleSearch(event) {
    console.log('🔍 Searching for:', event.target.value);
    filterAndDisplayProducts();
}

// Handle Sort Change
function handleSortChange(event) {
    console.log('🔄 Sort changed to:', event.target.value);
    filterAndDisplayProducts();
}

// Handle Price Change
function handlePriceChange(event) {
    const priceValue = document.getElementById('priceValue');
    if (priceValue) {
        priceValue.textContent = formatPrice(event.target.value);
    }
    console.log('💰 Price range changed to:', event.target.value);
    filterAndDisplayProducts();
}

// Handle View Change
function handleViewChange(event) {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    viewButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const viewType = event.target.dataset.view;
    console.log('👁️ View changed to:', viewType);
    
    if (productsGrid) {
        if (viewType === 'list') {
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.classList.remove('list-view');
        }
    }
}

// Filter and Display Products
function filterAndDisplayProducts() {
    console.log('🔄 Filtering and displaying products...');
    
    if (!allProducts || allProducts.length === 0) {
        console.log('❌ No products available');
        showNoProducts();
        return;
    }
    
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const subCategory = document.getElementById('subCategoryFilter')?.value || 'all';
    const sortBy = document.getElementById('sortFilter')?.value || 'newest';
    const maxPrice = parseInt(document.getElementById('priceRange')?.value || '10000');
    
    console.log('🔍 Filters:', { searchTerm, category, subCategory, sortBy, maxPrice });
    
    // Filter products
    let filteredProducts = allProducts.filter(product => {
        if (!product || !product.name) return false;
        
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
        
        const matchesCategory = category === 'all' || product.category === category;
        const matchesSubCategory = subCategory === 'all' || 
            product.subCategory?.toLowerCase().replace(/\s+/g, '') === subCategory;
        const matchesPrice = product.price <= maxPrice;
        const inStock = product.inStock !== false;
        
        return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice && inStock;
    });
    
    console.log('📊 Filtered', filteredProducts.length, 'products from', allProducts.length, 'total');
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, sortBy);
    
    currentPage = 1;
    displayedProducts = filteredProducts;
    
    displayProducts();
    updateResultsCount(filteredProducts.length);
}

// Sort Products
function sortProducts(products, sortBy) {
    if (!products || !Array.isArray(products)) return [];
    
    switch (sortBy) {
        case 'price-low':
            return products.sort((a, b) => (a.price || 0) - (b.price || 0));
        case 'price-high':
            return products.sort((a, b) => (b.price || 0) - (a.price || 0));
        case 'name':
            return products.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        case 'newest':
        default:
            return products.sort((a, b) => (b.id || 0) - (a.id || 0));
    }
}

// Display Products
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!productsGrid) {
        console.log('❌ Products grid element not found');
        return;
    }
    
    console.log('🎨 Displaying products...');
    showLoading(true);
    
    setTimeout(() => {
        const startIndex = 0;
        const endIndex = currentPage * PRODUCTS_PER_PAGE;
        const productsToShow = displayedProducts.slice(startIndex, endIndex);
        
        console.log('📦 Showing', productsToShow.length, 'products');
        
        if (productsToShow.length === 0) {
            showNoProducts();
        } else {
            productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
            
            // Add fade-in animation
            const productCards = productsGrid.querySelectorAll('.product-card');
            productCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
        
        // Update load more button
        if (loadMoreBtn) {
            if (endIndex < displayedProducts.length) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        showLoading(false);
        console.log('✅ Products displayed successfully');
        
    }, 300);
}

// Create Product Card with enhanced features
function createProductCard(product) {
    if (!product) return '';
    
    const discount = product.originalPrice && product.originalPrice > product.price ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    const whatsappMessage = `Hello! I'm interested in *${product.name}* priced at ${formatPrice(product.price)}. Please share more details.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Create specifications preview
    const specsPreview = product.specifications ? 
        Object.entries(product.specifications).slice(0, 3).map(([key, value]) => 
            `<div class="spec-item"><strong>${key}:</strong> ${value}</div>`
        ).join('') : '';
    
    const hasMoreSpecs = product.specifications && Object.keys(product.specifications).length > 3;
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image" onclick="openProductDetail(${product.id})">
                <img src="${product.image || 'https://via.placeholder.com/400x400?text=No+Image'}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                ${product.isNew ? '<div class="product-badge new">New</div>' : ''}
                ${product.onSale ? '<div class="product-badge sale">Sale</div>' : ''}
                <div class="product-overlay">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                ${specsPreview ? `
                <div class="product-specs">
                    ${specsPreview}
                    ${hasMoreSpecs ? '<div class="specs-toggle" onclick="toggleSpecs(this)">Show More <i class="fas fa-chevron-down"></i></div>' : ''}
                    ${hasMoreSpecs ? `
                    <div class="specs-hidden" style="display: none;">
                        ${Object.entries(product.specifications).slice(3).map(([key, value]) => 
                            `<div class="spec-item"><strong>${key}:</strong> ${value}</div>`
                        ).join('')}
                    </div>` : ''}
                </div>` : ''}
                
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice && product.originalPrice > product.price ? 
                        `<span class="original-price">${formatPrice(product.originalPrice)}</span>
                         <span class="discount-badge">${discount}% OFF</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <a href="${whatsappUrl}" target="_blank" class="whatsapp-order">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <button class="quick-view" onclick="openProductDetail(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Toggle specifications in product card
function toggleSpecs(element) {
    const specsHidden = element.parentElement.querySelector('.specs-hidden');
    const icon = element.querySelector('i');
    
    if (specsHidden.style.display === 'none') {
        specsHidden.style.display = 'block';
        element.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
    } else {
        specsHidden.style.display = 'none';
        element.innerHTML = 'Show More <i class="fas fa-chevron-down"></i>';
    }
}

// Open Product Detail Page
function openProductDetail(productId) {
    // In a real implementation, this would navigate to product.html?id=${productId}
    // For now, we'll create a modal-like detailed view
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    createProductDetailModal(product);
}

// Create Product Detail Modal
function createProductDetailModal(product) {
    const modal = document.createElement('div');
    modal.className = 'product-detail-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeProductDetail()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeProductDetail()">
                <i class="fas fa-times"></i>
            </button>
            <div class="product-detail-grid">
                <div class="product-images">
                    <div class="main-image">
                        <img id="mainProductImage" src="${product.image}" alt="${product.name}">
                        <div class="zoom-indicator">
                            <i class="fas fa-search-plus"></i>
                            Click to zoom
                        </div>
                    </div>
                    ${product.images && product.images.length > 1 ? `
                    <div class="thumbnail-images">
                        ${product.images.map((img, index) => `
                            <img src="${img}" alt="${product.name} ${index + 1}" 
                                 onclick="changeMainImage('${img}')" class="thumbnail">
                        `).join('')}
                    </div>` : ''}
                </div>
                <div class="product-detail-info">
                    <h1>${product.name}</h1>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice && product.originalPrice > product.price ? 
                            `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    
                    ${product.specifications ? `
                    <div class="product-specifications">
                        <h3>Specifications</h3>
                        <div class="specs-grid">
                            ${Object.entries(product.specifications).map(([key, value]) => 
                                `<div class="spec-row">
                                    <span class="spec-label">${key}:</span>
                                    <span class="spec-value">${value}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>` : ''}
                    
                    <div class="product-actions-detail">
                        <div class="quantity-selector">
                            <button onclick="decrementQuantity()">-</button>
                            <input type="number" id="productQuantity" value="1" min="1" max="10">
                            <button onclick="incrementQuantity()">+</button>
                        </div>
                        <button class="add-to-cart-btn primary" onclick="addToCartFromDetail(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I want to order *${product.name}* priced at ${formatPrice(product.price)}.`)}" 
                           target="_blank" class="whatsapp-order-btn">
                            <i class="fab fa-whatsapp"></i>
                            Order via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add click-to-zoom functionality
    const mainImage = document.getElementById('mainProductImage');
    mainImage.onclick = () => zoomImage(mainImage.src);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

// Close Product Detail Modal
function closeProductDetail() {
    const modal = document.querySelector('.product-detail-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Change main image in detail view
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Zoom image functionality
function zoomImage(imageSrc) {
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal';
    zoomModal.innerHTML = `
        <div class="zoom-overlay" onclick="closeZoom()"></div>
        <div class="zoom-content">
            <img src="${imageSrc}" alt="Zoomed Image" id="zoomedImage">
            <button class="zoom-close" onclick="closeZoom()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(zoomModal);
    
    setTimeout(() => {
        zoomModal.classList.add('show');
    }, 100);
}

// Close zoom modal
function closeZoom() {
    const zoomModal = document.querySelector('.zoom-modal');
    if (zoomModal) {
        zoomModal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(zoomModal);
        }, 300);
    }
}

// Quantity selector functions
function incrementQuantity() {
    const quantityInput = document.getElementById('productQuantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    }
}

function decrementQuantity() {
    const quantityInput = document.getElementById('productQuantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    }
}

// Add to cart from detail view
function addToCartFromDetail(productId) {
    const quantityInput = document.getElementById('productQuantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    addToCart(productId, quantity);
}

// Toggle Cart Drawer
function toggleCartDrawer() {
    const cartDrawer = document.getElementById('cartDrawer');
    if (!cartDrawer) {
        createCartDrawer();
    } else {
        cartDrawer.classList.toggle('open');
    }
}

// Create Cart Drawer
function createCartDrawer() {
    const cartDrawer = document.createElement('div');
    cartDrawer.id = 'cartDrawer';
    cartDrawer.className = 'cart-drawer';
    
    updateCartDrawerContent(cartDrawer);
    document.body.appendChild(cartDrawer);
    
    setTimeout(() => {
        cartDrawer.classList.add('open');
    }, 100);
}

// Update Cart Drawer Content
function updateCartDrawerContent(cartDrawer) {
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    cartDrawer.innerHTML = `
        <div class="cart-header">
            <h3>Shopping Cart (${totalItems})</h3>
            <button onclick="toggleCartDrawer()" class="cart-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="cart-body">
            ${cartItems.length === 0 ? `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h4>Your cart is empty</h4>
                    <p>Add some products to get started!</p>
                </div>
            ` : `
                <div class="cart-items">
                    ${cartItems.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <div class="cart-item-price">${formatPrice(item.price)}</div>
                                <div class="cart-item-controls">
                                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                    <button onclick="removeFromCart(${item.id})" class="remove-item">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary">
                    <div class="cart-total">
                        <strong>Total: ${formatPrice(totalAmount)}</strong>
                    </div>
                    <button onclick="proceedToWhatsAppCheckout()" class="checkout-btn">
                        <i class="fab fa-whatsapp"></i>
                        Checkout via WhatsApp
                    </button>
                </div>
            `}
        </div>
    `;
}

// Update cart quantity
function updateCartQuantity(productId, newQuantity) {
    console.log('📝 Updating cart quantity:', productId, newQuantity);
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const maxQuantity = 10;
    if (newQuantity > maxQuantity) {
        showCartNotification(`⚠️ Maximum ${maxQuantity} items allowed`, 'warning');
        return;
    }
    
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = newQuantity;
        cartItems[itemIndex].addedAt = new Date().toISOString();
        
        saveCartToStorage();
        updateCartCounter();
        
        const cartDrawer = document.getElementById('cartDrawer');
        if (cartDrawer && cartDrawer.classList.contains('open')) {
            updateCartDrawerContent(cartDrawer);
        }
        
        console.log('✅ Cart quantity updated');
    }
}

// Proceed to WhatsApp checkout
function proceedToWhatsAppCheckout() {
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const orderMessage = `*New Order from RAY HYPER STORE*\n\n` +
        `*Items:*\n` +
        cartItems.map(item => 
            `• ${item.name}\n  Quantity: ${item.quantity}\n  Price: ${formatPrice(item.price)} each\n  Subtotal: ${formatPrice(item.price * item.quantity)}\n`
        ).join('\n') +
        `\n*Total Amount: ${formatPrice(totalAmount)}*\n\n` +
        `Please confirm this order and provide:\n` +
        `• Delivery address\n` +
        `• Preferred delivery date\n` +
        `• Payment method\n\n` +
        `Thank you for shopping with us!`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Show Loading State
function showLoading(show) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        if (show) {
            loadingSpinner.classList.add('show');
        } else {
            loadingSpinner.classList.remove('show');
        }
    }
}

// Update Results Count
function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        const showing = Math.min(currentPage * PRODUCTS_PER_PAGE, count);
        resultsCount.textContent = `Showing ${showing} of ${count} products`;
    }
}

// Show No Products Message
function showNoProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <h3 style="margin-bottom: 1rem;">No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button onclick="clearFilters()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Clear Filters
                </button>
            </div>
        `;
    }
}

// Clear Filters Function
function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const subCategoryFilter = document.getElementById('subCategoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (subCategoryFilter) subCategoryFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'newest';
    if (priceRange) priceRange.value = '10000';
    if (priceValue) priceValue.textContent = formatPrice(10000);
    
    filterAndDisplayProducts();
}

// Load More Products
function loadMoreProducts() {
    if (isLoading) return;
    
    isLoading = true;
    currentPage++;
    
    const productsGrid = document.getElementById('productsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!productsGrid) return;
    
    console.log('📥 Loading more products...');
    
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;
    }
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = currentPage * PRODUCTS_PER_PAGE;
        const newProducts = displayedProducts.slice(startIndex, endIndex);
        
        const newProductsHTML = newProducts.map(product => createProductCard(product)).join('');
        productsGrid.insertAdjacentHTML('beforeend', newProductsHTML);
        
        if (loadMoreBtn) {
            if (endIndex < displayedProducts.length) {
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Products';
                loadMoreBtn.disabled = false;
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        updateResultsCount(displayedProducts.length);
        
        const newCards = productsGrid.querySelectorAll('.product-card:nth-last-child(-n+' + newProducts.length + ')');
        newCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        isLoading = false;
        console.log('✅ More products loaded');
    }, 1000);
}

// Filter by Category
function filterByCategory(category) {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = category;
        populateSubCategories(category);
        filterAndDisplayProducts();
    }
    
    scrollToProducts();
}

// Scroll to Products
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle Navigation
function handleNavigation(event) {
    event.preventDefault();
    
    const targetId = event.target.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}

// Handle Contact Form Submit
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const message = document.getElementById('message')?.value;
    
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const whatsappMessage = `*New Contact Form Submission*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'Not provided'}\n*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    event.target.reset();
    alert('Thank you for your message! We will contact you soon via WhatsApp.');
}

// Mobile Menu Functions
function initializeMobileMenu() {
    document.addEventListener('click', (event) => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

// Initialize Animations
function initializeAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll(
        '.product-card, .category-card, .stat-item, .about-feature, .contact-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Export functions for global use
window.scrollToProducts = scrollToProducts;
window.filterByCategory = filterByCategory;
window.loadMoreProducts = loadMoreProducts;
window.clearFilters = clearFilters;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCartDrawer = toggleCartDrawer;
window.toggleSpecs = toggleSpecs;
window.openProductDetail = openProductDetail;
window.closeProductDetail = closeProductDetail;
window.changeMainImage = changeMainImage;
window.zoomImage = zoomImage;
window.closeZoom = closeZoom;
window.incrementQuantity = incrementQuantity;
window.decrementQuantity = decrementQuantity;
window.addToCartFromDetail = addToCartFromDetail;
window.updateCartQuantity = updateCartQuantity;
window.proceedToWhatsAppCheckout = proceedToWhatsAppCheckout;

console.log('🚀 RAY HYPER STORE JavaScript loaded successfully!');