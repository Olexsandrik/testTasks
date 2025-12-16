import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Alert,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils/theme/theme";

// User data storage keys
const USER_DATA_KEY = "@user_data";

interface UserData {
	name: string;
	email: string;
	profilePhoto: string;
}

export default function UserInfoScreen() {
	const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState("");
	const [editedEmail, setEditedEmail] = useState("");
	const [userData, setUserData] = useState<UserData>({
		name: "John Doe",
		email: "john.doe@example.com",
		profilePhoto: "https://via.placeholder.com/120x120/4A90E2/FFFFFF?text=JD",
	});
	const { t } = useTranslation();
	const { darkMode } = useSelector(
		(state: { theme: { darkMode: boolean } }) => state.theme,
	);
	const theme = darkMode ? darkTheme : lightTheme;

	const loadUserData = useCallback(async () => {
		try {
			const storedData = await AsyncStorage.getItem(USER_DATA_KEY);
			if (storedData) {
				const parsedData: UserData = JSON.parse(storedData);
				setUserData(parsedData);
				setEditedName(parsedData.name);
				setEditedEmail(parsedData.email);
				if (
					parsedData.profilePhoto !==
					"https://via.placeholder.com/120x120/4A90E2/FFFFFF?text=JD"
				) {
					setProfilePhoto(parsedData.profilePhoto);
				}
			} else {
				setEditedName(userData.name);
				setEditedEmail(userData.email);
			}
		} catch (error) {
			console.error("Error loading user data:", error);
			Alert.alert(t("userInfo.error"), t("userInfo.failedLoadData"));
		}
	}, [userData.name, userData.email, t]);

	useEffect(() => {
		loadUserData();
	}, [loadUserData]);

	const saveUserData = async (data: UserData) => {
		try {
			await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
			setUserData(data);
		} catch (error) {
			console.error("Error saving user data:", error);
			Alert.alert(t("userInfo.error"), t("userInfo.failedSaveData"));
		}
	};

	const handlerPickImage = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert(
				t("userInfo.permissionRequired"),
				t("userInfo.mediaLibraryPermission"),
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			const newPhotoUri = result.assets[0].uri;
			setProfilePhoto(newPhotoUri);

			const updatedData = { ...userData, profilePhoto: newPhotoUri };
			await saveUserData(updatedData);
		}
	};

	const handlerChangeUserInfo = async () => {
		if (isEditing) {
			if (!editedName.trim() || !editedEmail.trim()) {
				Alert.alert(t("userInfo.error"), t("userInfo.nameEmailRequired"));
				return;
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(editedEmail)) {
				Alert.alert(t("userInfo.error"), t("userInfo.invalidEmail"));
				return;
			}

			const updatedData = {
				...userData,
				name: editedName.trim(),
				email: editedEmail.trim(),
			};

			await saveUserData(updatedData);
			setIsEditing(false);
			Alert.alert(t("userInfo.success"), t("userInfo.userInfoUpdated"));
		} else {
			setEditedName(userData.name);
			setEditedEmail(userData.email);
			setIsEditing(true);
		}
	};

	return (
		<View
			style={[styles.container, { backgroundColor: theme.backgroundColor }]}
		>
			<View
				style={[styles.content, { backgroundColor: theme.backgroundColor }]}
			>
				<View
					style={[
						styles.profileSection,
						{ backgroundColor: theme.backgroundColor },
						styles.cardShadow,
					]}
				>
					<Pressable onPress={handlerPickImage} style={styles.imageContainer}>
						<Image
							source={{ uri: profilePhoto || userData.profilePhoto }}
							style={[styles.profileImage, { borderColor: theme.color }]}
						/>
						<View style={[styles.editIcon, { backgroundColor: "#007AFF" }]}>
							<Text style={styles.editIconText}>✏️</Text>
						</View>
					</Pressable>

					<View style={[styles.userInfo, { backgroundColor: "transparent" }]}>
						{isEditing ? (
							<>
								<View style={styles.inputContainer}>
									<Text style={[styles.inputLabel, { color: theme.color }]}>
										{t("userInfo.name")}
									</Text>
									<TextInput
										style={[
											styles.textInput,
											{
												color: theme.color,
												borderColor: theme.color,
												backgroundColor: theme.backgroundColor,
											},
										]}
										value={editedName}
										onChangeText={setEditedName}
										placeholder={t("userInfo.enterName")}
										placeholderTextColor={theme.color}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text style={[styles.inputLabel, { color: theme.color }]}>
										{t("userInfo.email")}
									</Text>
									<TextInput
										style={[
											styles.textInput,
											{
												color: theme.color,
												borderColor: theme.color,
												backgroundColor: theme.backgroundColor,
											},
										]}
										value={editedEmail}
										onChangeText={setEditedEmail}
										placeholder={t("userInfo.enterEmail")}
										placeholderTextColor={theme.color}
										keyboardType="email-address"
										autoCapitalize="none"
									/>
								</View>
							</>
						) : (
							<>
								<Text style={[styles.name, { color: theme.color }]}>
									{userData.name}
								</Text>
								<Text style={[styles.email, { color: theme.color }]}>
									{userData.email}
								</Text>
							</>
						)}

						<View style={styles.buttonContainer}>
							<Pressable
								style={[
									styles.actionButton,
									{
										backgroundColor: isEditing ? "#28a745" : "#007AFF",
									},
								]}
								onPress={handlerChangeUserInfo}
							>
								<Text style={styles.buttonText}>
									{isEditing
										? t("userInfo.saveChanges")
										: t("userInfo.editProfile")}
								</Text>
							</Pressable>

							{isEditing && (
								<Pressable
									style={[styles.cancelButton, { borderColor: theme.color }]}
									onPress={() => {
										setIsEditing(false);
										setEditedName(userData.name);
										setEditedEmail(userData.email);
									}}
								>
									<Text
										style={[styles.cancelButtonText, { color: theme.color }]}
									>
										{t("userInfo.cancel")}
									</Text>
								</Pressable>
							)}
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 40,
	},
	profileSection: {
		alignItems: "center",
		borderRadius: 20,
		padding: 32,
		marginHorizontal: 16,
	},
	imageContainer: {
		position: "relative",
		marginBottom: 24,
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 4,
	},
	editIcon: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "white",
	},
	editIconText: {
		fontSize: 14,
	},
	userInfo: {
		alignItems: "center",
		width: "100%",
	},
	name: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 8,
		textAlign: "center",
	},
	email: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 24,
		opacity: 0.8,
	},
	inputContainer: {
		width: "100%",
		marginBottom: 16,
	},
	inputLabel: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 6,
		marginLeft: 4,
	},
	textInput: {
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 16,
		width: "100%",
	},
	buttonContainer: {
		width: "100%",
		gap: 12,
		marginTop: 8,
	},
	actionButton: {
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	cancelButton: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		borderWidth: 1,
	},
	cancelButtonText: {
		fontSize: 16,
		fontWeight: "500",
	},
	cardShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
});
