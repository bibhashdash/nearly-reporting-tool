import { createContext, ReactNode, useContext } from 'react';

export interface ModalActions {
  label: string,
  onClick: () => void,
}
export interface ModalActionButtons {
  confirm: ModalActions,
  cancel: ModalActions,
}
export interface ModalContent {
  title: string,
  content: ReactNode,
  modalActions: ModalActionButtons,
//   ModalActions could probably be an array of buttons so that we can have multiple actions
}
export interface ModalContextState {
  populateModalContent: (modalContent: ModalContent) => void,
  dismissModal: () => void,
  modal: ReactNode | undefined,
  showModal: boolean,
}
export const ModalContext = createContext<ModalContextState>({
  populateModalContent: () => {},
  dismissModal: () => {},
  modal: undefined,
  showModal: false,
});

export function useModal() {
  return useContext(ModalContext);
}