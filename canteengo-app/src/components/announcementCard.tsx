import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Announcement } from '@/types';
import { colors, font, radius, spacing } from '@/constants/theme';

export default function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <View style={styles.card}>
      <Ionicons name="megaphone-outline" size={22} color={colors.primary} />
      <View style={styles.text}>
        <Text style={styles.title}>{announcement.title}</Text>
        <Text style={styles.message}>{announcement.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderLeftWidth: 5,
    borderLeftColor: colors.accent,
    padding: spacing.md,
  },
  text: { flex: 1, marginLeft: spacing.md },
  title: { fontSize: font.md, fontWeight: '700', color: colors.text },
  message: { fontSize: font.sm, color: colors.textMuted, marginTop: 2 },
});