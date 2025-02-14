import { useState } from "react"

interface FormProps {
    isInputFocus: boolean
    setInputFocus: (isInputFocus: boolean) => void
}

export default function Form(props: FormProps) {
    const [title, setTitle] = useState<string>("")
    
    return (
        <div className="">
            <input 
                type="text" 
                placeholder="Task name" 
                onChange={e => setTitle(e.target.value)} 
                className="bg-neutral-800 opacity-50 focus:opacity-100 p-2 focus:outline-none"
                onFocus={() => props.setInputFocus(true)}
                onBlur={() => props.setInputFocus(false)}
                autoFocus // Foca automaticamente no input quando ele é renderizado
            />
            <div>{title}</div>
        </div>
    )
}