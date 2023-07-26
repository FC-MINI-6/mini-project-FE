# Mini Project FE

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
