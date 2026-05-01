import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Core
    text: '#d6dbe5',
    background: '#aac8f4', // soft light blue background

    // Primary (clean blue theme)
    tint: '#648eea',

    // UI surfaces
    card: '#ffffff',
    border: '#dbeafe',

    // Icons / navigation
    icon: '#64748b',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#2563eb',

    // Status
    success: '#16a34a',
    danger: '#ef4444',

    // Extra (charts + UI polish)
    chartLine: '#2563eb',
    chartFill: '#dbeafe',
  },

  dark: {
    // Core
    text: '#e5e7eb',
    background: '#1f2e4d', // deep navy blue

    // Primary
    tint: '#60a5fa',

    // UI surfaces
    card: '#111c33',
    border: '#1e293b',

    // Icons / navigation
    icon: '#94a3b8',
    tabIconDefault: '#64748b',
    tabIconSelected: '#60a5fa',

    // Status
    success: '#22c55e',
    danger: '#f87171',

    // Charts
    chartLine: '#60a5fa',
    chartFill: '#1e3a8a',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});