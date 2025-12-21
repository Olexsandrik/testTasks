import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PageNavigationAlert from "../PageNavigationAlert";
import PageNavigation from "../PageNavigationMap";
import ProfileTab from "../TabComponents/ProfileTab";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Profile"
				component={ProfileTab}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Alerts"
				component={PageNavigationAlert}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="notifications-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Map"
				component={PageNavigation}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="map-outline" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
