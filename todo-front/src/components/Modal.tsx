import React, { useState, useCallback } from 'react';
import { IconPlus, IconClose } from '../icons';
import Form from './Form';

interface ModalProps {
    onClose?: () => void; // Função opcional para ser chamada ao fechar o modal
}

export default function Modal({ onClose }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isInputFocus, setIsInputFocus] = useState(false);

    // Função para abrir o modal
    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    // Função para fechar o modal
    const handleClose = useCallback(() => {
        setIsOpen(false);
        if (onClose) {
            onClose(); // Chama a função onClose, se fornecida
        }
    }, [onClose]);

    // Função para fechar o modal ao clicar fora
    const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }, [handleClose]);

    return (
        <div>
            {/* Botão para abrir o modal */}
            <button className="flex gap-2 items-center hover:text-red-600" onClick={handleOpen}>
                {IconPlus}
                <p className="text-md">Add tasks</p>
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
                    onClick={handleOverlayClick} // Fecha o modal ao clicar fora
                >
                    <div className={`flex flex-col bg-neutral-800 p-5 rounded-lg w-96 shadow-lg
                        ${isInputFocus ? "border border-white border-opacity-40" : ""}`}>

                        <div className="flex items-center justify-end">
                            <button onClick={handleClose}>
                                {IconClose}
                            </button>
                        </div>
                        <Form isInputFocus={isInputFocus} setInputFocus={setIsInputFocus} />

                    </div>
                </div>
            )}
        </div>
    );
}