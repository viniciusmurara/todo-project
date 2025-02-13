import { useEffect, useState } from "react";
import { IconPlus, IconCheck } from "./icons";

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("http://localhost:8081/todo")
      const data = await resp.json()
      setTasks(data)
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col items-start justify-start min-h-screen px-96">
      <h1 className="text-3xl font-bold mt-12">Today's Tasks</h1>
      <div className="flex gap-2 items-center mt-3">
        {IconCheck}
        <p className="text-md">{tasks.length} tasks</p>
      </div>

      {/* Renderizar as tasks que estao no state e passar para o component Tasks */}

      <button className="flex gap-2 items-center mt-6 hover:text-red-600">
        {IconPlus}
        <p className="text-md"> Add tasks</p>
      </button>
    </div>
  );
}
