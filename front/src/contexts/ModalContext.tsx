
import Modal, { ModalType } from "@/components/Modal";
import { ReactNode, createContext, useState } from "react";

  export interface ModalContextType {
    handleOpenModal: (title: string, message: string, type?: ModalType) => void;
  }

  interface ModalContextProviderProps {
    children: ReactNode;
  }

export const ModalContext = createContext({} as ModalContextType);

export function ModalContextProvider({children}: ModalContextProviderProps){

  const [isOpenModal, setIsOpenModal] = useState(false) 
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [modalType, setModalType] = useState<ModalType>('info')   
  
  function handleCloseModal() {
    setIsOpenModal(false)
  }

  function handleOpenModal(title: string, message: string, type: ModalType = 'info') {
    setModalType(type)
    setModalTitle(title)
    setModalMessage(message)
    setIsOpenModal(true)
  }

    return (
        <ModalContext.Provider value={{handleOpenModal}}>
          <Modal type={modalType} closeModal={handleCloseModal} title={modalTitle} message={modalMessage} isOpen={isOpenModal} />
          {children}
        </ModalContext.Provider>
    )
}