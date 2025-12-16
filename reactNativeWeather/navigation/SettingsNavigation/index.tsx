import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChangeLanguageScreen from "../../components/ChangeLanguageScreen";
import UserInfoScreen from "../../components/UserInfoScreen";
import type { RootState } from "../../store/store";
import { darkTheme, lightTheme } from "../../utils/theme/theme";
import ChangeThemeScreen from "../Screens/Settings";

const Drawer = createDrawerNavigator();

export default function SettingsNavigation() {
	const { t } = useTranslation();
	const { darkMode } = useSelector((state: RootState) => state.theme);
	const theme = darkMode ? darkTheme : lightTheme;

	return (
		<Drawer.Navigator
			screenOptions={{
				drawerActiveTintColor: theme.color,
				drawerActiveBackgroundColor: theme.backgroundColor,
				drawerLabelStyle: {
					color: theme.color,
				},
				drawerStyle: {
					backgroundColor: theme.backgroundColor,
					width: 240,
				},
				headerStyle: {
					backgroundColor: theme.backgroundColor,
					shadowColor: darkMode ? "#ffffff" : "#000000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: darkMode ? 0.1 : 0.2,
					shadowRadius: 3.84,
					elevation: 5,
					borderBottomWidth: 1,
					borderBottomColor: darkMode ? "#333333" : "#e0e0e0",
				},
				headerTintColor: theme.color,
				headerTitleStyle: {
					fontWeight: "600",
					fontSize: 18,
					color: theme.color,
				},
				drawerItemStyle: {
					backgroundColor: darkMode ? "#2a2a2a" : "#f0f0f0",
					borderColor: darkMode ? "#444444" : "#cccccc",
					borderWidth: 1,
					marginVertical: 2,
					marginHorizontal: 10,
					borderRadius: 8,
					opacity: 0.8,
				},
				drawerInactiveTintColor: theme.color,
				drawerInactiveBackgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
			}}
		>
			<Drawer.Screen
				name="UserInfo"
				component={UserInfoScreen}
				options={{ title: t("navigation.drawer.userInfo") }}
			/>
			<Drawer.Screen
				name="ChangeTheme"
				component={ChangeThemeScreen}
				options={{ title: t("navigation.drawer.changeTheme") }}
			/>
			<Drawer.Screen
				name="ChangeLanguage"
				component={ChangeLanguageScreen}
				options={{ title: t("navigation.drawer.changeLanguage") }}
			/>
		</Drawer.Navigator>
	);
}
