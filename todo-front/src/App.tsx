import { useEffect, useState } from "react";
import { IconPlus, IconCheck } from "./icons";
import Tasks from "./components/Tasks";

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
    <div className={`flex flex-col items-center justify-center px-24
    md:items-start md:justify-start md:min-h-screen md:px-32
    lg:px-60 2xl:px-96`}>
      <h1 className="text-3xl font-bold mt-12">Today's Tasks</h1>
      <div className="flex gap-2 items-center mt-3 mb-10">
        {IconCheck}
        <p className="text-md">{tasks.length} tasks</p>
      </div>

      {/* Renderizar as tasks que estao no state e passar para o component Tasks */}
      <Tasks tasks={tasks} />
      
      <button className="flex gap-2 items-center hover:text-red-600">
        {IconPlus}
        <p className="text-md">Add tasks</p>
      </button>
    </div>
  );
}
