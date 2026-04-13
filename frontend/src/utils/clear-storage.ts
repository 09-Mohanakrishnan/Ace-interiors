/**
 * Utility to clear ALL legacy localStorage content data.
 * The Ameer-pattern architecture no longer uses localStorage for content.
 * This runs once to purge any stale cached data.
 */
export const clearLegacyStorage = () => {
  const PRODUCTION_KEY = 'ACE_PROD_V2_CLEARED';
  
  if (!localStorage.getItem(PRODUCTION_KEY)) {
    console.log('🧹 Clearing ALL legacy localStorage content (Ameer-pattern migration)...');
    
    // Remove ALL content-related keys from old architecture
    const legacyKeys = [
      'ACE_CONTENT', 'ace_content', 'ace_interiors_content',
      'formData', 'admin_session', 'ACE_PROD_V1_CLEARED'
    ];
    
    legacyKeys.forEach(key => localStorage.removeItem(key));
    
    localStorage.setItem(PRODUCTION_KEY, 'true');
  }
};
