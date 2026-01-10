import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@opentaqwa/shared";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we would check for a stored token here
        const checkAuth = async () => {
            try {
                // Mock checking auth status
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const userData = await authApi.login(email, password);
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const userData = await authApi.register(name, email, password);
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
