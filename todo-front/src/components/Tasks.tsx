import Task from "./Task"
import TaskModel from "../model/Task"

interface TasksProps {
    tasks: TaskModel[]
    onError: (message: string) => void
    onEditTask: (task: TaskModel) => void
}

export default function Tasks({ tasks, onError, onEditTask }: TasksProps) {
    return (
        <ul className="flex flex-col w-full">
            {tasks.map((task) => (
                <Task 
                    key={task.id}
                    task={task}
                    onError={onError}
                    onEditTask={() => onEditTask(task)}
                />
            ))}
        </ul>
    )
}