/*
 * OpenTaqwā - Goals List Component (Chrome)
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React from "react";
import { Target, Plus } from "lucide-react";
import { useDhikrGoals } from "../../contexts/DhikrGoalsContext";
import GoalCard from "./GoalCard";

export default function GoalsList({ onAddGoal }) {
  const { goals, loading } = useDhikrGoals();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <Target size={48} className="text-gold/50 mx-auto mb-4" />
        <h3 className="text-white/80 text-lg font-montserrat font-bold mb-2">
          No Goals Yet
        </h3>
        <p className="text-white/60 text-sm font-quicksand mb-6">
          Create your first dhikr goal to start tracking your progress
        </p>
        <button
          onClick={onAddGoal}
          className="bg-gold hover:bg-gold/80 text-[#0f0d0c] px-6 py-3 rounded-xl flex items-center gap-2 mx-auto font-quicksand font-semibold transition-colors"
        >
          <Plus size={18} />
          Create Goal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
