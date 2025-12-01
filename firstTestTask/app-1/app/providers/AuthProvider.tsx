"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
	name?: string;
	email?: string;
	password?: string;
};
const AuthContext = createContext<{
	user: User | null;
	setUser: (user: User | null) => void;
	loading: boolean;
}>({ user: null, setUser: () => {}, loading: false });

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		try {
			const storedUser = localStorage.getItem("currentUser");

			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
		} catch (error) {
			console.error("Error loading user from localStorage:", error);
			localStorage.removeItem("currentUser");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (user) {
			localStorage.setItem("currentUser", JSON.stringify(user));
		} else {
			localStorage.removeItem("currentUser");
		}
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthContextProvider");
	}
	return context;
};
export default AuthContextProvider;
