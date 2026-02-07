/*
 * OpenTaqwā - Dhikr Goals Reminders Hook
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useEffect, useRef } from "react";
import { useNotifications } from "./useNotifications";

/**
 * Calculate milliseconds until a specific time today or tomorrow
 */
const msUntilTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  
  // If time has passed today, schedule for tomorrow
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }
  
  return target.getTime() - now.getTime();
};

/**
 * Hook to schedule notifications for dhikr goals with reminders
 */
export const useDhikrReminders = (goals = []) => {
  const { sendNotification, permission } = useNotifications();
  const timeoutsRef = useRef([]);

  useEffect(() => {
    // Clear existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (permission !== "granted") {
      return;
    }

    // Schedule reminders for each goal with reminders enabled
    goals.forEach((goal) => {
      if (!goal.reminder?.enabled || !goal.reminder?.times || goal.reminder.times.length === 0) {
        return;
      }

      // Skip if goal is paused or completed
      if (goal.status === "paused" || goal.isCompletedToday) {
        return;
      }

      // Schedule notification for each reminder time
      goal.reminder.times.forEach((time) => {
        const msUntil = msUntilTime(time);

        const timeout = setTimeout(() => {
          sendNotification(
            `Dhikr Reminder: ${goal.dhikrText}`,
            {
              body: `Don't forget your goal: ${goal.currentCount}/${goal.targetCount} ${goal.dhikrText}`,
              tag: `dhikr-reminder-${goal.id}-${time}`,
              requireInteraction: false,
            }
          );
        }, msUntil);

        timeoutsRef.current.push(timeout);
      });
    });

    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [goals, permission, sendNotification]);
};
