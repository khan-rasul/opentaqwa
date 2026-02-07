/*
 * OpenTaqwā - Dhikr Goals Service
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

const STORAGE_KEY = "opentaqwa_dhikr_goals";
const LAST_RESET_DATE_KEY = "opentaqwa_dhikr_goals_last_reset_date";
const SCHEMA_VERSION = "1.0";

/**
 * Get today's date in local timezone as YYYY-MM-DD
 */
function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Subtract days from a date string (YYYY-MM-DD)
 */
function subtractDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Load goals and history from localStorage
 * @returns {{goals: Array, history: Array, version: string}}
 */
export function loadGoals() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        goals: [],
        history: [],
        version: SCHEMA_VERSION,
      };
    }

    const data = JSON.parse(stored);
    
    // Validate structure
    if (!data.goals || !Array.isArray(data.goals)) {
      console.warn("Corrupted goals data, resetting to empty");
      return {
        goals: [],
        history: [],
        version: SCHEMA_VERSION,
      };
    }

    return {
      goals: data.goals || [],
      history: data.history || [],
      version: data.version || SCHEMA_VERSION,
    };
  } catch (error) {
    console.error("Error loading goals:", error);
    // Return empty structure on error
    return {
      goals: [],
      history: [],
      version: SCHEMA_VERSION,
    };
  }
}

/**
 * Save goals and history to localStorage
 * @param {Array} goals - Array of goal objects
 * @param {Array} history - Array of history entries
 */
export function saveGoals(goals, history = []) {
  try {
    const data = {
      version: SCHEMA_VERSION,
      goals: goals || [],
      history: history || [],
      lastSyncDate: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving goals:", error);
    // Check if quota exceeded
    if (error.name === "QuotaExceededError") {
      throw new Error("Storage quota exceeded. Please delete some old goals.");
    }
    throw error;
  }
}

/**
 * Create a new goal
 * @param {Object} dhikr - Dhikr object from dhikrList
 * @param {number} targetCount - Target count for the goal
 * @param {string} notes - Optional notes
 * @param {Object} reminder - Optional reminder settings { enabled: boolean, times: string[] }
 * @returns {Object} New goal object
 */
export function createGoal(dhikr, targetCount, notes = "", reminder = null) {
  if (!dhikr || !dhikr.id) {
    throw new Error("Invalid dhikr object");
  }

  if (!targetCount || targetCount < 1) {
    throw new Error("Target count must be greater than 0");
  }

  const today = getTodayDateString();
  const goalId = `goal_${Date.now()}`;

  return {
    id: goalId,
    dhikrId: dhikr.id,
    dhikrText: dhikr.transliteration || dhikr.arabic,
    dhikrTranslation: dhikr.meaning || "",
    dhikrArabic: dhikr.arabic || "",
    targetCount: Math.floor(targetCount),
    currentCount: 0,
    currentDate: today,
    lastCompletedDate: null,
    currentStreak: 0,
    bestStreak: 0,
    status: "active",
    isCompletedToday: false,
    notes: notes || "",
    reminder: reminder || { enabled: false, times: [] },
    createdAt: new Date().toISOString(),
  };
}

/**
 * Increment counter for a goal
 * @param {string} goalId - Goal ID
 * @param {Array} goals - Current goals array
 * @param {Array} history - Current history array (optional, for streak calculation)
 * @returns {{goals: Array, history: Array}} Updated goals and history arrays
 */
export function incrementCounter(goalId, goals, history = []) {
  if (!goals || !Array.isArray(goals)) {
    throw new Error("Invalid goals array");
  }

  const today = getTodayDateString();
  let updatedHistory = [...history];
  let updatedGoals = goals.map((goal) => {
    if (goal.id === goalId && goal.status === "active") {
      const newCount = Math.min(goal.currentCount + 1, goal.targetCount);
      const isCompleted = newCount >= goal.targetCount;
      const wasAlreadyCompleted = goal.isCompletedToday;

      // If goal is completed for the first time today, add history entry and update streak
      if (isCompleted && !wasAlreadyCompleted) {
        // Check if history entry for today already exists
        const hasTodayEntry = updatedHistory.some(
          (entry) => entry.goalId === goalId && entry.date === today
        );

        if (!hasTodayEntry) {
          // Add history entry for today's completion
          updatedHistory = addHistoryEntry(goalId, newCount, true, today, updatedHistory);
        }

        // Calculate updated streak
        const newStreak = calculateCurrentStreak(goalId, updatedHistory);
        const currentBestStreak = calculateBestStreak(goalId, updatedHistory);
        const newBestStreak = Math.max(goal.bestStreak || 0, currentBestStreak, newStreak);

        return {
          ...goal,
          currentCount: newCount,
          isCompletedToday: true,
          lastCompletedDate: today,
          currentStreak: newStreak,
          bestStreak: newBestStreak,
        };
      }

      // If already completed or not completed yet, just update count
      return {
        ...goal,
        currentCount: newCount,
        isCompletedToday: isCompleted,
        lastCompletedDate: isCompleted ? today : goal.lastCompletedDate,
      };
    }
    return goal;
  });

  return {
    goals: updatedGoals,
    history: updatedHistory,
  };
}

/**
 * Decrement counter for a goal (nice-to-have)
 * @param {string} goalId - Goal ID
 * @param {Array} goals - Current goals array
 * @returns {Array} Updated goals array (immutable)
 */
export function decrementCounter(goalId, goals) {
  if (!goals || !Array.isArray(goals)) {
    throw new Error("Invalid goals array");
  }

  const updatedGoals = goals.map((goal) => {
    if (goal.id === goalId && goal.status === "active") {
      const newCount = Math.max(goal.currentCount - 1, 0);
      return {
        ...goal,
        currentCount: newCount,
        isCompletedToday: newCount >= goal.targetCount,
      };
    }
    return goal;
  });

  return updatedGoals;
}

/**
 * Delete a goal and its history
 * @param {string} goalId - Goal ID to delete
 * @param {Array} goals - Current goals array
 * @param {Array} history - Current history array
 * @returns {{goals: Array, history: Array}} Updated arrays
 */
export function deleteGoal(goalId, goals, history) {
  const updatedGoals = goals.filter((goal) => goal.id !== goalId);
  const updatedHistory = history.filter((entry) => entry.goalId !== goalId);

  return {
    goals: updatedGoals,
    history: updatedHistory,
  };
}

/**
 * Update a goal with new values
 * @param {string} goalId - Goal ID to update
 * @param {Object} updates - Partial goal object with updates
 * @param {Array} goals - Current goals array
 * @returns {Array} Updated goals array
 */
export function updateGoal(goalId, updates, goals) {
  return goals.map((goal) => {
    if (goal.id === goalId) {
      return {
        ...goal,
        ...updates,
      };
    }
    return goal;
  });
}

/**
 * Pause a goal
 * @param {string} goalId - Goal ID to pause
 * @param {Array} goals - Current goals array
 * @returns {Array} Updated goals array
 */
export function pauseGoal(goalId, goals) {
  return updateGoal(goalId, { status: "paused" }, goals);
}

/**
 * Resume a paused goal
 * @param {string} goalId - Goal ID to resume
 * @param {Array} goals - Current goals array
 * @returns {Array} Updated goals array
 */
export function resumeGoal(goalId, goals) {
  return updateGoal(goalId, { status: "active" }, goals);
}

/**
 * Calculate current streak for a goal
 * @param {string} goalId - Goal ID
 * @param {Array} history - History array
 * @returns {number} Current streak (0-999)
 */
export function calculateCurrentStreak(goalId, history) {
  if (!history || !Array.isArray(history)) {
    return 0;
  }

  const goalHistory = history
    .filter((entry) => entry.goalId === goalId && entry.completed)
    .sort((a, b) => b.date.localeCompare(a.date)); // Sort descending by date

  if (goalHistory.length === 0) {
    return 0;
  }

  const today = getTodayDateString();
  let streak = 0;
  let checkDate = today;

  // Work backwards from today
  for (let i = 0; i < 365; i++) {
    const entry = goalHistory.find((h) => h.date === checkDate);
    
    if (entry && entry.completed) {
      streak++;
      checkDate = subtractDays(checkDate, 1);
    } else {
      // If today is not completed and this is the first check, skip to yesterday
      // This handles the case where we're checking today but haven't completed yet
      // Only skip if we haven't found any entry for today (meaning it's not completed)
      if (i === 0 && checkDate === today && !entry) {
        checkDate = subtractDays(checkDate, 1);
        continue;
      }
      break; // Streak broken
    }
  }

  return Math.min(streak, 999); // Cap at 999
}

/**
 * Calculate best streak for a goal
 * @param {string} goalId - Goal ID
 * @param {Array} history - History array
 * @returns {number} Best streak ever achieved
 */
export function calculateBestStreak(goalId, history) {
  if (!history || !Array.isArray(history)) {
    return 0;
  }

  const goalHistory = history
    .filter((entry) => entry.goalId === goalId && entry.completed)
    .map((entry) => entry.date)
    .sort()
    .filter((date, index, arr) => arr.indexOf(date) === index); // Unique dates

  if (goalHistory.length === 0) {
    return 0;
  }

  let bestStreak = 0;
  let currentStreak = 0;
  let previousDate = null;

  for (const date of goalHistory) {
    if (previousDate === null) {
      currentStreak = 1;
      previousDate = date;
      continue;
    }

    const daysDiff = Math.floor(
      (new Date(date) - new Date(previousDate)) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 1) {
      // Consecutive day
      currentStreak++;
    } else {
      // Streak broken
      bestStreak = Math.max(bestStreak, currentStreak);
      currentStreak = 1;
    }

    previousDate = date;
  }

  // Check final streak
  bestStreak = Math.max(bestStreak, currentStreak);

  return Math.min(bestStreak, 999);
}

/**
 * Add a history entry
 * @param {string} goalId - Goal ID
 * @param {number} count - Count achieved
 * @param {boolean} completed - Whether goal was completed
 * @param {string} date - Date string (YYYY-MM-DD), defaults to today
 * @param {Array} history - Current history array
 * @returns {Array} Updated history array
 */
export function addHistoryEntry(goalId, count, completed, date = null, history = []) {
  const entryDate = date || getTodayDateString();

  // Check if entry already exists for this date and goal
  const existingIndex = history.findIndex(
    (entry) => entry.goalId === goalId && entry.date === entryDate
  );

  const newEntry = {
    goalId,
    date: entryDate,
    count,
    completed,
    completedAt: completed ? new Date().toISOString() : null,
  };

  if (existingIndex >= 0) {
    // Update existing entry
    const updated = [...history];
    updated[existingIndex] = newEntry;
    return updated;
  }

  // Add new entry
  return [...history, newEntry];
}

/**
 * Reset counters daily (called on app load)
 * @param {Array} goals - Current goals array
 * @param {Array} history - Current history array
 * @returns {{goals: Array, history: Array}} Updated arrays
 */
export function resetCounterDaily(goals, history) {
  const today = getTodayDateString();
  
  try {
    const lastResetDate = localStorage.getItem(LAST_RESET_DATE_KEY);

    // If already reset today, return unchanged
    if (lastResetDate === today) {
      return { goals, history };
    }

    // Calculate yesterday's date
    const yesterday = subtractDays(today, 1);
    let updatedGoals = [...goals];
    let updatedHistory = [...history];

    // Process each goal
    updatedGoals = updatedGoals.map((goal) => {
      if (goal.status === "paused") {
        return goal; // Don't reset paused goals
      }

      const wasCompletedYesterday = goal.currentCount >= goal.targetCount;
      const yesterdayDate = goal.currentDate || yesterday;

      // Add yesterday to history if not already there
      const hasHistoryEntry = updatedHistory.some(
        (entry) => entry.goalId === goal.id && entry.date === yesterdayDate
      );

      if (!hasHistoryEntry) {
        updatedHistory = addHistoryEntry(
          goal.id,
          goal.currentCount,
          wasCompletedYesterday,
          yesterdayDate,
          updatedHistory
        );
      }

      // Update streak
      let newStreak = goal.currentStreak;
      if (wasCompletedYesterday) {
        newStreak = goal.currentStreak + 1;
      } else {
        newStreak = 0; // Streak broken
      }

      // Update best streak
      const currentBestStreak = calculateBestStreak(goal.id, updatedHistory);
      const newBestStreak = Math.max(goal.bestStreak || 0, currentBestStreak, newStreak);

      return {
        ...goal,
        currentCount: 0,
        currentDate: today,
        isCompletedToday: false,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
      };
    });

    // Save last reset date
    localStorage.setItem(LAST_RESET_DATE_KEY, today);

    return {
      goals: updatedGoals,
      history: updatedHistory,
    };
  } catch (error) {
    console.error("Error in daily reset:", error);
    return { goals, history }; // Return unchanged on error
  }
}

/**
 * Get weekly stats for a goal
 * @param {string} goalId - Goal ID
 * @param {Array} history - History array
 * @returns {{daysCompleted: number, totalCount: number, dates: Array}}
 */
export function getWeeklyStats(goalId, history) {
  if (!history || !Array.isArray(history)) {
    return {
      daysCompleted: 0,
      totalCount: 0,
      dates: [],
    };
  }

  const today = getTodayDateString();
  const weekDates = [];
  for (let i = 6; i >= 0; i--) {
    weekDates.push(subtractDays(today, i));
  }

  const weekHistory = history.filter(
    (entry) => entry.goalId === goalId && weekDates.includes(entry.date)
  );

  const daysCompleted = weekHistory.filter((entry) => entry.completed).length;
  const totalCount = weekHistory.reduce((sum, entry) => sum + (entry.count || 0), 0);

  return {
    daysCompleted,
    totalCount,
    dates: weekDates.map((date) => ({
      date,
      completed: weekHistory.some((entry) => entry.date === date && entry.completed),
      count: weekHistory.find((entry) => entry.date === date)?.count || 0,
    })),
  };
}

/**
 * Get monthly stats for a goal (optional)
 * @param {string} goalId - Goal ID
 * @param {Array} history - History array
 * @returns {{daysCompleted: number, totalCount: number}}
 */
export function getMonthlyStats(goalId, history) {
  if (!history || !Array.isArray(history)) {
    return {
      daysCompleted: 0,
      totalCount: 0,
    };
  }

  const today = getTodayDateString();
  const thirtyDaysAgo = subtractDays(today, 30);

  const monthHistory = history.filter(
    (entry) =>
      entry.goalId === goalId &&
      entry.date >= thirtyDaysAgo &&
      entry.date <= today
  );

  const daysCompleted = monthHistory.filter((entry) => entry.completed).length;
  const totalCount = monthHistory.reduce((sum, entry) => sum + (entry.count || 0), 0);

  return {
    daysCompleted,
    totalCount,
  };
}

/**
 * Clean old history entries (keep last N days)
 * @param {Array} history - Current history array
 * @param {number} daysToKeep - Number of days to keep (default 90)
 * @returns {Array} Filtered history array
 */
export function cleanOldHistory(history, daysToKeep = 90) {
  if (!history || !Array.isArray(history)) {
    return [];
  }

  const today = getTodayDateString();
  const cutoffDate = subtractDays(today, daysToKeep);

  return history.filter((entry) => entry.date >= cutoffDate);
}

/**
 * Check if daily reset is needed
 * @param {string} lastDate - Last reset date string
 * @returns {boolean} True if reset needed
 */
export function checkDailyReset(lastDate) {
  if (!lastDate) {
    return true;
  }

  const today = getTodayDateString();
  return lastDate !== today;
}

/**
 * Get common target counts for quick selection
 * @returns {Array<number>} Array of common targets
 */
export function getCommonTargets() {
  return [33, 100, 1000];
}

/**
 * Get goal suggestions based on dhikr list
 * @param {Array} dhikrList - List of available dhikr
 * @returns {Array} Array of suggested goals
 */
export function getGoalSuggestions(dhikrList = []) {
  const commonTargets = getCommonTargets();
  const suggestions = [];

  // Suggest first 3 dhikr with common targets
  dhikrList.slice(0, 3).forEach((dhikr) => {
    commonTargets.forEach((target) => {
      suggestions.push({
        dhikr,
        targetCount: target,
        label: `${dhikr.transliteration} ${target}x`,
      });
    });
  });

  return suggestions;
}

// Export service object for convenience
export const dhikrGoalsService = {
  loadGoals,
  saveGoals,
  createGoal,
  incrementCounter,
  decrementCounter,
  deleteGoal,
  updateGoal,
  pauseGoal,
  resumeGoal,
  calculateCurrentStreak,
  calculateBestStreak,
  addHistoryEntry,
  resetCounterDaily,
  getWeeklyStats,
  getMonthlyStats,
  cleanOldHistory,
  checkDailyReset,
  getCommonTargets,
  getGoalSuggestions,
};
