import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Deal } from '@/types';
import { colors, font, radius, spacing } from '@/constants/theme';

export default function DealBanner({ deal }: { deal: Deal }) {
  return (
    <View style={styles.banner}>
      <View style={styles.price}>
        <Text style={styles.labelText}>{deal.price}</Text>
      </View>
      <Text style={styles.title}>{deal.title}</Text>
      <Text style={styles.desc}>{deal.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: 250,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginRight: spacing.md,
  },
  price: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    marginBottom: spacing.md,
  },
  labelText: { fontSize: font.sm, fontWeight: '800', color: colors.accentText },
  title: { fontSize: font.lg, fontWeight: '700', color: '#fff' },
  desc: { fontSize: font.sm, color: '#CFC4EA', marginTop: spacing.xs },
});
