import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigation from "./Navigation/TabNavigation";
import CategoryProvider from "./providers/CategoryProvider";

export default function App() {
	return (
		<CategoryProvider>
			<NavigationContainer>
				<SafeAreaProvider>
					<TabNavigation />
				</SafeAreaProvider>
			</NavigationContainer>
		</CategoryProvider>
	);
}
