/*
 * OpenTaqwā - Dhikr Goals Panel Component (Chrome)
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React, { useState } from "react";
import { Target, Plus, X } from "lucide-react";
import GoalsList from "./GoalsList";
import GoalCreationModal from "./GoalCreationModal";

export default function DhikrGoalsPanel() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="bg-gradient-to-br from-amber-400/8 from-5% via-neutral-800 via-25% to-neutral-800 rounded-xl shadow-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-gold" />
          <h2 className="text-white text-lg font-montserrat font-bold">
            Dhikr Goals
          </h2>
        </div>
        <button
          onClick={() => setModalVisible(true)}
          className="p-2 rounded-lg bg-gold hover:bg-gold/80 text-[#0f0d0c] transition-colors"
          title="Create Goal"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Goals List */}
      <GoalsList onAddGoal={() => setModalVisible(true)} />

      {/* Modal */}
      <GoalCreationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
