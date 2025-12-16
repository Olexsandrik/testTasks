import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import i18n from "../../i18n";
import type { RootState } from "../../store/store";
import { darkTheme, lightTheme } from "../../utils/theme/theme";
export default function ChangeLanguageScreen() {
	const [selectedLanguage, setSelectedLanguage] = useState<string>(
		i18n.language,
	);
	const { darkMode } = useSelector((state: RootState) => state.theme);
	const theme = darkMode ? darkTheme : lightTheme;

	useEffect(() => {
		setSelectedLanguage(i18n.language);
	}, []);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.backgroundColor,
			}}
		>
			<View
				style={{
					width: "100%",
					height: 100,
					backgroundColor: theme.backgroundColor,
				}}
			>
				<Picker
					selectedValue={selectedLanguage}
					onValueChange={(itemValue) => {
						setSelectedLanguage(itemValue);
						i18n.changeLanguage(itemValue);
					}}
				>
					<Picker.Item label="English" value="en" color={theme.color} />
					<Picker.Item label="Ukrainian" value="uk" color={theme.color} />
				</Picker>
			</View>
		</View>
	);
}
