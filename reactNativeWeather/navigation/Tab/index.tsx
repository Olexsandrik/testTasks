import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Screens/Home";
import SettingsScreen from "../Screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils/theme/theme";

const Tab = createBottomTabNavigator();

export function MyTabs() {
	const { darkMode } = useSelector((state: any) => state.theme);
	const theme = darkMode ? darkTheme : lightTheme;
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarLabel: "Home",
						tabBarIcon: ({ color, size }) => (
							<Ionicons name="home" size={size} color={color} />
						),
						headerShown: false,
						tabBarStyle: {
							backgroundColor: theme.backgroundColor,
						},
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsScreen}
					options={{
						tabBarLabel: "Settings",

						tabBarIcon: ({ color, size }) => (
							<Ionicons name="settings" size={size} color={color} />
						),
						headerShown: false,
						tabBarStyle: {
							backgroundColor: theme.backgroundColor,
						},
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
