/*
 * OpenTaqwā - Dhikr Goals Context (Chrome)
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { dhikrGoalsService } from "@opentaqwa/shared";
import { useDhikrReminders } from "../hooks/useDhikrReminders";

const DhikrGoalsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDhikrGoals = () => {
  const context = useContext(DhikrGoalsContext);
  if (!context) {
    throw new Error("useDhikrGoals must be used within a DhikrGoalsProvider");
  }
  return context;
};

export const DhikrGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Schedule reminders for goals
  useDhikrReminders(goals);

  // Load goals and history on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const data = dhikrGoalsService.loadGoals();
        
        // Apply daily reset if needed
        const resetResult = dhikrGoalsService.resetCounterDaily(data.goals, data.history);
        
        // Update state with reset data
        setGoals(resetResult.goals);
        setHistory(resetResult.history);
        
        // Save if reset occurred
        if (resetResult.goals !== data.goals || resetResult.history !== data.history) {
          dhikrGoalsService.saveGoals(resetResult.goals, resetResult.history);
        }
      } catch (error) {
        console.error("Failed to load dhikr goals:", error);
        setGoals([]);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Create a new goal
  const createGoal = useCallback((dhikr, targetCount, notes = "", reminder = null) => {
    try {
      const newGoal = dhikrGoalsService.createGoal(dhikr, targetCount, notes, reminder);
      const updatedGoals = [...goals, newGoal];
      setGoals(updatedGoals);
      dhikrGoalsService.saveGoals(updatedGoals, history);
      return newGoal;
    } catch (error) {
      console.error("Failed to create goal:", error);
      throw error;
    }
  }, [goals, history]);

  // Increment counter for a goal
  const incrementCounter = useCallback((goalId) => {
    try {
      const result = dhikrGoalsService.incrementCounter(goalId, goals, history);
      setGoals(result.goals);
      setHistory(result.history);
      dhikrGoalsService.saveGoals(result.goals, result.history);
      
      // Return the updated goal for UI feedback
      return result.goals.find(g => g.id === goalId);
    } catch (error) {
      console.error("Failed to increment counter:", error);
      throw error;
    }
  }, [goals, history]);

  // Decrement counter for a goal
  const decrementCounter = useCallback((goalId) => {
    try {
      const updatedGoals = dhikrGoalsService.decrementCounter(goalId, goals);
      setGoals(updatedGoals);
      dhikrGoalsService.saveGoals(updatedGoals, history);
      return updatedGoals.find(g => g.id === goalId);
    } catch (error) {
      console.error("Failed to decrement counter:", error);
      throw error;
    }
  }, [goals, history]);

  // Delete a goal
  const deleteGoal = useCallback((goalId) => {
    try {
      const result = dhikrGoalsService.deleteGoal(goalId, goals, history);
      setGoals(result.goals);
      setHistory(result.history);
      dhikrGoalsService.saveGoals(result.goals, result.history);
    } catch (error) {
      console.error("Failed to delete goal:", error);
      throw error;
    }
  }, [goals, history]);

  // Update a goal
  const updateGoal = useCallback((goalId, updates) => {
    try {
      const updatedGoals = dhikrGoalsService.updateGoal(goalId, updates, goals);
      setGoals(updatedGoals);
      dhikrGoalsService.saveGoals(updatedGoals, history);
      return updatedGoals.find(g => g.id === goalId);
    } catch (error) {
      console.error("Failed to update goal:", error);
      throw error;
    }
  }, [goals, history]);

  // Pause a goal
  const pauseGoal = useCallback((goalId) => {
    try {
      const updatedGoals = dhikrGoalsService.pauseGoal(goalId, goals);
      setGoals(updatedGoals);
      dhikrGoalsService.saveGoals(updatedGoals, history);
    } catch (error) {
      console.error("Failed to pause goal:", error);
      throw error;
    }
  }, [goals, history]);

  // Resume a paused goal
  const resumeGoal = useCallback((goalId) => {
    try {
      const updatedGoals = dhikrGoalsService.resumeGoal(goalId, goals);
      setGoals(updatedGoals);
      dhikrGoalsService.saveGoals(updatedGoals, history);
    } catch (error) {
      console.error("Failed to resume goal:", error);
      throw error;
    }
  }, [goals, history]);

  // Get current streak for a goal
  const getCurrentStreak = useCallback((goalId) => {
    return dhikrGoalsService.calculateCurrentStreak(goalId, history);
  }, [history]);

  // Get best streak for a goal
  const getBestStreak = useCallback((goalId) => {
    return dhikrGoalsService.calculateBestStreak(goalId, history);
  }, [history]);

  // Get weekly stats for a goal
  const getWeeklyStats = useCallback((goalId) => {
    return dhikrGoalsService.getWeeklyStats(goalId, history);
  }, [history]);

  // Get monthly stats for a goal
  const getMonthlyStats = useCallback((goalId) => {
    return dhikrGoalsService.getMonthlyStats(goalId, history);
  }, [history]);

  const value = {
    // State
    goals,
    history,
    loading,
    
    // Actions
    createGoal,
    incrementCounter,
    decrementCounter,
    deleteGoal,
    updateGoal,
    pauseGoal,
    resumeGoal,
    
    // Stats
    getCurrentStreak,
    getBestStreak,
    getWeeklyStats,
    getMonthlyStats,
  };

  return (
    <DhikrGoalsContext.Provider value={value}>
      {children}
    </DhikrGoalsContext.Provider>
  );
};
