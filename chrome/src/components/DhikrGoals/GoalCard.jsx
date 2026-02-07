/*
 * OpenTaqwā - Goal Card Component (Chrome)
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React from "react";
import { Flame, Trophy, Play, Pause, Trash2 } from "lucide-react";
import { useDhikrGoals } from "../../contexts/DhikrGoalsContext";

export default function GoalCard({ goal }) {
  const { incrementCounter, pauseGoal, resumeGoal, deleteGoal } = useDhikrGoals();
  
  const progress = goal.targetCount > 0 
    ? Math.min((goal.currentCount / goal.targetCount) * 100, 100) 
    : 0;
  const isCompleted = goal.currentCount >= goal.targetCount;
  const isPaused = goal.status === "paused";

  const handleCounterClick = () => {
    if (isPaused || isCompleted) return;
    incrementCounter(goal.id);
  };

  const handlePauseResume = (e) => {
    e.stopPropagation();
    if (isPaused) {
      resumeGoal(goal.id);
    } else {
      pauseGoal(goal.id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goal.id);
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg transition-all relative ${
      isCompleted ? 'bg-gradient-to-br from-forest to-forest/60' : 
      isPaused ? 'bg-gradient-to-br from-gray-600 to-gray-500' : 
      'bg-gradient-to-br from-gold to-gold/20'
    }`}>
      {/* White patch decorations for completed cards */}
      {isCompleted && (
        <>
          <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -translate-y-2 translate-x-2"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/5 rounded-full translate-y-1 -translate-x-1"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/5 rounded-full"></div>
        </>
      )}
      <div className="p-4 relative z-10">
        {/* Main Content - All centered in one column */}
        <div className="flex flex-col items-center text-center mb-3">
          {/* Arabic */}
          {goal.dhikrArabic && (
            <h3 className="text-white text-lg font-quicksand font-semibold mb-1" dir="rtl">
              {goal.dhikrArabic}
            </h3>
          )}
          {/* English Transliteration */}
          {goal.dhikrText && (
            <p className="text-white/80 text-sm font-quicksand mb-1">
              {goal.dhikrText}
            </p>
          )}
          {/* Meaning */}
          {goal.dhikrTranslation && (
            <p className="text-white/60 text-xs font-quicksand mb-3">
              {goal.dhikrTranslation}
            </p>
          )}
          
          {/* Counter - Clickable */}
          <button
            onClick={handleCounterClick}
            disabled={isPaused || isCompleted}
            className={`mb-2 transition-all ${
              isPaused || isCompleted 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <div className="text-white text-3xl font-montserrat font-black">
              {goal.currentCount}
            </div>
            <div className="text-white/80 text-sm font-quicksand">
              / {goal.targetCount}
            </div>
          </button>
          
          {/* Completed Status */}
          {isCompleted && (
            <div className="text-gold-light text-xs font-quicksand font-bold mb-3 flex items-center justify-center gap-1">
              <span>✓</span>
              <span>Completed!</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-white/20 rounded-full mb-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isCompleted ? 'bg-gold' : 'bg-white/40'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Flame size={12} className="text-gold-light" />
              <span className="text-white/80 font-quicksand">
                {goal.currentStreak} day{goal.currentStreak !== 1 ? 's' : ''}
              </span>
            </div>
            {goal.bestStreak > 0 && (
              <div className="flex items-center gap-1">
                <Trophy size={12} className="text-gold-light" />
                <span className="text-white/70 font-quicksand">
                  Best: {goal.bestStreak}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/80 font-quicksand font-semibold">
              {Math.round(progress)}%
            </span>
            {/* Action Buttons - Bottom Right */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePauseResume}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? (
                  <Play size={12} className="text-white" />
                ) : (
                  <Pause size={12} className="text-white" />
                )}
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/30 transition-colors"
                title="Delete"
              >
                <Trash2 size={12} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
