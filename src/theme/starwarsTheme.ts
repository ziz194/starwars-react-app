import { theme } from 'antd';

export const starwarsTheme = {
  algorithm: theme.darkAlgorithm,

  token: {
    // Core colors
    colorPrimary: '#FFD700', // lightsaber gold
    colorInfo: '#00E5FF', // hologram blue
    colorSuccess: '#2ECC71',
    colorWarning: '#FF6F00',
    colorError: '#FF3B3B', // Sith red

    // Backgrounds
    colorBgBase: '#000', // deep space
    colorBgContainer: '#111827', // panels
    colorBgElevated: '#161B22',

    // Text
    colorTextBase: '#E5E7EB',
    colorTextSecondary: '#9CA3AF',

    // Borders & radius
    borderRadius: 6,
    colorBorder: '#2A2F3A',
    colorLink: '#FFD700', // gold
    colorLinkHover: '#ffecb4',
    colorLinkActive: '#FFC300',

    // Font
    fontFamily: "'Orbitron', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  components: {
    Button: {
      colorPrimary: '#FFD700',
      colorPrimaryHover: '#FFE066',
      colorPrimaryActive: '#FFC300',
      boxShadow: '0 0 12px rgba(255, 215, 0, 0.4)',
    },

    Card: {
      colorBgContainer: '#0F172A',
    },

    Layout: {
      headerBg: '#000000',
      bodyBg: '#000000',
      triggerBg: '#000000',
      siderBg: '#000000',
    },

    Menu: {
      darkItemBg: '#000000',
      darkSubMenuItemBg: '#000000',
      darkItemColor: '#9CA3AF',
      darkItemHoverColor: '#FFD700',
      darkItemSelectedColor: '#FFD700',
      darkItemSelectedBg: '#111111',
    },

    Input: {
      colorBgContainer: '#020617',
      colorBorder: '#1F2937',
    },
  },
};
