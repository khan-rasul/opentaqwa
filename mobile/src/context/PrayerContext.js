import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import { aladhanApi, geocodingApi } from "@opentaqwa/shared";

const PrayerContext = createContext();

const PRAYER_METADATA = [
    { id: "Fajr", name: "Fajr", arabic: "الفجر" },
    { id: "Dhuhr", name: "Dhuhr", arabic: "الظهر" },
    { id: "Asr", name: "Asr", arabic: "العصر" },
    { id: "Maghrib", name: "Maghrib", arabic: "المغرب" },
    { id: "Isha", name: "Isha", arabic: "العشاء" },
];

export function PrayerProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [nextPrayer, setNextPrayer] = useState(null);
    const [locationName, setLocationName] = useState({ city: "Detecting...", country: "" });
    const [error, setError] = useState(null);

    const format12h = (time24) => {
        if (!time24) return "";
        const [hours, minutes] = time24.split(':');
        let h = parseInt(hours);
        const m = minutes;
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;
        return `${h}:${m} ${ampm}`;
    };

    const calculateNextPrayer = useCallback((times) => {
        const now = new Date();
        let next = null;

        for (const prayer of times) {
            const [h, m] = prayer.rawTime.split(':');
            const pDate = new Date();
            pDate.setHours(parseInt(h), parseInt(m), 0, 0);

            if (pDate > now) {
                next = { ...prayer, date: pDate };
                break;
            }
        }

        if (!next && times.length > 0) {
            const [h, m] = times[0].rawTime.split(':');
            const pDate = new Date();
            pDate.setDate(pDate.getDate() + 1);
            pDate.setHours(parseInt(h), parseInt(m), 0, 0);
            next = { ...times[0], date: pDate };
        }

        return next;
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            let { status } = await Location.requestForegroundPermissionsAsync();

            let lat, lon;
            if (status !== 'granted') {
                lat = 51.5074; // London fallback
                lon = -0.1278;
                setLocationName({ city: "London", country: "UK (Default)" });
            } else {
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced
                });
                lat = location.coords.latitude;
                lon = location.coords.longitude;

                try {
                    const geoData = await geocodingApi.reverseGeocode(lat, lon);
                    setLocationName(geoData);
                } catch (e) {
                    setLocationName({ city: "Current Location", country: "" });
                }
            }

            const response = await aladhanApi.getPrayerTimesByCoordinates(lat, lon);
            const timings = response.data.timings;

            const formattedTimes = PRAYER_METADATA.map(meta => ({
                ...meta,
                time: format12h(timings[meta.id]),
                rawTime: timings[meta.id]
            }));

            setPrayerTimes(formattedTimes);
            const next = calculateNextPrayer(formattedTimes);
            setNextPrayer(next);
            setLoading(false);
        } catch (err) {
            console.error("Prayer Provider Error:", err);
            setError("Failed to load prayer times");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [calculateNextPrayer]);

    // Update next prayer periodically or when time passes
    useEffect(() => {
        const interval = setInterval(() => {
            if (prayerTimes.length > 0) {
                const next = calculateNextPrayer(prayerTimes);
                setNextPrayer(prev => {
                    if (prev?.id !== next?.id || prev?.date.getTime() !== next?.date.getTime()) {
                        return next;
                    }
                    return prev;
                });
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [prayerTimes, calculateNextPrayer]);

    const value = {
        prayerTimes,
        nextPrayer,
        locationName,
        loading,
        error,
        refresh: fetchData
    };

    return <PrayerContext.Provider value={value}>{children}</PrayerContext.Provider>;
}

export function usePrayer() {
    const context = useContext(PrayerContext);
    if (!context) {
        throw new Error("usePrayer must be used within a PrayerProvider");
    }
    return context;
}
