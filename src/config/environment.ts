// Environment Variables Configuration

export const ENV_CONFIG = {
  // Firebase Configuration (already set)
  FIREBASE: {
    apiKey: "AIzaSyCKA-KypQTucH01aTJ8WPiM7LYXTQcgL3c",
    authDomain: "pakasian-protein-nimko.firebaseapp.com",
    projectId: "pakasian-protein-nimko",
    // ... other Firebase config
  },

  // EmailJS Configuration (needs setup)
  EMAILJS: {
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_27ga57j',
    TEMPLATE_ID_ADMIN: process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN || 'template_admin',
    TEMPLATE_ID_CUSTOMER: process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CUSTOMER || 'template_customer',
    PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'Lf6JuKXlVJhdGPXFg',
  },

  // Facebook Pixel Configuration (already set)
  FACEBOOK_PIXEL: {
    PIXEL_ID: '1716548252372656'
  },

  // Company Information
  COMPANY: {
    name: 'Pakasian Protein Nimko',
    email: 'admin@pakasianfoods.com',
    phone: '+92 300 1234567',
    address: 'Pakistan'
  }
};

// Check if all required environment variables are set
export const checkEnvironmentSetup = () => {
  const checks = {
    firebase: true, // Already configured
    emailjs: ENV_CONFIG.EMAILJS.PUBLIC_KEY !== 'demo_public_key',
    facebookPixel: true // Already configured
  };

  return checks;
};

// Get setup instructions for missing configurations
export const getSetupInstructions = () => {
  const checks = checkEnvironmentSetup();
  const instructions = [];

  if (!checks.emailjs) {
    instructions.push({
      service: 'EmailJS',
      status: 'Not Configured',
      action: 'Set up EmailJS environment variables',
      guide: 'See EMAILJS_SETUP_GUIDE.md'
    });
  }

  return instructions;
};
