// 🏪 RAY HYPER STORE - Configuration File
// =============================================
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
        whatsappNumber: "+44 7553689124", // WITHOUT + sign, WITH country code
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
        fontFamily: "Poppins" // Google Font name
    },

    // 💬 WHATSAPP MESSAGES
    // -------------------
    messages: {
        productInquiry: "Hello! I'm interested in *{productName}* priced at ₹{price}. Please share more details including:\n\n• Available sizes\n• Color options\n• Delivery time\n• Return policy",
        
        contactForm: "*New Contact Form Submission*\n\n*Name:* {name}\n*Email:* {email}\n*Phone:* {phone}\n*Message:* {message}",
        
        generalInquiry: "Hello! I'm interested in your products. Please share your latest catalog and pricing.",
        
        productDetails: "Hello! I want to know more about *{productName}*. Please share detailed information.",
        
        bulkOrder: "Hello! I'm interested in bulk orders. Please share:\n\n• Bulk pricing\n• Minimum order quantity\n• Delivery terms\n• Payment options"
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
        defaultSort: "newest", // newest, price-low, price-high, name
        categories: [
            { id: "sarees", name: "Sarees", icon: "👗" },
            { id: "jewelry", name: "Jewelry", icon: "💎" }
        ]
    },

    // 📱 PWA SETTINGS
    // --------------
    pwa: {
        enabled: true,
        name: "RAY HYPER STORE",
        shortName: "RAY STORE",
        themeColor: "#667eea",
        backgroundColor: "#ffffff"
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
        enableAboutSection: true
    },

    // 📊 ANALYTICS
    // -----------
    analytics: {
        googleAnalyticsId: "", // Add your GA4 ID (e.g., "G-XXXXXXXXXX")
        facebookPixelId: "", // Add your Facebook Pixel ID
        enableHotjar: false,
        hotjarId: ""
    },

    // 🔧 ADVANCED SETTINGS
    // --------------------
    advanced: {
        imageQuality: 80, // 1-100
        loadingTimeout: 500, // milliseconds
        animationDuration: 300, // milliseconds
        enableDebugMode: false,
        enableServiceWorker: true
    },

    // 🌐 SOCIAL MEDIA
    // --------------
    social: {
        facebook: "https://facebook.com/raystore",
        instagram: "https://instagram.com/raystore", 
        youtube: "https://youtube.com/raystore",
        whatsapp: "https://wa.me/919876543210"
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
        happyCustomers: "50,000+"
    },

    // 📦 SHIPPING & POLICIES
    // ---------------------
    policies: {
        shipping: {
            freeShippingAbove: 2000,
            deliveryTime: "3-7 business days",
            codAvailable: true,
            returnPolicy: "7 days return policy"
        },
        payment: {
            methods: ["UPI", "Net Banking", "Credit Card", "COD"],
            securePayment: true
        }
    }
};

// 🔧 UTILITY FUNCTIONS
// ===================

// Generate WhatsApp URL with message
function generateWhatsAppURL(messageTemplate, data = {}) {
    let message = STORE_CONFIG.messages[messageTemplate] || messageTemplate;
    
    // Replace placeholders in message
    Object.keys(data).forEach(key => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), data[key]);
    });
    
    return `https://wa.me/${STORE_CONFIG.store.whatsappNumber}?text=${encodeURIComponent(message)}`;
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
    `;
    document.head.appendChild(style);
}

// Update store information in HTML
function updateStoreInfo() {
    // Update title
    document.title = `${STORE_CONFIG.store.name} - ${STORE_CONFIG.store.tagline}`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = STORE_CONFIG.store.description;
    }
    
    // Update store name in header
    const logoTitle = document.querySelector('.logo-title');
    if (logoTitle) {
        logoTitle.textContent = STORE_CONFIG.store.name;
    }
    
    const logoSubtitle = document.querySelector('.logo-subtitle');
    if (logoSubtitle) {
        logoSubtitle.textContent = STORE_CONFIG.store.tagline;
    }
    
    // Update logo icon
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.textContent = STORE_CONFIG.branding.logoText;
    }
}

// Initialize Google Analytics
function initializeAnalytics() {
    if (STORE_CONFIG.analytics.googleAnalyticsId) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${STORE_CONFIG.analytics.googleAnalyticsId}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', STORE_CONFIG.analytics.googleAnalyticsId);
    }
}

// Apply configuration on page load
document.addEventListener('DOMContentLoaded', function() {
    if (STORE_CONFIG.advanced.enableDebugMode) {
        console.log('🏪 RAY HYPER STORE Configuration:', STORE_CONFIG);
    }
    
    applyBranding();
    updateStoreInfo();
    initializeAnalytics();
    
    // Update WhatsApp number in main script
    if (typeof WHATSAPP_NUMBER !== 'undefined') {
        window.WHATSAPP_NUMBER = STORE_CONFIG.store.whatsappNumber;
    }
});

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = STORE_CONFIG;
}

// Make configuration available globally
window.STORE_CONFIG = STORE_CONFIG;
window.generateWhatsAppURL = generateWhatsAppURL;