import { useForm } from "react-hook-form";
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
    
    const { register, handleSubmit, formState: { errors } } = useForm<Task>({
        defaultValues: props.task || {
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
            props.handleClose()
        },
        onError: () => setError("Failed to add task")
    });

    const updateTaskMutation = useMutation({
        mutationFn: (updatedTask: Task) => {
            if (!updatedTask.id) throw new Error("Task ID is required");
            return api.updateTask(updatedTask);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            props.handleClose();
        },
        onError: () => setError("Failed to update task")
    });

    const onSubmit = (data: Task) => {
        const taskData = props.task?.id 
            ? { ...data, id: props.task.id } 
            : data;

        const mutation = props.task?.id ? updateTaskMutation : addTaskMutation;
        mutation.mutate(taskData as Task);
    };

    const inputProps = (name: keyof Task) => ({
        ...register(name, { required: `${name} is required` }),
        className: "w-full bg-neutral-800 opacity-50 focus:opacity-100 focus:outline-none rounded",
        onFocus: () => props.setInputFocus(true),
        onBlur: () => props.setInputFocus(false)
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {(error || errors.root) && (
                <p className="text-red-500">{error || errors.root?.message}</p>
            )}

            <div>
                <input
                    {...inputProps("title")}
                    placeholder="Task name"
                    aria-invalid={!!errors.title}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
            </div>

            <div>
                <input
                    {...inputProps("description")}
                    placeholder="Description"
                    aria-invalid={!!errors.description}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
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
                    onClick={props.handleClose}
                    className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-sm"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded text-sm"
                >
                    {props.task?.id ? "Save Changes" : "Add Task"}
                </button>
            </div>
        </form>
    );
}