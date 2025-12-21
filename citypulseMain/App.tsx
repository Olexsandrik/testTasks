import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigation from "./Navigation/TabNavigation";

export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<TabNavigation />
			</SafeAreaProvider>
		</NavigationContainer>
	);
}
