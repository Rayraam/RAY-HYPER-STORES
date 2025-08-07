// 🏪 RAY HYPER STORE - Enhanced Configuration File
// =====================================================
// Update these settings to customize your store

const STORE_CONFIG = {
    // 📞 CONTACT INFORMATION
    // ----------------------
    store: {
        name: "RAY HYPER STORE",
        tagline: "Premium Sarees & Jewelry",
        description: "Discover 10,000+ Premium Sarees and Elegant Jewelry Collections",
        email: "contact.rayraam@gmail.com",
        phone: "+91 96986 39115",
        whatsappNumber: "919698639115", // WITHOUT + sign, WITH country code
        address: "119,Shakespear street, Eastham, London, United Kingdom E12 6LW",
        website: "https://raystore.com"
    },

    // 🎨 DESIGN & BRANDING
    // --------------------
    branding: {
        primaryColor: "#667eea",
        secondaryColor: "#764ba2", 
        whatsappColor: "#25D366",
        logoText: "R", // Single letter or small logo text
        fontFamily: "Poppins", // Google Font name
        favicon: "/favicon.ico"
    },

    // 💱 CURRENCY SETTINGS
    // --------------------
    currency: {
        default: "INR",
        supported: ["INR", "GBP", "USD", "CAD", "LKR"],
        symbols: {
            "INR": "₹",
            "GBP": "£", 
            "USD": "$",
            "CAD": "C$",
            "LKR": "Rs."
        },
        exchangeRates: {
            "INR": 1,
            "GBP": 0.012,
            "USD": 0.012,
            "CAD": 0.016,
            "LKR": 3.65
        },
        // Update exchange rates from API
        autoUpdateRates: false, // Set to true to fetch live rates
        rateUpdateInterval: 3600000 // 1 hour in milliseconds
    },

    // 💬 WHATSAPP MESSAGES
    // -------------------
    messages: {
        productInquiry: "Hello! I'm interested in *{productName}* priced at {price}. Please share more details including:\n\n• Available sizes\n• Color options\n• Delivery time\n• Return policy",
        
        contactForm: "*New Contact Form Submission*\n\n*Name:* {name}\n*Email:* {email}\n*Phone:* {phone}\n*Message:* {message}",
        
        generalInquiry: "Hello! I'm interested in your products. Please share your latest catalog and pricing.",
        
        productDetails: "Hello! I want to know more about *{productName}*. Please share detailed information.",
        
        bulkOrder: "Hello! I'm interested in bulk orders. Please share:\n\n• Bulk pricing\n• Minimum order quantity\n• Delivery terms\n• Payment options",

        cartCheckout: "*New Order from RAY HYPER STORE*\n\n*Items:*\n{itemsList}\n\n*Total Amount: {totalAmount}*\n\nPlease confirm this order and provide:\n• Delivery address\n• Preferred delivery date\n• Payment method\n\nThank you for shopping with us!"
    },

    // 🛍️ PRODUCT SETTINGS
    // -------------------
    products: {
        productsPerPage: 12,
        enableSearch: true,
        enableFilters: true,
        enableSorting: true,
        enableViewToggle: true,
        enableLoadMore: true,
        enableSpecifications: true,
        enableZoom: true,
        enableCart: true,
        defaultSort: "newest", // newest, price-low, price-high, name
        categories: {
            sarees: {
                name: "Sarees",
                icon: "👗",
                subCategories: [
                    "Kalyani Cotton",
                    "Lata Gadwal Paithani", 
                    "Banarasi Silk",
                    "Cotton Handloom",
                    "Georgette",
                    "Chiffon"
                ]
            },
            jewelry: {
                name: "Jewelry", 
                icon: "💎",
                subCategories: [
                    "Necklace Sets",
                    "Earrings",
                    "Bracelets", 
                    "Rings",
                    "Bangles",
                    "Anklets"
                ]
            }
        }
    },

    // 🛒 CART SETTINGS
    // ----------------
    cart: {
        enablePersistentStorage: true, // Set to false for session-only cart
        storageKey: "raystore_cart",
        maxQuantityPerItem: 10,
        enableQuantitySelector: true,
        autoOpenOnAdd: false, // Auto-open cart drawer when item added
        enableNotifications: true,
        notificationDuration: 3000 // milliseconds
    },

    // 🌍 GEOLOCATION & AUTO-CURRENCY
    // ------------------------------
    geolocation: {
        enabled: true,
        apiUrl: "https://ipapi.co/json/",
        fallbackCountry: "IN", // Default country if detection fails
        fallbackCurrency: "INR",
        countryToCurrency: {
            "IN": "INR",
            "GB": "GBP", 
            "US": "USD",
            "CA": "CAD",
            "LK": "LKR"
        }
    },

    // 📱 PWA SETTINGS
    // --------------
    pwa: {
        enabled: true,
        name: "RAY HYPER STORE",
        shortName: "RAY STORE",
        themeColor: "#667eea",
        backgroundColor: "#ffffff",
        manifestPath: "/manifest.json"
    },

    // 🎯 FEATURES
    // -----------
    features: {
        enableAnimations: true,
        enableLazyLoading: true,
        enableMobileMenu: true,
        enableFloatingWhatsApp: true,
        enableContactForm: true,
        enableStatsCounter: true,
        enableHeroSection: true,
        enableAboutSection: true,
        enableDarkMode: false, // Future feature
        enableWishlist: false, // Future feature
        enableCompareProducts: false // Future feature
    },

    // 📊 ANALYTICS
    // -----------
    analytics: {
        googleAnalyticsId: "", // Add your GA4 ID (e.g., "G-XXXXXXXXXX")
        facebookPixelId: "", // Add your Facebook Pixel ID
        enableHotjar: false,
        hotjarId: "",
        enableCartTracking: true,
        enableProductViewTracking: true
    },

    // 🔧 ADVANCED SETTINGS
    // --------------------
    advanced: {
        imageQuality: 80, // 1-100
        loadingTimeout: 500, // milliseconds
        animationDuration: 300, // milliseconds
        debounceDelay: 300, // Search input debounce delay
        enableDebugMode: false,
        enableServiceWorker: true,
        enableOfflineMode: false, // Future feature
        maxImageSize: "800x800", // For optimization
        enableImageLazyLoading: true
    },

    // 🌐 SOCIAL MEDIA
    // --------------
    social: {
        facebook: "https://facebook.com/raystore",
        instagram: "https://instagram.com/raystore", 
        youtube: "https://youtube.com/raystore",
        whatsapp: "https://wa.me/919698639115",
        twitter: "https://twitter.com/raystore",
        pinterest: "https://pinterest.com/raystore"
    },

    // 📍 BUSINESS HOURS & INFO
    // -----------------------
    business: {
        hours: {
            monday: "9:00 AM - 8:00 PM",
            tuesday: "9:00 AM - 8:00 PM", 
            wednesday: "9:00 AM - 8:00 PM",
            thursday: "9:00 AM - 8:00 PM",
            friday: "9:00 AM - 8:00 PM",
            saturday: "9:00 AM - 9:00 PM",
            sunday: "10:00 AM - 6:00 PM"
        },
        established: "2015",
        experience: "10+ years",
        totalProducts: "10,000+",
        happyCustomers: "50,000+",
        deliveryCountries: ["India", "UK", "USA", "Canada", "Sri Lanka"],
        returnPolicy: "7 days return policy"
    },

    // 📦 SHIPPING & POLICIES
    // ---------------------
    policies: {
        shipping: {
            freeShippingAbove: 2000, // In base currency (INR)
            deliveryTime: "3-7 business days",
            codAvailable: true,
            returnPolicy: "7 days return policy",
            exchangePolicy: "14 days exchange policy",
            warrantyPolicy: "6 months warranty on jewelry"
        },
        payment: {
            methods: ["UPI", "Net Banking", "Credit Card", "Debit Card", "COD", "PayPal"],
            securePayment: true,
            acceptedCards: ["Visa", "MasterCard", "American Express", "Rupay"]
        }
    },

    // 🔔 NOTIFICATIONS
    // ----------------
    notifications: {
        cartAddSuccess: "✅ Item added to cart successfully!",
        cartRemoveSuccess: "🗑️ Item removed from cart",
        cartUpdateSuccess: "📝 Cart updated successfully",
        contactFormSuccess: "📧 Message sent successfully! We'll contact you soon.",
        genericError: "❌ Something went wrong. Please try again.",
        networkError: "🌐 Network error. Please check your connection."
    },

    // 🎨 UI CUSTOMIZATION
    // -------------------
    ui: {
        showProductBadges: true, // New, Sale badges
        showDiscountPercentage: true,
        showOriginalPrice: true,
        enableProductHover: true,
        enableSmoothScrolling: true,
        cardStyle: "rounded", // rounded, square, minimal
        buttonStyle: "rounded", // rounded, square, pill
        colorScheme: "light" // light, dark, auto
    }
};

// 🔧 UTILITY FUNCTIONS
// ===================

// Generate WhatsApp URL with message
function generateWhatsAppURL(messageTemplate, data = {}) {
    let message = STORE_CONFIG.messages[messageTemplate] || messageTemplate;
    
    // Replace placeholders in message
    Object.keys(data).forEach(key => {
        const regex = new RegExp(`{${key}}`, 'g');
        message = message.replace(regex, data[key]);
    });
    
    const whatsappNumber = STORE_CONFIG.store.whatsappNumber;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Apply branding to CSS
function applyBranding() {
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary-color: ${STORE_CONFIG.branding.primaryColor};
            --secondary-color: ${STORE_CONFIG.branding.secondaryColor};
            --whatsapp-color: ${STORE_CONFIG.branding.whatsappColor};
            --font-family: '${STORE_CONFIG.branding.fontFamily}', sans-serif;
        }
        
        body {
            font-family: var(--font-family);
        }
    `;
    document.head.appendChild(style);
}

// Update store information in HTML
function updateStoreInfo() {
    const config = STORE_CONFIG.store;
    
    // Update title and meta
    document.title = `${config.name} - ${config.tagline}`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = config.description;
    }
    
    // Update logo and store name
    const elements = {
        '.logo-title': config.name,
        '.logo-subtitle': config.tagline,
        '.logo-icon': STORE_CONFIG.branding.logoText
    };
    
    Object.entries(elements).forEach(([selector, content]) => {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = content;
        }
    });
}

// Initialize Google Analytics
function initializeAnalytics() {
    const analyticsId = STORE_CONFIG.analytics.googleAnalyticsId;
    if (analyticsId) {
        // Google Analytics 4
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', analyticsId);
        
        // Track cart events if enabled
        if (STORE_CONFIG.analytics.enableCartTracking) {
            window.trackCartEvent = function(action, productName, value) {
                gtag('event', action, {
                    event_category: 'ecommerce',
                    event_label: productName,
                    value: value
                });
            };
        }
    }
}

// Get currency configuration
function getCurrencyConfig() {
    return STORE_CONFIG.currency;
}

// Get message template
function getMessageTemplate(templateName, data = {}) {
    return generateWhatsAppURL(templateName, data);
}

// Update exchange rates from API (if enabled)
async function updateExchangeRates() {
    if (!STORE_CONFIG.currency.autoUpdateRates) return;
    
    try {
        // You can integrate with a currency API here
        // Example: https://api.exchangerate-api.com/v4/latest/INR
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
        const data = await response.json();
        
        // Update rates
        STORE_CONFIG.currency.exchangeRates = {
            'INR': 1,
            'GBP': data.rates.GBP,
            'USD': data.rates.USD, 
            'CAD': data.rates.CAD,
            'LKR': data.rates.LKR
        };
        
        console.log('📊 Exchange rates updated successfully');
    } catch (error) {
        console.log('📊 Using default exchange rates:', error.message);
    }
}

// Initialize notifications system
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

// Show notification
function showNotification(message, type = 'success') {
    if (!STORE_CONFIG.cart.enableNotifications) return;
    
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        pointer-events: auto;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, STORE_CONFIG.cart.notificationDuration);
}

// Apply configuration on page load
document.addEventListener('DOMContentLoaded', function() {
    if (STORE_CONFIG.advanced.enableDebugMode) {
        console.log('🏪 RAY HYPER STORE Configuration:', STORE_CONFIG);
    }
    
    // Apply configurations
    applyBranding();
    updateStoreInfo();
    initializeAnalytics();
    initializeNotifications();
    
    // Update exchange rates if enabled
    if (STORE_CONFIG.currency.autoUpdateRates) {
        updateExchangeRates();
        // Set interval to update rates periodically
        setInterval(updateExchangeRates, STORE_CONFIG.currency.rateUpdateInterval);
    }
    
    console.log('✅ Store configuration applied successfully');
});

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = STORE_CONFIG;
}

// Make configuration available globally
window.STORE_CONFIG = STORE_CONFIG;
window.generateWhatsAppURL = generateWhatsAppURL;
window.getCurrencyConfig = getCurrencyConfig;
window.getMessageTemplate = getMessageTemplate;
window.showNotification = showNotification;

console.log('🔧 RAY HYPER STORE Configuration loaded successfully!');