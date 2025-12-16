import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { darkTheme, lightTheme } from "../../utils/theme/theme";
import Analytics from "../Screens/Analytics";
import HomeScreen from "../Screens/Home";
import SettingsNavigation from "../SettingsNavigation";

const Tab = createBottomTabNavigator();

export function MyTabs() {
	const { t } = useTranslation();
	const { darkMode } = useSelector((state: RootState) => state.theme);
	const theme = darkMode ? darkTheme : lightTheme;
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarLabel: t("navigation.tabs.home"),
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
					name="Analytics"
					component={Analytics}
					options={{
						tabBarLabel: t("navigation.tabs.analytics"),
						tabBarIcon: ({ color, size }) => (
							<Ionicons name="analytics" size={size} color={color} />
						),
						headerShown: false,
						tabBarStyle: {
							backgroundColor: theme.backgroundColor,
						},
					}}
				/>

				<Tab.Screen
					name="Settings"
					component={SettingsNavigation}
					options={{
						tabBarLabel: t("navigation.tabs.settings"),
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
