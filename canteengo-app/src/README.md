# CanteenGo UI (design layer)

Copy these folders into your Expo project (`canteengo-app`), merging with the template:

- `app/`        screens + navigation (replace the template's `app/_layout.tsx` and `app/(tabs)/_layout.tsx`)
- `components/` FoodCard, CategoryChip, StallCard, DealBanner
- `constants/`  theme.ts (colors, spacing), mockData.ts (temporary!)
- `context/`    CartContext.tsx
- `types/`      index.ts

Then:
1. Delete the template's leftover screens (e.g. `app/(tabs)/explore.tsx`) or an extra tab will appear.
2. Delete any template files that now clash (for example the old `app/(tabs)/index.tsx` gets replaced by ours).
3. Make sure `tsconfig.json` has the `@/*` path alias (the default Expo template already does).
4. Run: `npx expo install react-native-safe-area-context @expo/vector-icons expo-status-bar`
   (usually already installed) and `npx expo start`.

## Your part (not included on purpose)
Every `// TODO (YOU)` comment marks where mock data must be replaced by data from your
Laravel API using Axios. Put your Axios setup (base URL) in `services/api.ts`, which you create.
Delete `constants/mockData.ts` when done.
