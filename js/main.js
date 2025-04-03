// Function to load HTML components
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

// Load all components when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load header
    loadComponent('header-container', 'components/header.html');
    
    // Load hero section
    loadComponent('hero-container', 'components/hero.html');
    
    // Load features section
    loadComponent('features-container', 'components/features.html');
    
    // Load how it works section
    loadComponent('how-it-works-container', 'components/how-it-works.html');
    
    // Load testimonials section
    loadComponent('testimonials-container', 'components/testimonials.html');
    
    // Load membership section
    loadComponent('membership-container', 'components/membership.html');
    
    // Load CTA section
    loadComponent('cta-container', 'components/cta.html');
    
    // Load free session section
    loadComponent('free-session-container', 'components/free-session.html');
    
    // Load EQ vs IQ section
    loadComponent('eq-vs-iq-container', 'components/eq-vs-iq.html');
    
    // Load poker quote section
    loadComponent('poker-quote-container', 'components/poker-quote.html');
    
    // Load footer
    loadComponent('footer-container', 'components/footer.html');
}); 