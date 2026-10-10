import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, formatPeso, radius, spacing } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import api from '@/services/api';


export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);


  const[foods, setFoods] = useState<any[]>([]);
      useEffect(() => {
        api
          .get('/foods')
          .then((response) => {
            setFoods(response.data);
          })
          
          .catch((error) => {
            console.error('Error fetching foods:', error);
            
          })
          .finally(() => {
            setLoading(false);
  });
      }, []);const food = foods.find((f) => f.id === Number(id));
  

  
  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Loading food details...</Text>
      </View>
    );
  }
  if (!food) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundTitle}>We couldn't find that item</Text>
        <Text style={styles.notFoundText}>It may have been removed from the menu.</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back to menu</Text>
        </Pressable>
      </View>
    );
  }

  const add = () => {
    addItem(food, qty);
    router.back();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{food.emoji}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.stall}>{food.stall} · {food.category}</Text>
        <View style={styles.priceTag}>
          <Text style={styles.price}>{formatPeso(food.price)}</Text>
        </View>
        <Text style={styles.desc}>{food.description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.stepper}>
          <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))} style={styles.stepBtn}>
            <Ionicons name="remove" size={20} color={colors.primary} />
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable onPress={() => setQty((q) => q + 1)} style={styles.stepBtn}>
            <Ionicons name="add" size={20} color={colors.primary} />
          </Pressable>
        </View>
        <Pressable style={[styles.button, styles.addButton]} onPress={add}>
          <Text style={styles.buttonText}>Add to cart · {formatPeso(food.price * qty)}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, padding: spacing.xl },
  notFoundTitle: { fontSize: font.lg, fontWeight: '700', color: colors.text },
  notFoundText: { fontSize: font.sm, color: colors.textMuted, marginVertical: spacing.sm },
  hero: {
    height: 220,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: radius.lg + 6,
    borderBottomRightRadius: radius.lg + 6,
  },
  heroEmoji: { fontSize: 110 },
  body: { flex: 1, padding: spacing.xl },
  name: { fontSize: font.xl, fontWeight: '800', color: colors.text },
  stall: { fontSize: font.sm, color: colors.textMuted, marginTop: spacing.xs },
  priceTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs + 2,
    marginTop: spacing.lg,
  },
  price: { fontSize: font.lg, fontWeight: '800', color: colors.accentText },
  desc: { fontSize: font.md, lineHeight: 24, color: colors.text, marginTop: spacing.lg },
  footer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.xl, paddingBottom: spacing.md },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepBtn: { padding: spacing.md },
  qty: { minWidth: 28, textAlign: 'center', fontSize: font.md, fontWeight: '700', color: colors.text },
  button: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.lg, paddingHorizontal: spacing.xl, alignItems: 'center' },
  addButton: { flex: 1, marginLeft: spacing.md },
  buttonText: { color: '#fff', fontSize: font.md, fontWeight: '700' },
});
