import { create } from 'zustand'
import { ICommonModal } from 'types/index'

interface IModalProps {
  isOpen: boolean
  type: number
  title: string
  content: JSX.Element | string
  okButton: string
  okCallback: () => void
  cancelButton?: string
  cancelCallback?: () => void
}

const defaultModalProps = {
  isOpen: false,
  type: 1,
  title: '',
  content: '',
  okButton: '확인',
  okCallback: () => {}
} as IModalProps

interface IModalState {
  modal: IModalProps
  openModal: (props: ICommonModal) => void
  closeModal: () => void
}

export const modalStore = create<IModalState>(set => ({
  modal: defaultModalProps,
  openModal: props => set({ modal: { isOpen: true, ...props } }),
  closeModal: () => set(state => ({ modal: { ...state.modal, isOpen: false } }))
}))
