import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Food } from '@/types';
import { colors, font, formatPeso, radius, shadow, spacing } from '@/constants/theme';

type Props = { food: Food; onPress: () => void; onAdd: () => void };

export default function FoodCard({ food, onPress, onAdd }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{food.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{food.name}</Text>
        <Text style={styles.stall} numberOfLines={1}>{food.stall}</Text>
        <View style={styles.priceTag}>
          <Text style={styles.price}>{formatPeso(food.price)}</Text>
        </View>
      </View>

      <Pressable onPress={onAdd} style={styles.addBtn} hitSlop={8} accessibilityLabel={`Add ${food.name} to cart`}>
        <Ionicons name="add" size={22} color="#fff" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  pressed: { opacity: 0.92 },
  emojiBox: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 32 },
  info: { flex: 1, marginHorizontal: spacing.md },
  name: { fontSize: font.md, fontWeight: '700', color: colors.text },
  stall: { fontSize: font.xs, color: colors.textMuted, marginTop: 2 },
  priceTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.sm,
  },
  price: { fontSize: font.sm, fontWeight: '800', color: colors.accentText },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
