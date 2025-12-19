import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AlertsTab from "../TabComponents/AlertsTab";
import MapStack from "../TabComponents/MapStack";
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
				component={AlertsTab}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="notifications-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Map"
				component={MapStack}
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
