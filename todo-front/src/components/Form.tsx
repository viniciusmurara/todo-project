import { useForm } from "react-hook-form";
import Task, { TaskStatus } from "../model/Task";
import useError from "../hooks/useError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

interface FormProps {
    setInputFocus: (isInputFocus: boolean) => void
    onClose: () => void
    task?: Task | null
}

export default function Form({ setInputFocus, onClose, task }: FormProps) {
    const queryClient = useQueryClient()
    const { error, handleError: setError } = useError("")
    
    const { register, handleSubmit } = useForm<Task>({
        defaultValues: task || {
            title: "",
            description: "",
            status: TaskStatus.Pending,
            priority: 4,
        }
    });

    const addTaskMutation = useMutation({
        mutationFn: (newTask: Task) => api.addTask(newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["taskCount"] });
            onClose()
        },
        onError: () => setError("Failed to add task.")
    });

    const updateTaskMutation = useMutation({
        mutationFn: (updatedTask: Task) => {
            if (!updatedTask.id) throw new Error("Task ID is required");
            return api.updateTask(updatedTask);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            onClose();
        },
        onError: () => setError("Failed to update task.")
    });

    const onSubmit = (data: Task) => {
        if (!data.title) {
            setError("Title is required")
            return
        }
        if (!data.description) {
            setError("Description is required")
            return
        }

        const taskData = task?.id ? { ...data, id: task.id } : data

        const mutation = task?.id ? updateTaskMutation : addTaskMutation
        mutation.mutate(taskData as Task)
    }

    const inputProps = (name: keyof Task) => ({
        ...register(name),
        className: "w-full bg-neutral-800 opacity-50 focus:opacity-100 focus:outline-none rounded",
        onFocus: () => setInputFocus(true),
        onBlur: () => setInputFocus(false)
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {(error) && (
                <p className="text-red-500">{error}</p>
            )}

            <div>
                <input
                    {...inputProps("title")}
                    placeholder="Task name"
                />
            </div>

            <div>
                <input
                    {...inputProps("description")}
                    placeholder="Description"
                />
            </div>

            <div className="flex gap-4">
                <select
                    {...register("status")}
                    className="w-full bg-neutral-800 opacity-50 focus:opacity-100 py-2 border border-white focus:outline-none rounded"
                >
                    {Object.values(TaskStatus).map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>

                <select
                    {...register("priority", { valueAsNumber: true })}
                    className="w-full bg-neutral-800 opacity-50 focus:opacity-100 py-2 border border-white focus:outline-none rounded"
                >
                    {[["Urgent", 1], ["High", 2], ["Medium", 3], ["Low", 4]].map(([label, value]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>

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
                >
                    {task?.id ? "Save Changes" : "Add Task"}
                </button>
            </div>
        </form>
    );
}