import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, radius, spacing } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import CategoryChip from '@/components/CategoryChip';
import FoodCard from '@/components/FoodCard';
import api from '@/services/api';


const BUDGETS = [
  { label: 'Any price', max: null },
  { label: '₱30 or less', max: 30 },
  { label: '₱50 or less', max: 50 },
  { label: '₱100 or less', max: 100 },
];

export default function MenuScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const params = useLocalSearchParams<{ category?: string; maxPrice?: string }>();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  
  useEffect(() => {
    setCategory(params.category ?? null);
    setMaxPrice(params.maxPrice ? Number(params.maxPrice) : null);
  }, [params.category, params.maxPrice]);

 
 const[foods, setFoods] = useState<any[]>([]);
      useEffect(() => {
        api
          .get('/foods')
          .then((response) => {
            setFoods(response.data);
          })
          .catch((error) => {
            console.error('Error fetching foods:', error);
          });
      }, []);
  const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
      api
        .get('/categories')
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    }, []);
  const visible = useMemo(
    () =>
      foods.filter(
        (f) =>
          (!category || f.category === category) &&
          (maxPrice === null || f.price <= maxPrice) &&
          f.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [foods, category, maxPrice, query]
  );

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <Text style={styles.title}>Menu</Text>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for a dish"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
        <CategoryChip label="All" active={!category} onPress={() => setCategory(null)} />
        {categories.map((c) => (
          <CategoryChip key={c.id} label={c.name} emoji={c.emoji} active={category === c.name} onPress={() => setCategory(c.name)} />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
        {BUDGETS.map((b) => (
          <CategoryChip key={b.label} label={b.label} active={maxPrice === b.max} onPress={() => setMaxPrice(b.max)} />
        ))}
      </ScrollView>

      <FlatList style={styles.listArea}
        data={visible}
        keyExtractor={(f) => String(f.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <FoodCard
            food={item}
            onPress={() => router.push({ pathname: '/food/[id]', params: { id: String(item.id) } })}
            onAdd={() => addItem(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nothing matches</Text>
            <Text style={styles.emptyText}>Try a higher budget or clear the category.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: font.xl, fontWeight: '800', color: colors.text, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  input: { flex: 1, paddingVertical: spacing.md, marginLeft: spacing.sm, fontSize: font.md, color: colors.text },
  chips: { flexShrink: 0, flexGrow: 0, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  list: { padding: spacing.lg, paddingTop: spacing.md },
  empty: { alignItems: 'center', marginTop: spacing.xxl },
  emptyTitle: { fontSize: font.lg, fontWeight: '700', color: colors.text },
  emptyText: { fontSize: font.sm, color: colors.textMuted, marginTop: spacing.xs },
  listArea: { flex: 1 }
});
