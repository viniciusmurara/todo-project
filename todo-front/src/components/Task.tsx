import { IconEdit, IconTrash } from "../icons"
import { getPriorityClasses } from "../functions/priority"
import TaskModel, { TaskStatus } from "../model/Task"
import { IconCheck } from "../icons" 
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../api/api"

interface TaskProps {
    task: TaskModel
    onError: (message: string) => void
    onEdit: (task: TaskModel) => void
    onDelete: (task: TaskModel) => void
}

export default function Task({task, onError, onEdit, onDelete}: TaskProps) {
    const priorityClasses = getPriorityClasses(task.priority);
    const queryClient = useQueryClient();

    const updateStatusMutation = useMutation({
        mutationFn: api.updateTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    })
    
    function handleCompleteTask(task: TaskModel) {
        if (!task.id) {
            onError("Task not found.");
            return;
        }

        const updatedTask = {
            ...task,
            status: task.status === TaskStatus.Completed ? TaskStatus.InProgress : TaskStatus.Completed
        }

        updateStatusMutation.mutate(updatedTask);
    }

    function handleDeleteTask() {
        if (!task.id) {
            onError("Task not found.");
            return;
        }
        onDelete(task)
    };

    function handleEditTask() {
        const currentTask = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority
        }
        onEdit(currentTask)
    }

    return (
        <li key={task.id} className="group flex flex-col gap-2 mb-6 w-full cursor-pointer">
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <button 
                        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${priorityClasses.container}`}
                        onClick={() => handleCompleteTask(task)}
                    >
                        {task.status === TaskStatus.Completed && <IconCheck className={`${priorityClasses.icon}  stroke-2`}/>}
                    </button>
                    <span>{task.status === TaskStatus.Completed ? (
                        <s>{task.title}</s>
                    ) : task.title }</span>
                </div>
                <div className="flex gap-3 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={handleEditTask}>{IconEdit}</button>
                    <button onClick={() => task.id !== undefined && handleDeleteTask()}>{IconTrash}</button>
                </div>
            </div>
            <hr className="bg-gray-100 opacity-25 w-full mt-4" />
        </li>
    )
}