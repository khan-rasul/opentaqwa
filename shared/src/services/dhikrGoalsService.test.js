/*
 * OpenTaqwā - Dhikr Goals Service Tests
 * Run these tests in browser console after importing the service
 * 
 * Usage:
 * import { dhikrGoalsService } from '@opentaqwa/shared';
 * Then run the test functions below
 */

/**
 * Test suite for dhikrGoalsService
 * Copy and paste these into browser console to test
 */

export const testSuite = {
  // Test 1: Create and load
  testCreateAndLoad() {
    console.group("Test 1: Create and Load");
    const { dhikrGoalsService } = require("./dhikrGoalsService");
    const { dhikrList } = require("../data/dhikrList");
    
    // Clear existing data
    localStorage.removeItem("opentaqwa_dhikr_goals");
    
    const goal = dhikrGoalsService.createGoal(dhikrList[0], 100, "Test goal");
    console.assert(goal.currentCount === 0, "Should start at 0");
    console.assert(goal.currentStreak === 0, "Should start with 0 streak");
    console.assert(goal.status === "active", "Should be active");
    console.assert(goal.targetCount === 100, "Target should be 100");
    
    // Save and load
    dhikrGoalsService.saveGoals([goal], []);
    const loaded = dhikrGoalsService.loadGoals();
    console.assert(loaded.goals.length === 1, "Should have 1 goal");
    console.assert(loaded.goals[0].currentCount === 0, "Should persist count");
    
    console.log("✅ Test 1 passed!");
    console.groupEnd();
  },

  // Test 2: Increment counter
  testIncrementCounter() {
    console.group("Test 2: Increment Counter");
    const { dhikrGoalsService } = require("./dhikrGoalsService");
    const { dhikrList } = require("../data/dhikrList");
    
    const goal = dhikrGoalsService.createGoal(dhikrList[0], 100, "");
    let goals = [goal];
    
    // Increment once
    goals = dhikrGoalsService.incrementCounter(goal.id, goals);
    console.assert(goals[0].currentCount === 1, "Should increment to 1");
    
    // Increment 49 more times
    for (let i = 0; i < 49; i++) {
      goals = dhikrGoalsService.incrementCounter(goal.id, goals);
    }
    console.assert(goals[0].currentCount === 50, "Should be at 50");
    
    // Save and reload
    dhikrGoalsService.saveGoals(goals, []);
    const loaded = dhikrGoalsService.loadGoals();
    console.assert(loaded.goals[0].currentCount === 50, "Should persist");
    
    console.log("✅ Test 2 passed!");
    console.groupEnd();
  },

  // Test 3: Cap at target
  testCapAtTarget() {
    console.group("Test 3: Cap at Target");
    const { dhikrGoalsService } = require("./dhikrGoalsService");
    const { dhikrList } = require("../data/dhikrList");
    
    const goal = dhikrGoalsService.createGoal(dhikrList[0], 100, "");
    let goals = [goal];
    
    // Try to increment beyond target
    for (let i = 0; i < 150; i++) {
      goals = dhikrGoalsService.incrementCounter(goal.id, goals);
    }
    console.assert(goals[0].currentCount === 100, "Should not exceed target");
    console.assert(goals[0].isCompletedToday === true, "Should be completed");
    
    console.log("✅ Test 3 passed!");
    console.groupEnd();
  },

  // Test 4: Streak calculation
  testStreakCalculation() {
    console.group("Test 4: Streak Calculation");
    const { dhikrGoalsService } = require("./dhikrGoalsService");
    const { dhikrList } = require("../data/dhikrList");
    
    const goal = dhikrGoalsService.createGoal(dhikrList[0], 100, "");
    const history = [
      { goalId: goal.id, date: "2025-02-07", count: 100, completed: true, completedAt: "2025-02-07T14:30:00Z" },
      { goalId: goal.id, date: "2025-02-06", count: 100, completed: true, completedAt: "2025-02-06T15:00:00Z" },
      { goalId: goal.id, date: "2025-02-05", count: 100, completed: true, completedAt: "2025-02-05T16:00:00Z" },
      { goalId: goal.id, date: "2025-02-04", count: 50, completed: false, completedAt: null },
    ];
    
    const streak = dhikrGoalsService.calculateCurrentStreak(goal.id, history);
    console.assert(streak === 3, `Should count 3-day streak, got ${streak}`);
    
    const bestStreak = dhikrGoalsService.calculateBestStreak(goal.id, history);
    console.assert(bestStreak === 3, `Should have best streak of 3, got ${bestStreak}`);
    
    console.log("✅ Test 4 passed!");
    console.groupEnd();
  },

  // Test 5: Delete goal
  testDeleteGoal() {
    console.group("Test 5: Delete Goal");
    const { dhikrGoalsService } = require("./dhikrGoalsService");
    const { dhikrList } = require("../data/dhikrList");
    
    const goal1 = dhikrGoalsService.createGoal(dhikrList[0], 100, "");
    const goal2 = dhikrGoalsService.createGoal(dhikrList[1], 50, "");
    let goals = [goal1, goal2];
    
    const history = [
      { goalId: goal1.id, date: "2025-02-07", count: 100, completed: true, completedAt: "2025-02-07T14:30:00Z" },
      { goalId: goal2.id, date: "2025-02-07", count: 50, completed: true, completedAt: "2025-02-07T15:00:00Z" },
    ];
    
    const result = dhikrGoalsService.deleteGoal(goal1.id, goals, history);
    console.assert(result.goals.length === 1, "Should have 1 goal after delete");
    console.assert(result.goals[0].id === goal2.id, "Should keep goal2");
    console.assert(result.history.length === 1, "Should have 1 history entry");
    console.assert(result.history[0].goalId === goal2.id, "Should keep goal2 history");
    
    console.log("✅ Test 5 passed!");
    console.groupEnd();
  },

  // Test 6: Pause and resume
  testPauseResume() {
    console.group("Test 6: Pause and Resume");
    const { dhikrGoalsService } = require("./dhikrGoalsService");
    const { dhikrList } = require("../data/dhikrList");
    
    const goal = dhikrGoalsService.createGoal(dhikrList[0], 100, "");
    let goals = [goal];
    
    // Pause
    goals = dhikrGoalsService.pauseGoal(goal.id, goals);
    console.assert(goals[0].status === "paused", "Should be paused");
    
    // Try to increment (should not work)
    const beforeCount = goals[0].currentCount;
    goals = dhikrGoalsService.incrementCounter(goal.id, goals);
    console.assert(goals[0].currentCount === beforeCount, "Should not increment when paused");
    
    // Resume
    goals = dhikrGoalsService.resumeGoal(goal.id, goals);
    console.assert(goals[0].status === "active", "Should be active");
    
    // Now increment should work
    goals = dhikrGoalsService.incrementCounter(goal.id, goals);
    console.assert(goals[0].currentCount === 1, "Should increment after resume");
    
    console.log("✅ Test 6 passed!");
    console.groupEnd();
  },

  // Run all tests
  runAll() {
    console.log("🧪 Running all dhikrGoalsService tests...\n");
    try {
      this.testCreateAndLoad();
      this.testIncrementCounter();
      this.testCapAtTarget();
      this.testStreakCalculation();
      this.testDeleteGoal();
      this.testPauseResume();
      console.log("\n✅ All tests passed!");
    } catch (error) {
      console.error("\n❌ Test failed:", error);
    }
  },
};
