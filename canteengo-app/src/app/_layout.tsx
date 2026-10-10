import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from '@/context/CartContext';
import { OrdersProvider } from '@/context/OrdersContext';
import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <CartProvider>
      <OrdersProvider>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="food/[id]"
            options={{
              title: 'Food details',
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.text,
              headerShadowVisible: false,
            }}
          />
        </Stack>
      </OrdersProvider>
    </CartProvider>
  );
}