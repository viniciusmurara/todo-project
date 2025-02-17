import Task from "./Task"
import TaskModel from "../model/Task"

interface TasksProps {
    tasks: TaskModel[]
    onDeleteTask: (id: number) => void
}

export default function Tasks({ tasks, onDeleteTask }: TasksProps) {
    return (
        <ul className="flex flex-col w-full">
            {tasks.map((task) => (
                <Task 
                    key={task.id}
                    id={task.id ?? 0}
                    title={task.title} 
                    priority={task.priority} 
                    onDeleteTask={onDeleteTask} 
                />
            ))}
        </ul>
    )
}