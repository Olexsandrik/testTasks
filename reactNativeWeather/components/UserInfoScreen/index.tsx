import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../utils/theme/theme';

export default function UserInfoScreen() {
    const { darkMode } = useSelector((state: any) => state.theme);
    const theme = darkMode ? darkTheme : lightTheme;
  
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePhoto: 'https://via.placeholder.com/120x120/4A90E2/FFFFFF?text=JD'
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.content, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.profileSection, { backgroundColor: theme.backgroundColor }]}>
          <Image
            source={{ uri: user.profilePhoto }}
            style={[styles.profileImage, { borderColor: theme ? theme.color : '#000000'}]}
          />
          <View style={[styles.userInfo, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.name, { color: theme.color }]}>{user.name}</Text>
            <Text style={[styles.email, { color: theme.color }]}>{user.email}</Text>
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
    alignItems: 'center',
    borderRadius: 16,
    padding: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 3,

  },
  userInfo: {
    alignItems: 'center',

  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
  },
});
