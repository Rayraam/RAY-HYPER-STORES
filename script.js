// Global Variables
let allProducts = [];
let displayedProducts = [];
let currentPage = 1;
const PRODUCTS_PER_PAGE = 12;
let isLoading = false;

// WhatsApp Configuration - UPDATE THIS WITH YOUR NUMBER
const WHATSAPP_NUMBER = '919876543210'; // Replace with your actual WhatsApp number

// Sample Products Data - WORKING VERSION
const sampleProducts = [
    {
        id: 1,
        name: "Elegant Red Silk Saree",
        category: "sarees",
        price: 2500,
        originalPrice: 3000,
        image: "https://drive.google.com/file/d/1vk8OBJXizG_-R-Y74YDG_359g6P1QKaV/view?usp=drive_link",
        description: "Beautiful red silk saree with golden border perfect for weddings and special occasions",
        inStock: true,
        isNew: false,
        onSale: true,
        tags: ["silk", "wedding", "traditional", "red"]
    },
    {
        id: 2,
        name: "Gold Plated Necklace Set",
        category: "jewelry",
        price: 1800,
        originalPrice: 2200,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80",
        description: "Elegant gold plated necklace with matching earrings perfect for parties",
        inStock: true,
        isNew: true,
        onSale: false,
        tags: ["gold", "necklace", "party", "elegant"]
    },
    {
        id: 3,
        name: "Blue Cotton Handloom Saree",
        category: "sarees",
        price: 1200,
        originalPrice: 1200,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&q=80",
        description: "Comfortable blue cotton handloom saree perfect for daily wear",
        inStock: true,
        isNew: false,
        onSale: false,
        tags: ["cotton", "daily", "blue", "comfortable"]
    },
    {
        id: 4,
        name: "Pearl Drop Earrings",
        category: "jewelry",
        price: 800,
        originalPrice: 1000,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&q=80",
        description: "Elegant pearl drop earrings with silver finish",
        inStock: true,
        isNew: false,
        onSale: true,
        tags: ["pearl", "earrings", "silver", "elegant"]
    },
    {
        id: 5,
        name: "Green Banarasi Silk Saree",
        category: "sarees",
        price: 4500,
        originalPrice: 5500,
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop&q=80",
        description: "Exquisite green Banarasi silk saree with heavy gold zari work",
        inStock: true,
        isNew: true,
        onSale: false,
        tags: ["banarasi", "silk", "premium", "green"]
    },
    {
        id: 6,
        name: "Diamond Tennis Bracelet",
        category: "jewelry",
        price: 3200,
        originalPrice: 4000,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&q=80",
        description: "Stunning diamond tennis bracelet with premium setting",
        inStock: true,
        isNew: false,
        onSale: true,
        tags: ["diamond", "bracelet", "premium", "luxury"]
    },
    {
        id: 7,
        name: "Purple Georgette Saree",
        category: "sarees",
        price: 2200,
        originalPrice: 2200,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&q=80",
        description: "Elegant purple georgette saree with embroidery work",
        inStock: true,
        isNew: false,
        onSale: false,
        tags: ["georgette", "purple", "embroidery", "party"]
    },
    {
        id: 8,
        name: "Silver Oxidized Jhumkas",
        category: "jewelry",
        price: 650,
        originalPrice: 800,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&q=80",
        description: "Traditional silver oxidized jhumkas with intricate design",
        inStock: true,
        isNew: true,
        onSale: true,
        tags: ["silver", "jhumkas", "traditional", "oxidized"]
    },
    {
        id: 9,
        name: "Pink Designer Saree",
        category: "sarees",
        price: 3200,
        originalPrice: 3800,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&q=80",
        description: "Designer pink saree with heavy work perfect for weddings",
        inStock: true,
        isNew: false,
        onSale: true,
        tags: ["designer", "pink", "wedding", "heavy work"]
    },
    {
        id: 10,
        name: "Gold Chain Necklace",
        category: "jewelry",
        price: 2800,
        originalPrice: 3200,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80",
        description: "Classic gold chain necklace perfect for daily wear",
        inStock: true,
        isNew: false,
        onSale: false,
        tags: ["gold", "chain", "daily", "classic"]
    },
    {
        id: 11,
        name: "Maroon Velvet Saree",
        category: "sarees",
        price: 2800,
        originalPrice: 3200,
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop&q=80",
        description: "Rich maroon velvet saree with golden border",
        inStock: true,
        isNew: true,
        onSale: true,
        tags: ["velvet", "maroon", "golden", "rich"]
    },
    {
        id: 12,
        name: "Emerald Ring Set",
        category: "jewelry",
        price: 4200,
        originalPrice: 5000,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&q=80",
        description: "Beautiful emerald ring set with matching earrings",
        inStock: true,
        isNew: false,
        onSale: true,
        tags: ["emerald", "ring", "set", "precious"]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    console.log('🏪 RAY HYPER STORE starting...');
    
    // Load products immediately
    loadProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Setup intersection observer for animations
    setupIntersectionObserver();
    
    console.log('✅ RAY HYPER STORE initialized successfully!');
}

// Load Products - FIXED VERSION
function loadProducts() {
    console.log('📦 Loading products...');
    
    // Always start with sample data
    allProducts = [...sampleProducts]; // Create a copy
    console.log('✅ Loaded', allProducts.length, 'sample products');
    
    // Display products immediately
    filterAndDisplayProducts();
    
    // Try to load from external JSON file (optional)
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
            } else if (data.length && Array.isArray(data)) {
                allProducts = data;
                console.log('✅ Updated with', allProducts.length, 'products from JSON array');
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
        console.log('✅ Search input listener added');
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryChange);
        console.log('✅ Category filter listener added');
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', handleSortChange);
        console.log('✅ Sort filter listener added');
    }
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', handlePriceChange);
        console.log('✅ Price range listener added');
    }
    
    // View toggle buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', handleViewChange);
    });
    console.log('✅ View toggle listeners added');
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    console.log('✅ Navigation listeners added');
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        console.log('✅ Contact form listener added');
    }
    
    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        console.log('✅ Mobile menu button listener added');
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        console.log('✅ Mobile menu close listener added');
    }
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    console.log('✅ All event listeners set up successfully');
}

// Debounce function for search
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

// Handle Category Change
function handleCategoryChange(event) {
    console.log('📂 Category changed to:', event.target.value);
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
        priceValue.textContent = event.target.value;
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

// Filter and Display Products - MAIN FUNCTION
function filterAndDisplayProducts() {
    console.log('🔄 Filtering and displaying products...');
    
    if (!allProducts || allProducts.length === 0) {
        console.log('❌ No products available');
        showNoProducts();
        return;
    }
    
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const sortBy = document.getElementById('sortFilter')?.value || 'newest';
    const maxPrice = parseInt(document.getElementById('priceRange')?.value || '10000');
    
    console.log('🔍 Filters:', { searchTerm, category, sortBy, maxPrice });
    
    // Filter products
    let filteredProducts = allProducts.filter(product => {
        if (!product || !product.name) return false;
        
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
        
        const matchesCategory = category === 'all' || product.category === category;
        const matchesPrice = product.price <= maxPrice;
        const inStock = product.inStock !== false; // Default to true if not specified
        
        return matchesSearch && matchesCategory && matchesPrice && inStock;
    });
    
    console.log('📊 Filtered', filteredProducts.length, 'products from', allProducts.length, 'total');
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, sortBy);
    
    // Reset pagination
    currentPage = 1;
    displayedProducts = filteredProducts;
    
    // Display products
    displayProducts();
    
    // Update results count
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

// Display Products - FIXED VERSION
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
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        const startIndex = 0;
        const endIndex = currentPage * PRODUCTS_PER_PAGE;
        const productsToShow = displayedProducts.slice(startIndex, endIndex);
        
        console.log('📦 Showing', productsToShow.length, 'products');
        
        if (productsToShow.length === 0) {
            showNoProducts();
        } else {
            productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
            
            // Add fade-in animation to product cards
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
        
        // Update load more button visibility
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
    const sortFilter = document.getElementById('sortFilter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'newest';
    if (priceRange) priceRange.value = '10000';
    if (priceValue) priceValue.textContent = '10000';
    
    filterAndDisplayProducts();
}

// Create Product Card
function createProductCard(product) {
    if (!product) return '';
    
    const discount = product.originalPrice && product.originalPrice > product.price ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    const whatsappMessage = `Hello! I'm interested in *${product.name}* priced at ₹${product.price}. Please share more details.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image || 'https://via.placeholder.com/400x400?text=No+Image'}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                ${product.isNew ? '<div class="product-badge new">New</div>' : ''}
                ${product.onSale ? '<div class="product-badge sale">Sale</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">₹${(product.price || 0).toLocaleString()}</span>
                    ${product.originalPrice && product.originalPrice > product.price ? 
                        `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                         <span class="discount-badge">${discount}% OFF</span>` : ''}
                </div>
                <div class="product-actions">
                    <a href="${whatsappUrl}" target="_blank" class="whatsapp-order">
                        <i class="fab fa-whatsapp"></i>
                        Order via WhatsApp
                    </a>
                    <button class="quick-view" onclick="showProductDetails(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
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

// Load More Products
function loadMoreProducts() {
    if (isLoading) return;
    
    isLoading = true;
    currentPage++;
    
    const productsGrid = document.getElementById('productsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!productsGrid) return;
    
    console.log('📥 Loading more products...');
    
    // Show loading state
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;
    }
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = currentPage * PRODUCTS_PER_PAGE;
        const newProducts = displayedProducts.slice(startIndex, endIndex);
        
        // Append new products
        const newProductsHTML = newProducts.map(product => createProductCard(product)).join('');
        productsGrid.insertAdjacentHTML('beforeend', newProductsHTML);
        
        // Update load more button
        if (loadMoreBtn) {
            if (endIndex < displayedProducts.length) {
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Products';
                loadMoreBtn.disabled = false;
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        // Update results count
        updateResultsCount(displayedProducts.length);
        
        // Add animation to new cards
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

// Show Product Details
function showProductDetails(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const whatsappMessage = `Hello! I want to know more about *${product.name}*. Please share detailed information including:\n\n• Available sizes\n• Color options\n• Delivery time\n• Return policy\n\nPrice: ₹${product.price}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
}

// Filter by Category
function filterByCategory(category) {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = category;
        filterAndDisplayProducts();
    }
    
    // Scroll to products section
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
    
    // Update active nav link
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
    
    // Create WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'Not provided'}\n*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    event.target.reset();
    
    // Show success message
    alert('Thank you for your message! We will contact you soon via WhatsApp.');
}

// Mobile Menu Functions
function initializeMobileMenu() {
    // Close mobile menu when clicking outside
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
    // Counter animation for stats
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
    
    // Intersection Observer for counter animation
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
    // Smooth scroll for anchor links
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
    
    // Observe elements that should animate
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
window.showProductDetails = showProductDetails;
window.clearFilters = clearFilters;

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card, .category-card, .stat-item, .about-feature, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .product-card.animate-in, 
    .category-card.animate-in, 
    .stat-item.animate-in, 
    .about-feature.animate-in, 
    .contact-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

console.log('🚀 RAY HYPER STORE JavaScript loaded successfully!');