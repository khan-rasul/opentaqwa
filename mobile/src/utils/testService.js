/*
 * Development helper: Makes dhikrGoalsService available in browser console
 * Remove this file before production deployment
 */

import { dhikrGoalsService, dhikrList } from '@opentaqwa/shared';

/**
 * Make service available globally for testing in browser console
 * Only works in development/web environment
 */
export function exposeServiceForTesting() {
  if (typeof window === 'undefined') {
    return; // Not in browser environment
  }

  try {
    // Check if imports are available
    if (!dhikrGoalsService) {
      throw new Error('dhikrGoalsService is undefined');
    }
    
    if (!dhikrList) {
      throw new Error('dhikrList is undefined');
    }

    // Expose to window
    window.dhikrGoalsService = dhikrGoalsService;
    window.dhikrList = dhikrList;
    
    console.log('%c🕋 Dhikr Goals Service Available!', 'color: #d4af37; font-size: 16px; font-weight: bold');
    console.log('%cUse these in console:', 'color: #60a5fa; font-size: 12px');
    console.log('  - window.dhikrGoalsService');
    console.log('  - window.dhikrList');
    console.log('%cExample:', 'color: #4ade80; font-size: 12px');
    console.log('  const goal = window.dhikrGoalsService.createGoal(window.dhikrList[0], 100, "Test");');
    
    // Verify it's working
    if (typeof window.dhikrGoalsService.createGoal === 'function') {
      console.log('%c✅ Service verified and ready to use!', 'color: #4ade80; font-weight: bold');
    } else {
      console.warn('⚠️ Service loaded but createGoal method not found');
      console.log('Available methods:', Object.keys(window.dhikrGoalsService || {}));
    }
  } catch (error) {
    console.error('❌ Failed to expose dhikrGoalsService:', error);
    console.log('%c📝 Manual Setup Required:', 'color: #fbbf24; font-weight: bold; font-size: 14px');
    console.log('Run this in the console:');
    console.log(`
import("@opentaqwa/shared").then(m => {
  window.dhikrGoalsService = m.dhikrGoalsService;
  window.dhikrList = m.dhikrList;
  console.log("✅ Service loaded manually");
}).catch(e => console.error("Import failed:", e));
    `);
  }
}
