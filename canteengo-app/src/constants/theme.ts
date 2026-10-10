// Design tokens for CanteenGo: ube purple + calamansi green-yellow.
// Change values here and every screen updates.

export const colors = {
  primary: '#5A3E9B',       // ube - buttons, active tab, headers
  primaryDark: '#3F2A75',
  primarySoft: '#EDE7F8',   // soft ube - chips, icon boxes
  accent: '#D3E33B',        // calamansi - price tags, deals
  accentText: '#2B3300',    // readable text on calamansi
  background: '#F6F4FB',
  surface: '#FFFFFF',
  text: '#1F1635',
  textMuted: '#756C8A',
  border: '#E6E0F2',
  success: '#2E9D63',
  warning: '#E8A12E',
  danger: '#D2412F',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const radius = { sm: 8, md: 12, lg: 18, pill: 999 };

export const font = { xs: 12, sm: 14, md: 16, lg: 20, xl: 28 };

export const shadow = {
  card: {
    shadowColor: '#3F2A75',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
};

export const formatPeso = (n: number) => `₱${Math.round(n)}`;
