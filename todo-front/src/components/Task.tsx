import { IconEdit, IconTrash } from "../icons"

interface TaskProps {
    id: number
    title: string
    priority: number
}

export default function Task(props: TaskProps) {
    function handlePriority(): string {
        if(props.priority === 1) {
            return "bg-[#4B2E2C] border-[#FF7066]"
        } else if(props.priority === 2) {
            return "bg-[#4B371B] border-[#FF9A13]"
        } else if(props.priority === 3){
            return "bg-[#28364B] border-[#5297FF]"
        } else {
            return "border-white"
        }
    }

    return (
        <li key={props.id} className="group flex flex-col gap-2 mb-6 w-full cursor-pointer">
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <button className={`w-5 h-5 rounded-full border-2 ${handlePriority()}`}>
                    </button>
                    <span>{props.title}</span>
                </div>
                <div className="flex gap-3 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button>{IconEdit}</button>
                    <button>{IconTrash}</button>
                </div>
            </div>
            <hr className="bg-gray-100 opacity-25 w-full mt-4" />
        </li>
    )
}