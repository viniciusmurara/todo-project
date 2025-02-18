import React, { useState } from 'react';
import { IconClose } from '../icons';
import Form from './Form';
import Task from '../model/Task';

interface ModalProps {
    onClose: () => void
    title: string
    task?: Task | null
}

export default function Modal({ onClose, title, task }: ModalProps) {
    const [isInputFocus, setIsInputFocus] = useState(false);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
            onClick={handleOverlayClick}
        >
            <div className={`flex flex-col bg-neutral-800 p-5 rounded-lg w-2/3 sm:w-1/2 xl:w-1/3 shadow-lg
                        ${isInputFocus ? "border border-white border-opacity-40" : ""}`}>

                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <button onClick={onClose}>
                        {IconClose}
                    </button>
                </div>
                <hr className="mb-6" />
                <Form
                    isInputFocus={isInputFocus}
                    setInputFocus={setIsInputFocus}
                    handleClose={onClose}
                    task={task}
                />
            </div>
        </div>
    );
}