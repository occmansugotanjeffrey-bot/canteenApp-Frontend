import React, { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, formatPeso, radius, shadow, spacing } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import CategoryChip from '@/components/CategoryChip';
import { useOrders } from '@/context/OrdersContext';

const PICKUP_SLOTS = ['10:00 AM break', '12:00 PM lunch', '3:00 PM merienda'];

export default function CartScreen() {
  const { addOrder } = useOrders();
  const { items, total, changeQty, clear } = useCart();
  const [slot, setSlot] = useState(PICKUP_SLOTS[0]);
  
  

  const placeOrder = () => {
    addOrder({
    status: 'Preparing',
    total,
    pickup_time: slot,
    items: items.map((i) => `${i.food.name} x${i.qty}`),
  });
    Alert.alert('Order placed', `Pick it up at the ${slot}.`);
    clear();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <Text style={styles.title}>Your cart</Text>

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.food.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.emoji}>{item.food.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.food.name}</Text>
              <Text style={styles.price}>{formatPeso(item.food.price * item.qty)}</Text>
            </View>
            <View style={styles.stepper}>
              <Pressable onPress={() => changeQty(item.food.id, -1)} style={styles.stepBtn}>
                <Ionicons name="remove" size={18} color={colors.primary} />
              </Pressable>
              <Text style={styles.qty}>{item.qty}</Text>
              <Pressable onPress={() => changeQty(item.food.id, 1)} style={styles.stepBtn}>
                <Ionicons name="add" size={18} color={colors.primary} />
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🥡</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>Add something from the menu to get started.</Text>
          </View>
        }
        ListFooterComponent={
          items.length > 0 ? (
            <View>
              <Text style={styles.sectionTitle}>Pickup time</Text>
              <View style={styles.slots}>
                {PICKUP_SLOTS.map((s) => (
                  <CategoryChip key={s} label={s} active={slot === s} onPress={() => setSlot(s)} />
                ))}
              </View>
            </View>
          ) : null
        }
      />

      {items.length > 0 && (
        <View style={styles.totalBar}>
          <View>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPeso(total)}</Text>
          </View>
          <Pressable style={styles.orderBtn} onPress={placeOrder}>
            <Text style={styles.orderText}>Place order</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: font.xl, fontWeight: '800', color: colors.text, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  list: { padding: spacing.lg, flexGrow: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  emoji: { fontSize: 34, marginHorizontal: spacing.sm },
  info: { flex: 1, marginHorizontal: spacing.sm },
  name: { fontSize: font.md, fontWeight: '700', color: colors.text },
  price: { fontSize: font.sm, fontWeight: '700', color: colors.primary, marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md },
  stepBtn: { padding: spacing.sm },
  qty: { minWidth: 24, textAlign: 'center', fontWeight: '700', color: colors.text },
  sectionTitle: { fontSize: font.md, fontWeight: '700', color: colors.text, marginTop: spacing.lg, marginBottom: spacing.md },
  slots: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.sm },
  empty: { alignItems: 'center', marginTop: spacing.xxl * 2 },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: font.lg, fontWeight: '700', color: colors.text, marginTop: spacing.md },
  emptyText: { fontSize: font.sm, color: colors.textMuted, marginTop: spacing.xs },
  totalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: { fontSize: font.xs, color: colors.textMuted },
  totalValue: { fontSize: font.lg, fontWeight: '800', color: colors.text },
  orderBtn: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.md + 2, paddingHorizontal: spacing.xl },
  orderText: { color: '#fff', fontSize: font.md, fontWeight: '700' },
});
