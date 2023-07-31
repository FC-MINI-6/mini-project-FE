import type { ThemeConfig } from 'antd'
import { theme } from 'antd'
const { getDesignToken } = theme

export const config: ThemeConfig = {
  token: {
    colorPrimary: '#0554F2',
    colorBorder: '#DDD',
    colorBgLayout: '#F2F2F2',
    colorWhite: '#FFFFFF',
    'blue-1': '#010626',
    'blue-2': '#395BBF',
    'blue-3': '#1374F2',
    'green-1': '#29b475',
    'red-1': '#dc3545',
    'yellow-1': '#ffc107',
    'purple-1': '#685efc'
  },
  components: {
    Layout: {
      colorBgHeader: '#010626'
    },
    Calendar: {
      colorPrimary: '#29b475',
      itemActiveBg: '#d4f0e3'
    }
  }
}

export const globalToken = getDesignToken(config)
