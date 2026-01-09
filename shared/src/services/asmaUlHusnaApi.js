/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import axios from "axios";

const BASE_URL = "https://reminder.dev/api";

export const asmaUlHusnaApi = {
  getNameById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/names/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch name");
    }
  },

  getDailyName: async () => {
    try {
      const today = new Date();
      const dayOfYear = Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
      );

      const nameId = (dayOfYear % 99) + 1;

      return await asmaUlHusnaApi.getNameById(nameId);
    } catch (error) {
      throw new Error("Failed to fetch daily name");
    }
  },

  getAllNames: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/names`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch all names");
    }
  },
};
