import Task from "./Task"
import TaskModel from "../model/Task"

interface TasksProps {
    tasks: TaskModel[]
    onError: (message: string) => void
}

export default function Tasks({ tasks, onError }: TasksProps) {
    return (
        <ul className="flex flex-col w-full">
            {tasks.map((task) => (
                <Task 
                    key={task.id}
                    id={task.id ?? 0}
                    title={task.title} 
                    priority={task.priority}
                    onError={onError}
                />
            ))}
        </ul>
    )
}