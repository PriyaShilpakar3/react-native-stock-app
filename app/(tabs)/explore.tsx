import { View, Text, useColorScheme, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

export default function Explore() {
  const theme = Colors[useColorScheme() ?? 'light'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fb' }}>
      
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* HEADER */}
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#111',
          marginBottom: 15
        }}>
          🔍 Market Insights
        </Text>

        {/* CARD */}
        <View style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 16,
          elevation: 3
        }}>
          <Text style={{ color: '#333', lineHeight: 22 }}>
            • Tech stocks are bullish 📈{"\n\n"}
            • Energy sector is volatile ⚡{"\n\n"}
            • AI stocks trending 🚀
          </Text>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}