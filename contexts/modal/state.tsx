import { ModalContent, ModalContextState } from './index';
import { ReactNode, useState } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';

export const useModalContextState = (): ModalContextState => {
  const [modal, setModal] = useState<ReactNode | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const dismissModal = () => {
    setShowModal(false);
    setModal(undefined);
  }

  const populateModalContent = (modalContent: ModalContent) => {
    setShowModal(true);
    setModal(
      <>
        <Portal>
          <Dialog visible={ showModal } onDismiss={ dismissModal }>
            <Dialog.Title>
              { modalContent.title }
            </Dialog.Title>
            <Dialog.Content>
              { modalContent.content }
            </Dialog.Content>
            {
              modalContent.modalActions && (
                <Dialog.Actions>
                  <Button
                    mode="outlined"
                    style={ {
                      width: 100
                    } }
                    onPress={ () => modalContent.modalActions.confirm.onClick }>{ modalContent.modalActions.confirm.label }</Button>
                  <Button
                    style={ {
                      width: 100
                    } }
                    mode="contained"
                    onPress={ () => modalContent.modalActions.cancel.onClick }>{ modalContent.modalActions.cancel.label }</Button>
                </Dialog.Actions>
              )
            }
          </Dialog>
        </Portal>
      </>
    )
  }

  return {
    populateModalContent,
    dismissModal,
    modal,
    showModal,
  };
}