import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },

        sceneContainerStyle: {
          backgroundColor: theme.background, // 🔥 IMPORTANT FIX
        },
      }}
    />
  );
}