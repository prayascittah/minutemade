// Typography styles using Comfortaa and Geist Mono

export const typography = {
  // Main Headlines - Comfortaa for friendly, approachable feel
  hero: {
    fontFamily: 'var(--font-comfortaa)',
    fontWeight: '600',
  },
  
  // Section Headers - Mix of both fonts
  sectionHeader: {
    fontFamily: 'var(--font-comfortaa)',
    fontWeight: '500',
  },
  
  // Feature Titles - Geist Mono for technical feel
  featureTitle: {
    fontFamily: 'var(--font-geist-mono)',
    fontWeight: '500',
    letterSpacing: '0.025em',
  },
  
  // Code/Technical Text - Geist Mono
  technical: {
    fontFamily: 'var(--font-geist-mono)',
    fontWeight: '400',
  },
  
  // Navigation - Clean Geist Mono
  nav: {
    fontFamily: 'var(--font-geist-mono)',
    fontWeight: '500',
  },
  
  // Brand Name - Comfortaa for friendliness
  brand: {
    fontFamily: 'var(--font-comfortaa)',
    fontWeight: '600',
  },
  
  // Buttons - Geist Mono for action-oriented feel
  button: {
    fontFamily: 'var(--font-geist-mono)',
    fontWeight: '500',
  },
  
  // Taglines/Descriptions - Comfortaa for warmth
  tagline: {
    fontFamily: 'var(--font-comfortaa)',
    fontWeight: '400',
  },
  
  // Small text/captions - Geist Mono for precision
  caption: {
    fontFamily: 'var(--font-geist-mono)',
    fontWeight: '400',
    fontSize: '0.75rem',
  },
  
  // Status text (like "Listening...") - Geist Mono
  status: {
    fontFamily: 'var(--font-geist-mono)',
    fontWeight: '400',
    letterSpacing: '0.05em',
  }
};

// Utility function to convert style object to CSS-in-JS style
export const getTypographyStyle = (styleKey: keyof typeof typography) => {
  return typography[styleKey];
};
