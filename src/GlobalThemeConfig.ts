import type { ThemeConfig } from 'antd'
import { theme } from 'antd'
const { getDesignToken } = theme

export const config: ThemeConfig = {
  token: {
    colorPrimary: '#0554F2',
    colorBorder: '#EEE',
    colorBgLayout: '#F2F2F2',
    colorWhite: '#FFFFFF',
    'blue-1': '#010626',
    'blue-2': '#395BBF',
    'blue-3': '#1374F2'
  },
  components: {
    Layout: {
      colorBgHeader: '#010626'
    }
  }
}

export const globalToken = getDesignToken(config)
