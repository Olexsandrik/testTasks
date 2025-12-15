import React from 'react'
import { TouchableOpacity, StyleSheet   } from 'react-native'
import { Text } from 'react-native'
import { useSelector } from 'react-redux';
import { darkTheme } from '../../../utils/theme/theme';
import { lightTheme } from '../../../utils/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WeatherButton({ title, icon, days, onPress }: {
	title: string;
	icon: keyof typeof MaterialCommunityIcons.glyphMap;
	days: number;
	onPress: () => void;
}) {
	const { darkMode } = useSelector((state: any) => state.theme);
	const theme = darkMode ? darkTheme : lightTheme;
  return (
    <TouchableOpacity style={[styles.weatherButton, { backgroundColor: theme.color === '#000000' ? '    #FFFFFF' : '#000000' }]} onPress={onPress}>
			<MaterialCommunityIcons name={icon} size={24} color={theme.color === '#000000' ? '#000000' : '#FFFFFF'} />
			<Text style={[styles.buttonText, { color: theme.color } ]}>{title}</Text>
			<Text style={[styles.buttonSubtext, { color: theme.color === '#000000' ? '#000000' : '#FFFFFF' }]}>
				{days === 1 ? 'Today' : `${days} days`}
			</Text>
	</TouchableOpacity>
  )


} 

const styles = StyleSheet.create({
	weatherButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
	},
    buttonText: {
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 15,
		flex: 1,
	},
	buttonSubtext: {
		fontSize: 12,
		fontWeight: '400',
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
	},
});