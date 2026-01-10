/**
 * OpenTaqwā - Mock Auth Service
 * For demonstration purposes. Can be extended to use Firebase, Supabase, or a custom API.
 */

// Simple local storage mock for users (in-memory for this demo)
const MOCK_USERS = [
    {
        id: "1",
        name: "Rasul Khan",
        email: "rasul@opentaqwa.com",
        password: "password123",
    }
];

export const authApi = {
    login: async (email, password) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        throw new Error("Invalid email or password");
    },

    register: async (name, email, password) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (MOCK_USERS.find(u => u.email === email)) {
            throw new Error("Email already registered");
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
        };

        MOCK_USERS.push(newUser);
        const { password: pw, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    logout: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};
