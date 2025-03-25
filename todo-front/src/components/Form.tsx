import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import Task, { TaskStatus } from "../model/Task";
import useError from "../hooks/useError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todo } from "../api/todo";

interface FormProps {
    setInputFocus: (isInputFocus: boolean) => void
    onClose: () => void
    task?: Task | null
    type: string
}

export default function Form({ setInputFocus, onClose, task, type }: FormProps) {
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
        mutationFn: (newTask: Task) => todo.addTask(newTask),
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
            return todo.updateTask(updatedTask);
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
        className: `w-full bg-neutral-800 focus:outline-none rounded
        ${type === "info" ? "opacity-100" : "opacity-50 focus:opacity-100"}`,
        onFocus: () => setInputFocus(true),
        onBlur: () => setInputFocus(false)
    });

    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        if (descriptionRef.current) {
            adjustHeight(descriptionRef.current);
        }
    }, [task]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {(error) && (
                <p className="text-red-500">{error}</p>
            )}

            <div>
                <h2 className="mb-2 text-sm opacity-50">Name:</h2>
                <input
                    {...inputProps("title")}
                    placeholder="Task name"
                    disabled={type === "info"}
                />
            </div>

            <div>
                <h2 className="mb-2 text-sm opacity-50">Description:</h2>
                <textarea
                    {...register("description")}
                    ref={(e) => {
                        const refHook = register("description").ref;
                        refHook(e);
                        descriptionRef.current = e;
                    }}
                    onInput={(e) => adjustHeight(e.currentTarget)}
                    placeholder="Description"
                    disabled={type === "info"}
                    className={`w-full bg-neutral-800 focus:outline-none rounded resize-none
                        ${type === "info" ? "opacity-100" : "opacity-50 focus:opacity-100"}`}
                    rows={1}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                />
            </div>

            <div className={`flex gap-4 ${type === "info" && "pb-1"}`}>
                <div className="w-full">
                    <h2 className="mb-2 text-sm opacity-50">Status:</h2>
                    <select
                        {...register("status")}
                        className={`w-full bg-neutral-800 py-2 border border-white focus:outline-none rounded
                            ${type === "info" ? "opacity-100 appearance-none pl-2" : "opacity-50 focus:opacity-100"}`}
                        disabled={type === "info"}
                    >
                        {Object.values(TaskStatus).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full">
                    <h2 className="mb-2 text-sm opacity-50">Priority:</h2>
                    <select
                        {...register("priority", { valueAsNumber: true })}
                        className={`w-full bg-neutral-800 py-2 border border-white focus:outline-none rounded
                            ${type === "info" ? "opacity-100 appearance-none pl-2" : "opacity-50 focus:opacity-100"}`}
                        disabled={type === "info"}
                    >
                        {[["Urgent", 1], ["High", 2], ["Medium", 3], ["Low", 4]].map(([label, value]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {type !== "info" && (
                <>
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
                </>
            )}
        </form>
    );
}