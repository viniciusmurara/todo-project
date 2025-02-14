import Task from "./Task"

interface Task {
    id: number
    title: string
    description: string
    status: string
    priority: number
}

interface TasksProps {
    tasks: Task[]
    onDeleteTask: (id: number) => void
}

export default function Tasks({ tasks, onDeleteTask }: TasksProps) {
    return (
        <ul className="flex flex-col w-full">
            {tasks.map((task) => (
                <Task 
                    key={task.id} 
                    id={task.id} 
                    title={task.title} 
                    priority={task.priority} 
                    onDeleteTask={onDeleteTask} 
                />
            ))}
        </ul>
    )
}