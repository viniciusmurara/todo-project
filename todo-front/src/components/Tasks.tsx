
interface Task {
    id: number
    title: string
    description: string
    status: string
    priority: number
}

interface TasksProps {
    tasks: Task[]
}


export default function Tasks({ tasks }: TasksProps) {
    return (
        <ul className="flex flex-col">
            {tasks.map((task) => {
                return <li key={task.id}>{task.title}</li>
            })}
        </ul>
    )
}