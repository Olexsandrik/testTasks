import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { MyTabs } from "./navigation/Tab";
import store from "./store/store";

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<MyTabs />
			</SafeAreaProvider>
		</Provider>
	);
}
