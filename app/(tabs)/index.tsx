import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePortfolioStore } from '../../store/portfolioStore';

export default function Index() {

  // STORE
  const stocks = usePortfolioStore((state) => state.stocks) || [];
  const addStock = usePortfolioStore((state) => state.addStock);
  const deleteStock = usePortfolioStore((state) => state.deleteStock);
  const updateStock = usePortfolioStore((state) => state.updateStock);
  const loadStocks = usePortfolioStore((state) => state.loadStocks);

  const [editId, setEditId] = useState(null);

  // FILTER
  const [filter, setFilter] = useState('ALL');

  // FORM
  const [form, setForm] = useState({
    ticker: '',
    name: '',
    quantity: '',
    purchasePrice: '',
    currentPrice: '',
  });

  // ANIMATION
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    loadStocks();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // BUTTON ANIMATION
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // RESET
  const resetForm = () => {
    setForm({
      ticker: '',
      name: '',
      quantity: '',
      purchasePrice: '',
      currentPrice: '',
    });
    setEditId(null);
  };

  // PROFIT
  const getProfit = (s) =>
    (Number(s.currentPrice) - Number(s.purchasePrice)) *
    Number(s.quantity);

  // SUBMIT
  const submit = () => {
    if (!form.ticker || !form.name) {
      Alert.alert("Error", "Ticker and Company Name required");
      return;
    }

    const newStock = {
      id: editId || Date.now().toString(),
      ticker: form.ticker.trim(),
      name: form.name.trim(),
      quantity: Number(form.quantity) || 0,
      purchasePrice: Number(form.purchasePrice) || 0,
      currentPrice: Number(form.currentPrice) || 0,
    };

    if (editId) updateStock(newStock);
    else addStock(newStock);

    resetForm();
  };

  // FILTER
  const filteredStocks = stocks.filter((s) => {
    const profit = getProfit(s);
    if (filter === 'PROFIT') return profit > 0;
    if (filter === 'LOSS') return profit < 0;
    return true;
  });

  // SUMMARY
  const totalInvestment = stocks.reduce(
    (sum, s) => sum + s.purchasePrice * s.quantity,
    0
  );

  const currentValue = stocks.reduce(
    (sum, s) => sum + s.currentPrice * s.quantity,
    0
  );

  const totalProfit = currentValue - totalInvestment;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fb' }}>

      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* HEADER */}
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10 }}>
          📊 My Portfolio
        </Text>

        {/* SUMMARY */}
        {stocks.length > 0 && (
          <Animated.View style={{
            opacity: fadeAnim,
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 16,
            marginBottom: 15,
            elevation: 3
          }}>
            <Text style={{ color: '#6b7280' }}>Total Value</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              ₹{currentValue.toFixed(2)}
            </Text>
            <Text style={{
              color: totalProfit >= 0 ? '#16a34a' : '#ef4444'
            }}>
              {totalProfit >= 0 ? '+' : ''}₹{totalProfit.toFixed(2)}
            </Text>
          </Animated.View>
        )}

        {/* FORM */}
        <View style={{
          backgroundColor: '#fff',
          padding: 15,
          borderRadius: 16,
          marginBottom: 15
        }}>
          {['ticker', 'name', 'quantity', 'purchasePrice', 'currentPrice'].map((field, i) => (
            <TextInput
              key={i}
              placeholder={
                field === 'ticker' ? 'Ticker' :
                field === 'name' ? 'Company' :
                field === 'quantity' ? 'Qty' :
                field === 'purchasePrice' ? 'Buy Price' :
                'Current Price'
              }
              keyboardType={field.includes('Price') || field === 'quantity' ? 'numeric' : 'default'}
              value={form[field]}
              onChangeText={(t) => setForm({ ...form, [field]: t })}
              style={{
                borderBottomWidth: 1,
                marginBottom: 10,
                paddingVertical: 6
              }}
            />
          ))}

          {/* BUTTON */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPress={submit}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={{
                backgroundColor: '#3b82f6',
                padding: 12,
                borderRadius: 10,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                {editId ? "Update Stock" : "Add Stock"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* FILTER BUTTONS */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
          {['ALL', 'PROFIT', 'LOSS'].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilter(type)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                backgroundColor: filter === type ? '#3b82f6' : '#e5e7eb'
              }}
            >
              <Text style={{
                color: filter === type ? '#fff' : '#000'
              }}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIST */}
        {filteredStocks.map((item) => {
          const profit = getProfit(item);

          return (
            <Animated.View
              key={item.id}
              style={{
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                }],
                backgroundColor: '#fff',
                padding: 16,
                borderRadius: 16,
                marginBottom: 12,
                elevation: 2
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>
                {item.ticker} - {item.name}
              </Text>

              <Text>Qty: {item.quantity}</Text>
              <Text>Buy: ₹{item.purchasePrice}</Text>
              <Text>Now: ₹{item.currentPrice}</Text>

              <Text style={{ color: profit >= 0 ? 'green' : 'red' }}>
                ₹{profit.toFixed(2)}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity onPress={() => {
                  setForm(item);
                  setEditId(item.id);
                }}>
                  <Text style={{ color: 'blue', marginRight: 15 }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert("Delete?", "Are you sure?", [
                      { text: "Cancel" },
                      { text: "Delete", onPress: () => deleteStock(item.id) }
                    ])
                  }
                >
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        })}

      </ScrollView>
    </SafeAreaView>
  );
}