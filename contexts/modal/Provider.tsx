import { ReactNode } from 'react';
import { useModalContextState } from './state';
import { ModalContext } from './context';

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const modalState = useModalContextState();

  return (
    <ModalContext.Provider value={ modalState }>
      { children }
    </ModalContext.Provider>
  );
};
