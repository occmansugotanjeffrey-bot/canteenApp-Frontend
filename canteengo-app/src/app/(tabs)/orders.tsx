import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, font, formatPeso, radius, shadow, spacing } from '@/constants/theme';
import { Order } from '@/types';
import { useOrders } from '@/context/OrdersContext';

const STATUS_COLOR: Record<Order['status'], string> = {
  Preparing: colors.warning,
  'Ready for pickup': colors.success,
  'Picked up': colors.textMuted,
};

export default function OrdersScreen() {
  const {placedOrders} = useOrders();

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <Text style={styles.title}>Your orders</Text>
      <FlatList
        data={placedOrders}
        keyExtractor={(o) => String(o.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.top}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <View style={[styles.badge, { backgroundColor: STATUS_COLOR[item.status] }]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.items}>{item.items.join(', ')}</Text>
            <View style={styles.bottom}>
              <Text style={styles.meta}>Pickup: {item.pickup_time}</Text>
              <Text style={styles.total}>{formatPeso(item.total)}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyText}>Your placed orders will show up here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: font.xl, fontWeight: '800', color: colors.text, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  list: { padding: spacing.lg },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.card },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: font.md, fontWeight: '700', color: colors.text },
  badge: { borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 3 },
  badgeText: { fontSize: font.xs, fontWeight: '700', color: '#fff' },
  items: { fontSize: font.sm, color: colors.textMuted, marginTop: spacing.sm },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  meta: { fontSize: font.sm, color: colors.text },
  total: { fontSize: font.md, fontWeight: '800', color: colors.primary },
  empty: { alignItems: 'center', marginTop: spacing.xxl },
  emptyTitle: { fontSize: font.lg, fontWeight: '700', color: colors.text },
  emptyText: { fontSize: font.sm, color: colors.textMuted, marginTop: spacing.xs },
});
