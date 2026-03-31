/**
 * Utility to clear legacy development data from localStorage.
 * This runs once when the production version is detected to ensure
 * a fresh experience for users.
 */
export const clearLegacyStorage = () => {
  const PRODUCTION_KEY = 'ACE_PROD_V1_CLEARED';
  
  if (!localStorage.getItem(PRODUCTION_KEY)) {
    console.log('🧹 Clearing legacy development storage for production...');
    
    // List of keys used during development
    const legacyKeys = ['ACE_CONTENT', 'ace_content', 'formData', 'admin_session'];
    
    legacyKeys.forEach(key => localStorage.removeItem(key));
    
    // Mark as cleared
    localStorage.setItem(PRODUCTION_KEY, 'true');
  }
};
