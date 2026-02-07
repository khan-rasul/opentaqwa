/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import Dhikr from "./components/Dhikr";
import Dua from "./components/Dua";
import Durood from "./components/Durood";
import Header from "./components/Header";
import PrayerTime from "./components/PrayerTime";
import Tagline from "./components/Tagline";
import Verse from "./components/Verse";
import AsmaUlHusna from "./components/AsmaUlHusna";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LocationProvider } from "./contexts/LocationContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { DhikrGoalsProvider } from "./contexts/DhikrGoalsContext";
import Footer from "./components/Footer";
import DhikrGoalsPanel from "./components/DhikrGoals/DhikrGoalsPanel";

const AppContent = () => {
  return (
    <div className="px-3 py-3 h-screen w-full max-w-full text-white min-w-fit bg-gradient-to-br from-amber-400/8 from-5% via-neutral-800 via-25% to-neutral-800 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col space-y-3">
        <Header />
        <div className="flex space-x-3 justify-center w-full h-52 sm:h-60 md:h-68 lg:h-76 xl:h-84 2xl:h-[26rem]">
          <div className="flex-8">
            <Dhikr />
          </div>
          <div className="flex-10">
            <Durood />
          </div>
        </div>
        <div className="flex space-x-3 justify-center w-full h-52 sm:h-60 md:h-68 lg:h-76 xl:h-84 2xl:h-[26rem]">
          <div className="flex-2">
            <Dua />
          </div>
          <div className="flex-1">
            <Tagline />
          </div>
        </div>
        <PrayerTime />
        <DhikrGoalsPanel />
        <Verse />
        <AsmaUlHusna />
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <NotificationProvider>
          <LanguageProvider>
            <DhikrGoalsProvider>
              <AppContent />
            </DhikrGoalsProvider>
          </LanguageProvider>
        </NotificationProvider>
      </AuthProvider>
    </LocationProvider>
  );
};

export default App;
