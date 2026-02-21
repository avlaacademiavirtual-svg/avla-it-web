/**
 * AVLA - Form Validation and Submission
 * Validación y envío de formulario de contacto
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (!form) return;

    // ========================================
    // Validation Rules
    // ========================================
    const validators = {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: 'Por favor, ingresa tu nombre (mínimo 2 caracteres)'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Por favor, ingresa un email válido'
        },
        message: {
            validate: (value) => value.trim().length >= 10,
            message: 'Por favor, escribe un mensaje (mínimo 10 caracteres)'
        }
    };

    // ========================================
    // Validation Functions
    // ========================================
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (input) {
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.setAttribute('role', 'alert');
        }
    }

    function clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (input) {
            input.classList.remove('error');
            input.removeAttribute('aria-invalid');
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.removeAttribute('role');
        }
    }

    function validateField(fieldId) {
        const input = document.getElementById(fieldId);
        if (!input) return true;
        
        const validator = validators[fieldId];
        if (!validator) return true;
        
        const isValid = validator.validate(input.value);
        
        if (!isValid) {
            showError(fieldId, validator.message);
        } else {
            clearError(fieldId);
        }
        
        return isValid;
    }

    function validateForm() {
        let isValid = true;
        
        Object.keys(validators).forEach(fieldId => {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // ========================================
    // Form Submission
    // ========================================
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Enviando...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Simular envío (reemplazar con tu endpoint real)
            await simulateSubmission(data);
            
            showSuccess();
            
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            showError('message', 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }
    }

    // ========================================
    // Simulated Submission (Replace with real API)
    // ========================================
    function simulateSubmission(data) {
        return new Promise((resolve, reject) => {
            console.log('Form data:', data);
            
            // Simulate network delay
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }

    // ========================================
    // Success State
    // ========================================
    function showSuccess() {
        if (formSuccess) {
            formSuccess.classList.add('show');
        }
        
        setTimeout(() => {
            form.reset();
            if (formSuccess) {
                formSuccess.classList.remove('show');
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span>Enviar mensaje</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
            `;
        }, 4000);
    }

    // ========================================
    // Real-time Validation
    // ========================================
    function initRealTimeValidation() {
        Object.keys(validators).forEach(fieldId => {
            const input = document.getElementById(fieldId);
            
            if (input) {
                // Validate on blur
                input.addEventListener('blur', () => {
                    if (input.value.trim()) {
                        validateField(fieldId);
                    }
                });
                
                // Clear error on input
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        clearError(fieldId);
                    }
                });
            }
        });
    }

    // ========================================
    // Form Enhancement
    // ========================================
    function enhanceForm() {
        const inputs = form.querySelectorAll('.form__input');
        
        inputs.forEach(input => {
            // Add floating label effect (if label exists)
            const label = input.previousElementSibling;
            
            if (input.value) {
                input.classList.add('has-value');
            }
            
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });
    }

    // ========================================
    // Initialize
    // ========================================
    function init() {
        form.addEventListener('submit', handleSubmit);
        initRealTimeValidation();
        enhanceForm();
        
        // Prevent form resubmission on page refresh
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


// ========================================
// Formspree / Netlify Forms Integration Example
// ========================================
/*
To integrate with Formspree:
1. Create account at formspree.io
2. Add form action: action="https://formspree.io/f/YOUR_FORM_ID"
3. Add method="POST" to form

To integrate with Netlify Forms:
1. Add data-netlify="true" to form
2. Add name="contact" to form
3. Netlify will automatically handle submissions

Example with Formspree:
async function submitToFormspree(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Form submission failed');
    }
    
    return response.json();
}
*/
