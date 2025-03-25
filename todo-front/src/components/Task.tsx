import { IconEdit, IconTrash } from "../icons"
import { getPriorityClasses } from "../functions/priority"
import TaskModel, { TaskStatus } from "../model/Task"
import { IconCheck } from "../icons" 
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { todo } from "../api/todo"

interface TaskProps {
    task: TaskModel
    onError: (message: string) => void
    onEdit: (task: TaskModel) => void
    onDelete: (task: TaskModel) => void
    onInfo: (task: TaskModel) => void
}

export default function Task({ task, onError, onEdit, onDelete, onInfo }: TaskProps) {
    const priorityClasses = getPriorityClasses(task.priority);
    const queryClient = useQueryClient();

    const updateStatusMutation = useMutation({
        mutationFn: todo.updateTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    })
    
    function handleCompleteTask(task: TaskModel, e: React.MouseEvent) {
        e.stopPropagation();
        if (!task.id) {
            onError("Task not found.");
            return;
        }

        const updatedStatusTask = {
            ...task,
            status: task.status === TaskStatus.Completed ? TaskStatus.InProgress : TaskStatus.Completed
        }
        updateStatusMutation.mutate(updatedStatusTask);
    }

    function handleDeleteTask(e: React.MouseEvent) {
        e.stopPropagation();
        if (!task.id) {
            onError("Task not found.");
            return;
        }
        onDelete(task)
    }

    function handleEditTask(e: React.MouseEvent) {
        e.stopPropagation();
        const currentTask = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority
        }
        onEdit(currentTask)
    }

    function handleInfoTask(task: TaskModel) {
        if(!task.id) {
            onError("Task not found.");
            return;
        }
        onInfo(task)
    }

    return (
        <li key={task.id} className="group flex flex-col gap-2 mb-6 w-full cursor-pointer" onClick={() => handleInfoTask(task)}>
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <button 
                        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${priorityClasses.container}`}
                        onClick={(e) => handleCompleteTask(task, e)}
                    >
                        {task.status === TaskStatus.Completed && <IconCheck className={`${priorityClasses.icon}  stroke-2`}/>}
                    </button>
                    <span>{task.status === TaskStatus.Completed ? (
                        <s>{task.title}</s>
                    ) : task.title }</span>
                </div>
                <div className="flex gap-3 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => handleEditTask(e)}>{IconEdit}</button>
                    <button onClick={(e) => task.id !== undefined && handleDeleteTask(e)}>{IconTrash}</button>
                </div>
            </div>
            <hr className="bg-gray-100 opacity-25 w-full mt-4" />
        </li>
    )
}