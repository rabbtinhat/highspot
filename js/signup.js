document.addEventListener('DOMContentLoaded', () => {
    // Get the plan from URL parameters if available
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    
    if (plan) {
        document.getElementById('plan').value = plan;
        
        // Update the header to reflect the selected plan
        const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1);
        document.querySelector('.signup-header h1').textContent = `Join HIGHSPOT POKER - ${planDisplay} Plan`;
    }
    
    // Handle form submission
    const form = document.getElementById('signup-form');
    const formMessage = document.getElementById('form-message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value || 'Not provided',
            experience: form.experience.value,
            goals: form.goals.value || 'Not provided',
            plan: form.plan.value || 'Not specified',
            date: new Date().toISOString()
        };
        
        try {
            // Send data to Notion via our API endpoint
            const response = await fetch('https://your-server-endpoint.com/api/notion-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Show success message
                formMessage.textContent = 'Thank you for signing up! We will contact you shortly.';
                formMessage.className = 'form-message success';
                form.reset();
            } else {
                // Show error message
                formMessage.textContent = data.message || 'Something went wrong. Please try again.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            console.error('Error:', error);
            formMessage.textContent = 'Network error. Please try again later.';
            formMessage.className = 'form-message error';
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}); 