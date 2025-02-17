import { IconEdit, IconTrash } from "../icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../api/api"

interface TaskProps {
    id: number
    title: string
    priority: number
    onError: (message: string) => void
}

export default function Task(props: TaskProps) {
    const queryClient = useQueryClient()
    
    const deleteTaskMutation = useMutation({
        mutationFn: api.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            props.onError("")
        }, onError: () => {
            props.onError("Failed to delete task.")
        }
    });

    // Função para adicionar a tarefa
    const handleDeleteTask = (id: number) => {
        if (!props.id) {
            props.onError("Task not found.");
            return;
        }
        deleteTaskMutation.mutate(id);
    };

    function handlePriority(): string {
        if (props.priority === 1) {
            return "bg-[#4B2E2C] border-[#FF7066]"
        } else if (props.priority === 2) {
            return "bg-[#4B371B] border-[#FF9A13]"
        } else if (props.priority === 3) {
            return "bg-[#28364B] border-[#5297FF]"
        } else {
            return "border-white"
        }
    }

    return (
        <li key={props.id} className="group flex flex-col gap-2 mb-6 w-full cursor-pointer">
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <button className={`w-5 h-5 rounded-full border-2 ${handlePriority()}`} />
                    <span>{props.title}</span>
                </div>
                <div className="flex gap-3 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button>{IconEdit}</button>
                    <button onClick={() => handleDeleteTask(props.id)}>{IconTrash}</button>
                </div>
            </div>
            <hr className="bg-gray-100 opacity-25 w-full mt-4" />
        </li>
    )
}