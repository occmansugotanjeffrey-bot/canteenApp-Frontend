import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stall } from '@/types';
import { colors, font, radius, shadow, spacing } from '@/constants/theme';

export default function StallCard({ stall }: { stall: Stall }) {
  return (
    <View style={styles.card}>
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{stall.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{stall.name}</Text>
        <Text style={styles.specialty}>{stall.specialty}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={styles.meta}>{stall.location}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.meta}>{stall.hours}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  emojiBox: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 28 },
  info: { flex: 1, marginLeft: spacing.lg },
  name: { fontSize: font.md, fontWeight: '700', color: colors.text },
  specialty: { fontSize: font.sm, color: colors.primary, fontWeight: '600', marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  meta: { fontSize: font.xs, color: colors.textMuted, marginLeft: spacing.xs },
});
