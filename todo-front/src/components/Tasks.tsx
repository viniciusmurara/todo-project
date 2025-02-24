import Task from "./Task"
import TaskModel from "../model/Task"

interface TasksProps {
    tasks: TaskModel[]
    onError: (message: string) => void
    onEdit: (task: TaskModel) => void
    onDelete: (task: TaskModel) => void
}

export default function Tasks({ tasks, onError, onEdit, onDelete }: TasksProps) {
    return (
        <ul className="flex flex-col w-full">
            {tasks.map((task) => (
                <Task 
                    key={task.id}
                    task={task}
                    onError={onError}
                    onEdit={() => onEdit(task)}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}