# Mini Project FE

### Component 생성

components 폴더 아래 작업할 page 폴더 생성 후 해당 page에서 사용하는 component 파일 추가

### Antd 커스텀 컬러 사용법

1. global token import

```
import { globalToken } from '@/globalThemeConfig'
```

2. globalToken에서 지정한 color key를 사용

```
<Sider
  style={{
     backgroundColor: globalToken['blue-3']
  }}>
 </Sider>
```

### Project 설정

#### Antd Global Style 적용

Primary Color와 팀에서 고른 테마 색상들 `blue-n` 으로 지정  
`globalToken.colorPrimary`로도 컬러 값 사용 가능

```
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
```

#### Styled-components Global Style 적용

#### Antd 기본 레이아웃 적용 완료

NavBar 있는 페이지들은 `NavLayout.tsx` 레이아웃 사용
