import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

type IconName = React.ComponentProps<typeof Ionicons>['name'];
type TabBarIconProps = {
  focused: boolean;
  color: React.ComponentProps<typeof Ionicons>['color'];
  size: number;
};

const icon = (name: IconName) => ({ color, size }: TabBarIconProps) => (
  <Ionicons name={name} size={size} color={color} />
);

export default function TabLayout() {
  const { count } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarBadgeStyle: { backgroundColor: colors.accent, color: colors.accentText },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: icon('home') }} />
      <Tabs.Screen name="menu" options={{ title: 'Menu', tabBarIcon: icon('restaurant') }} />
      <Tabs.Screen name="stalls" options={{ title: 'Stalls', tabBarIcon: icon('storefront') }} />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: icon('cart'),
          tabBarBadge: count > 0 ? count : undefined,
        }}
      />
      <Tabs.Screen name="orders" options={{ title: 'Orders', tabBarIcon: icon('receipt') }} />
    </Tabs>
  );
}
