import { useState } from "react";
import Task, { TaskStatus } from "../model/Task";
import useError from "../hooks/useError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

interface FormProps {
    isInputFocus: boolean
    setInputFocus: (isInputFocus: boolean) => void
    handleClose: () => void
    task?: Task | null
}

export default function Form(props: FormProps) {
    const queryClient = useQueryClient()
    const { error, handleError: setError } = useError("")

    const [form, setForm] = useState(() => {
        return props.task || {
            title: "",
            description: "",
            status: TaskStatus.Pending,
            priority: 4,
        };
    });

    const addTaskMutation = useMutation({
        mutationFn: (newTask: Task) => api.addTask(newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["taskCount"] });
            setError("")
            props.handleClose()
        }
    });

    const updateTaskMutation = useMutation({
        mutationFn: (updatedTask: Task) => {
          if (!updatedTask.id) {
            setError("Task ID is required for update.");
          }
          return api.updateTask(updatedTask);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          setError("");
          props.handleClose();
        },
        onError: () => {
          setError("Failed to update task.");
        }
      });

    const handleSubmit = () => {
        if (!form.title || !form.description) {
            setError("Title and description are required.");
            return;
        }
        if (props.task?.id) {
            updateTaskMutation.mutate(form);
        } else {
            addTaskMutation.mutate(form);
        }
    };

    const handleInputChange = (field: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> // Aceita tanto input quanto select
    ) => {
        console.log("Atualizado...")
        setForm((prevForm) => ({
            ...prevForm,
            [field]: e.target.value,
        }));
    };

    return (
        <div className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                placeholder="Task name"
                value={form.title}
                onChange={handleInputChange("title")}
                className="w-full bg-neutral-800 opacity-50 focus:opacity-100 focus:outline-none rounded"
                onFocus={() => props.setInputFocus(true)}
                onBlur={() => props.setInputFocus(false)}
            />

            <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={handleInputChange("description")}
                className="w-full bg-neutral-800 opacity-50 focus:opacity-100 focus:outline-none rounded"
                onFocus={() => props.setInputFocus(true)}
                onBlur={() => props.setInputFocus(false)}
            />

            <div className="flex gap-4">
                <select
                    value={form.status}
                    onChange={handleInputChange("status")}
                    className="w-full bg-neutral-800 opacity-50 focus:opacity-100 py-2 border border-white focus:outline-none rounded"
                    onFocus={() => props.setInputFocus(true)}
                    onBlur={() => props.setInputFocus(false)}
                >
                    {Object.values(TaskStatus).map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>

                <select
                    value={form.priority}
                    onChange={handleInputChange("priority")}
                    className="w-full bg-neutral-800 opacity-50 focus:opacity-100 py-2 border border-white focus:outline-none rounded"
                    onFocus={() => props.setInputFocus(true)}
                    onBlur={() => props.setInputFocus(false)}
                >

                    <option key={1} value={1}>Urgent</option>
                    <option key={2} value={2}>High</option>
                    <option key={3} value={3}>Medium</option>
                    <option key={4} value={4}>Low</option>
                </select>
            </div>
            <hr className="mt-6 border-opacity-40" />
            <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={props.handleClose}
                    className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-sm"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded text-sm"
                >
                    {props.task?.id ? "Save Changes" : "Add Task"}
                </button>
            </div>
        </div>
    );
}