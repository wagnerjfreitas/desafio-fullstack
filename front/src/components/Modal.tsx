import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

export type ModalType = "info" | "warning" | "danger";

interface ModalProps {
    type?: ModalType
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    message: string;
}

export default function Modal({isOpen, closeModal, title, message, type = 'info'}: ModalProps) {

  const [modalType, setModalType] = useState<ModalType>('info')
  const [colorTitle, setColorTitle] = useState('text-indigo-600')
  const [colorButton, setColorButton] = useState('text-indigo-600')

  useEffect(() => {    
    setModalType(type)
  }, [])

  useEffect(() => {
    switch (modalType) {
      case 'info':
        setColorTitle('text-indigo-600')
        setColorButton('text-white bg-indigo-500 hover:bg-indigo-600 focus-visible:ring-blue-500')
        break;
      case 'danger':
        setColorTitle('text-red-500')
        setColorButton('text-white bg-red-400 hover:bg-red-500 focus-visible:ring-red-500')
        break;
      case 'warning':
        setColorTitle('text-orange-500')
        setColorButton('text-white bg-orange-500 hover:bg-orange-600 focus-visible:ring-orange-500')
        break;
      default:
        break;
    }
  }, [modalType])

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className={`text-lg font-medium leading-6 ${colorTitle}`}
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {message}
                    </p>
                  </div>

                  <div className="mt-4 text-end">
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent ${colorButton} px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                      onClick={closeModal}
                    >
                      Ok
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
