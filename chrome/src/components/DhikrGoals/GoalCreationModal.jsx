/*
 * OpenTaqwā - Goal Creation Modal Component (Chrome)
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React, { useState } from "react";
import { X, Target, Check, Bell, Clock } from "lucide-react";
import { useDhikrGoals } from "../../contexts/DhikrGoalsContext";
import { dhikrList, dhikrGoalsService } from "@opentaqwa/shared";
import { useNotifications } from "../../hooks/useNotifications";

export default function GoalCreationModal({ visible, onClose, preselectedDhikr = null }) {
  const { createGoal } = useDhikrGoals();
  const { permission, requestPermission } = useNotifications();
  const [selectedDhikr, setSelectedDhikr] = useState(preselectedDhikr || null);
  const [targetCount, setTargetCount] = useState("");
  const [notes, setNotes] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTimes, setReminderTimes] = useState([]);
  const [error, setError] = useState("");

  const commonTargets = dhikrGoalsService.getCommonTargets();

  const handleCreate = () => {
    setError("");

    if (!selectedDhikr) {
      setError("Please select a dhikr");
      return;
    }

    const count = parseInt(targetCount, 10);
    if (!targetCount || isNaN(count) || count < 1) {
      setError("Please enter a valid target count (minimum 1)");
      return;
    }

    try {
      const reminder = reminderEnabled && reminderTimes.length > 0
        ? { enabled: true, times: reminderTimes }
        : { enabled: false, times: [] };
      
      createGoal(selectedDhikr, count, notes, reminder);
      setSelectedDhikr(preselectedDhikr || null);
      setTargetCount("");
      setNotes("");
      setReminderEnabled(false);
      setReminderTimes([]);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create goal");
    }
  };

  const handleClose = () => {
    setError("");
    setTargetCount("");
    setNotes("");
    setReminderEnabled(false);
    setReminderTimes([]);
    if (!preselectedDhikr) {
      setSelectedDhikr(null);
    }
    onClose();
  };

  const handleReminderToggle = async () => {
    if (!reminderEnabled && permission !== "granted") {
      const result = await requestPermission();
      if (!result.granted) {
        setError("Notification permission is required for reminders");
        return;
      }
    }
    setReminderEnabled(!reminderEnabled);
    if (!reminderEnabled && reminderTimes.length === 0) {
      // Set default reminder time (e.g., 9:00 AM)
      setReminderTimes(["09:00"]);
    }
  };

  const addReminderTime = () => {
    if (reminderTimes.length < 5) {
      setReminderTimes([...reminderTimes, "09:00"]);
    }
  };

  const removeReminderTime = (index) => {
    setReminderTimes(reminderTimes.filter((_, i) => i !== index));
  };

  const updateReminderTime = (index, time) => {
    const updated = [...reminderTimes];
    updated[index] = time;
    setReminderTimes(updated);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Target size={24} className="text-gold" />
              <h3 className="text-white text-xl font-montserrat font-bold">
                Create Goal
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          <div className="space-y-4 max-h-[calc(90vh-180px)] overflow-y-auto">
            {/* Dhikr Selection */}
            <div>
              <label className="text-white/80 text-sm font-quicksand mb-2 block">
                Select Dhikr
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dhikrList.map((dhikr) => (
                  <button
                    key={dhikr.id}
                    onClick={() => setSelectedDhikr(dhikr)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all min-w-[120px] ${
                      selectedDhikr?.id === dhikr.id
                        ? "border-gold bg-gold/20"
                        : "border-white/20 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      {dhikr.arabic && (
                        <span className={`text-base font-quicksand font-semibold mb-1 ${
                          selectedDhikr?.id === dhikr.id ? "text-gold" : "text-white/90"
                        }`} dir="rtl">
                          {dhikr.arabic}
                        </span>
                      )}
                      {dhikr.transliteration && (
                        <span className={`text-sm font-quicksand ${
                          selectedDhikr?.id === dhikr.id ? "text-gold" : "text-white/80"
                        }`}>
                          {dhikr.transliteration}
                        </span>
                      )}
                      {dhikr.meaning && (
                        <span className={`text-xs font-quicksand mt-1 ${
                          selectedDhikr?.id === dhikr.id ? "text-gold/80" : "text-white/60"
                        }`}>
                          {dhikr.meaning}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Count */}
            <div>
              <label className="text-white/80 text-sm font-quicksand mb-2 block">
                Target Count
              </label>
              <input
                type="number"
                value={targetCount}
                onChange={(e) => setTargetCount(e.target.value)}
                placeholder="Enter target (e.g., 100)"
                className="w-full bg-white/10 text-white px-4 py-3 rounded-xl font-quicksand placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              
              {/* Quick Select Buttons */}
              <div className="flex gap-2 mt-2">
                {commonTargets.map((target) => (
                  <button
                    key={target}
                    onClick={() => setTargetCount(target.toString())}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      targetCount === target.toString()
                        ? "border-gold bg-gold/20 text-gold"
                        : "border-white/20 bg-white/5 text-white/70 hover:border-white/30"
                    }`}
                  >
                    <span className="text-sm font-quicksand">{target}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes (Optional) */}
            <div>
              <label className="text-white/80 text-sm font-quicksand mb-2 block">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-xl font-quicksand placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />
            </div>

            {/* Reminder Settings */}
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-gold" />
                  <label className="text-white/80 text-sm font-quicksand">
                    Set Reminder
                  </label>
                </div>
                <button
                  onClick={handleReminderToggle}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    reminderEnabled ? "bg-gold" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      reminderEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {reminderEnabled && (
                <div className="space-y-3 mt-3">
                  {permission !== "granted" && (
                    <div className="p-3 bg-gold/20 border border-gold/50 rounded-xl">
                      <p className="text-gold text-xs font-quicksand text-center">
                        Notification permission required
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {reminderTimes.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Clock size={16} className="text-gold" />
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => updateReminderTime(index, e.target.value)}
                          className="flex-1 bg-white/10 text-white px-4 py-2.5 rounded-xl font-quicksand text-sm focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500"
                          style={{
                            colorScheme: 'dark',
                          }}
                        />
                        {reminderTimes.length > 1 && (
                          <button
                            onClick={() => removeReminderTime(index)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-red-500/30 transition-colors"
                            title="Remove time"
                          >
                            <X size={16} className="text-white/80" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {reminderTimes.length < 5 && (
                      <button
                        onClick={addReminderTime}
                        className="w-full py-2.5 text-sm text-gold hover:text-gold-light border border-gold/40 hover:border-gold/60 bg-gold/10 hover:bg-gold/20 rounded-xl transition-all font-quicksand font-medium"
                      >
                        + Add Another Time
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/50">
                <p className="text-red-300 text-sm font-quicksand text-center">{error}</p>
              </div>
            )}

            {/* Create Button */}
            <button
              onClick={handleCreate}
              className="w-full bg-gold hover:bg-gold/80 text-[#0f0d0c] py-4 rounded-xl flex items-center justify-center gap-2 font-quicksand font-bold transition-colors"
            >
              <Check size={20} />
              Create Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
