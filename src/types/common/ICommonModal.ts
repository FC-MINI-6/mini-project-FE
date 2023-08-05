export interface ICommonModal {
  type: number // 0: 버튼 2개 , 1: 버튼 1개
  title: string
  content: JSX.Element | string
  okButton: string
  okCallback: () => void
  cancelButton?: string
  cancelCallback?: () => void
}
