import React, { useState, useCallback } from 'react';
import { IconPlus, IconClose } from '../icons';
import Form from './Form';

interface ModalProps {
    onClose?: () => void
    title: string
    buttonTitle: string
}

export default function Modal({ onClose, title, buttonTitle }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isInputFocus, setIsInputFocus] = useState(false);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }, [handleClose]);

    return (
        <div>
            {/* Botão para abrir o modal */}
            <button className="flex gap-2 items-center hover:text-red-500" onClick={handleOpen}>
                {IconPlus}
                <p className="text-md">{buttonTitle}</p>
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
                    onClick={handleOverlayClick}
                >
                    <div className={`flex flex-col bg-neutral-800 p-5 rounded-lg w-2/3 sm:w-1/2 xl:w-1/3 shadow-lg
                        ${isInputFocus ? "border border-white border-opacity-40" : ""}`}>

                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-semibold">{title}</h1>
                            <button onClick={handleClose}>
                                {IconClose}
                            </button>
                        </div>
                        <hr className="mb-6" />
                        <Form 
                            isInputFocus={isInputFocus} 
                            setInputFocus={setIsInputFocus} 
                            handleClose={handleClose}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}