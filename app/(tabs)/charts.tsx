import {
  View,
  Text,
  useColorScheme,
  Dimensions,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/theme';
import { usePortfolioStore } from '../../store/portfolioStore';

export default function Charts() {
  const scheme = useColorScheme();
  const theme = Colors[scheme ?? 'light'];

  const stocks = usePortfolioStore((state) => state.stocks) || [];

  const screenWidth = Dimensions.get('window').width - 30;

  // DATA
  const labels = stocks.slice(0, 6).map((s) => s.ticker || 'N/A');

  const priceData = stocks.slice(0, 6).map(
    (s) => Number(s.currentPrice) || 0
  );

  const profitData = stocks.slice(0, 6).map(
    (s) =>
      ((Number(s.currentPrice) || 0) - (Number(s.purchasePrice) || 0)) *
      (Number(s.quantity) || 0)
  );

  const volumeData = stocks.slice(0, 6).map(
    () => Math.floor(Math.random() * 2000)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fb' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* HEADER */}
        <Text style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: '#111',
          marginBottom: 15
        }}>
          📈 Portfolio Analytics
        </Text>

        {/* EMPTY STATE */}
        {stocks.length === 0 ? (
          <Text style={{ color: '#555' }}>
            No stocks yet. Add stocks to view charts 📊
          </Text>
        ) : (
          <>

            {/* PRICE CHART CARD */}
            <View style={{
              backgroundColor: '#fff',
              padding: 12,
              borderRadius: 16,
              marginBottom: 15,
              elevation: 3
            }}>
              <Text style={{ fontWeight: '600', marginBottom: 5 }}>
                Stock Prices
              </Text>

              <LineChart
                data={{
                  labels,
                  datasets: [{ data: priceData }],
                }}
                width={screenWidth}
                height={220}
                bezier
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2,
                  color: () => theme.tint,
                  labelColor: () => '#333',
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: theme.tint,
                  },
                }}
                style={{ borderRadius: 16 }}
              />
            </View>

            {/* PROFIT CHART CARD */}
            <View style={{
              backgroundColor: '#fff',
              padding: 12,
              borderRadius: 16,
              marginBottom: 15,
              elevation: 3
            }}>
              <Text style={{ fontWeight: '600', marginBottom: 5 }}>
                Profit / Loss
              </Text>

              <BarChart
                data={{
                  labels,
                  datasets: [{ data: profitData }],
                }}
                width={screenWidth}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2,
                  color: () => theme.tint,
                  labelColor: () => '#333',
                }}
                style={{ borderRadius: 16 }}
              />
            </View>

            {/* VOLUME CHART CARD */}
            <View style={{
              backgroundColor: '#fff',
              padding: 12,
              borderRadius: 16,
              marginBottom: 20,
              elevation: 3
            }}>
              <Text style={{ fontWeight: '600', marginBottom: 5 }}>
                📊 Trading Volume
              </Text>

              <BarChart
                data={{
                  labels,
                  datasets: [{ data: volumeData }],
                }}
                width={screenWidth}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0,
                  color: () => theme.tint,
                  labelColor: () => '#333',
                }}
                style={{ borderRadius: 16 }}
              />
            </View>

          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}