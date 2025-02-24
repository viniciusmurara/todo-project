import React, { useState } from 'react';
import { IconClose } from '../icons';
import Form from './Form';
import Task from '../model/Task';

interface ModalProps {
    type: "add" | "edit" | "delete"
    onClose: () => void
    task?: Task | null
    onDelete: (id: number) => void
}

export default function Modal({ type, onClose, task, onDelete }: ModalProps) {
    const [isInputFocus, setIsInputFocus] = useState(false);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    const handleConfirmDelete = () => {
        if (task?.id) {
            onDelete(task.id);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
            onClick={handleOverlayClick}>
            <div className={`flex flex-col bg-neutral-800 p-5 rounded-lg w-2/3 sm:w-1/2 xl:w-1/3 shadow-lg
                        ${isInputFocus ? "border border-white border-opacity-40" : ""}`}>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold">
                        {type === "add" && "Add Task"}
                        {type === "edit" && "Edit Task"}
                        {type === "delete" && "Delete Task"}
                    </h1>
                    <button onClick={onClose}>{IconClose}</button>
                </div>

                <hr className="mb-6" />
                {type === "delete" ? (
                    <div className="text-center">
                        <p className="mb-6">Are you sure you want to delete this task?</p>
                        <hr className="mt-6 border-opacity-40" />

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded text-sm"
                                onClick={handleConfirmDelete}
                            >
                                Delete Task
                            </button>
                        </div>
                    </div>
                ) : (
                    <Form
                        setInputFocus={setIsInputFocus}
                        onClose={onClose}
                        task={type === "edit" ? task : undefined}
                    />
                )}
            </div>
        </div>
    );
}