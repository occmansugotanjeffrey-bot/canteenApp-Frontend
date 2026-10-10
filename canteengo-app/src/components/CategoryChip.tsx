import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, font, radius, spacing } from '@/constants/theme';

type Props = { label: string; emoji?: string; active?: boolean; onPress: () => void };

export default function CategoryChip({ label, emoji, active = false, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.label, active && styles.labelActive]}>
        {emoji ? `${emoji} ${label}` : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { fontSize: font.sm, fontWeight: '600', color: colors.text },
  labelActive: { color: '#fff' },
});
