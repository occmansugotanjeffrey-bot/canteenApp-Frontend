import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, font, radius, spacing } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import CategoryChip from '@/components/CategoryChip';
import DealBanner from '@/components/DealBanner';
import FoodCard from '@/components/FoodCard';
import AnnouncementCard from '@/components/announcementCard';
import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function HomeScreen() {
  const router = useRouter();
  const { addItem } = useCart();

  
  const [announcement, setAnnouncement] = useState<any | null>(null);

  useEffect(() => {
    api
      .get('/announcements')
      .then((response) => {
        if (response.data.length > 0) {
          setAnnouncement(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
      });
  }, []);
  const[deals, setDeals] = useState<any[]>([]);

    useEffect(() => {
      api
        .get('/deals')
        .then((response) => {
          setDeals(response.data);
        })
        .catch((error) => {
          console.error('Error fetching deals:', error);
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
  const [popular, setPopular] = useState<any[]>([]);

    useEffect(() => {
      api
        .get('/foods')
        .then((response) => {
          setPopular(response.data.slice(0, 4));
        })
        .catch((error) => {
          console.error('Error fetching popular items:', error);
        });
    }, []);

  const openMenu = (params: { category?: string; maxPrice?: string }) =>
    router.push({ pathname: '/menu', params });

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.greeting}>What's for break today?</Text>
        <Text style={styles.sub}>Order ahead and skip the line.</Text>
        <View style={styles.budgetRow}>
          <Pressable style={styles.budgetBtn} onPress={() => openMenu({ maxPrice: '30' })}>
            <Text style={styles.budgetText}>₱30 or less</Text>
          </Pressable>
          <Pressable style={styles.budgetBtn} onPress={() => openMenu({ maxPrice: '50' })}>
            <Text style={styles.budgetText}>₱50 or less</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {announcement && <AnnouncementCard announcement={announcement} />}
        <Text style={styles.sectionTitle}>Student deals</Text>
        <FlatList
          horizontal
          data={deals}
          keyExtractor={(d) => String(d.id)}
          renderItem={({ item }) => <DealBanner deal={item} />}
          showsHorizontalScrollIndicator={false}
          style={styles.hList}
        />

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hList}>
          {categories.map((c) => (
            <CategoryChip key={c.id} label={c.name} emoji={c.emoji} onPress={() => openMenu({ category: c.name })} />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Popular today</Text>
        {popular.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onPress={() => router.push({ pathname: '/food/[id]', params: { id: String(food.id) } })}
            onAdd={() => addItem(food)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.lg + 6,
    borderBottomRightRadius: radius.lg + 6,
  },
  greeting: { fontSize: font.xl, fontWeight: '800', color: '#fff', marginTop: spacing.md },
  sub: { fontSize: font.sm, color: '#D9CFF0', marginTop: spacing.xs },
  budgetRow: { flexDirection: 'row', marginTop: spacing.lg },
  budgetBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  budgetText: { fontSize: font.sm, fontWeight: '800', color: colors.accentText },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  sectionTitle: { fontSize: font.lg, fontWeight: '700', color: colors.text, marginTop: spacing.lg, marginBottom: spacing.md },
  hList: { flexGrow: 0 },
});
