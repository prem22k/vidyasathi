// Main JavaScript for Vidyasaathi

// Global variables
let currentConversation = [];
let isTyping = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Add fade-in animation to main content
    document.querySelector('main').classList.add('fade-in');
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Auto-resize textarea elements
    autoResizeTextareas();
}

function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + Enter to send message
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        const sendButton = document.getElementById('sendButton');
        if (sendButton) {
            sendButton.click();
        }
    }
    
    // Escape to clear current input
    if (event.key === 'Escape') {
        const messageInput = document.getElementById('messageInput');
        if (messageInput && messageInput.value) {
            messageInput.value = '';
            messageInput.focus();
        }
    }
}

function autoResizeTextareas() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
}

// Utility functions
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('hi-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('टेक्स्ट कॉपी हो गया!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('टेक्स्ट कॉपी हो गया!', 'success');
    } catch (err) {
        showToast('कॉपी करने में समस्या हुई।', 'error');
    }
    
    document.body.removeChild(textArea);
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'error' ? 'danger' : type} position-fixed`;
    toast.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Language detection and transliteration helpers
function detectLanguage(text) {
    // Simple detection for Hindi vs Roman Hindi
    const hindiPattern = /[\u0900-\u097F]/;
    return hindiPattern.test(text) ? 'hindi' : 'roman';
}

function isHindiText(text) {
    const hindiPattern = /[\u0900-\u097F]/;
    return hindiPattern.test(text);
}

// Accessibility improvements
function addAccessibilityFeatures() {
    // Add ARIA labels
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.setAttribute('aria-live', 'polite');
        chatMessages.setAttribute('aria-label', 'बातचीत का क्षेत्र');
    }
    
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.setAttribute('aria-label', 'अपना संदेश यहाँ लिखें');
    }
    
    // Add keyboard navigation for rating stars
    const stars = document.querySelectorAll('.star, .star-large');
    stars.forEach((star, index) => {
        star.setAttribute('tabindex', '0');
        star.setAttribute('role', 'button');
        star.setAttribute('aria-label', `${index + 1} स्टार रेटिंग`);
        
        star.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                star.click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', addAccessibilityFeatures);

// Performance optimization
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

// Export functions for global use
window.VidyasaathiUtils = {
    formatTime,
    copyToClipboard,
    showToast,
    detectLanguage,
    isHindiText,
    debounce
};
