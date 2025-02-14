import { useEffect, useState } from "react";
import { IconCheck } from "./icons";
import Tasks from "./components/Tasks";
import Modal from "./components/Modal";

export default function App() {
  const [tasks, setTasks] = useState<any[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("http://localhost:8081/todo")
      const data = await resp.json()
      setTasks(data)
    }
    fetchData()
  }, [])

  function handleAddTask(newTask: any) {
    setTasks((prev) => [...prev, newTask])
  }

  async function handleDeleteTask(id: number) {
    try {
      const resp = await fetch(`http://localhost:8081/todo/${id}`, {
        method: 'DELETE'
      })

      if (!resp.ok) {
        setError("Failed to delete task.")
      }

      setTasks((prev) => prev.filter((task) => task.id !== id))
      setError("")
    } catch (error) {
      setError("Failed to delete task.")
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center px-24
    md:items-start md:justify-start md:min-h-screen md:px-32
    lg:px-60 2xl:px-96`}>
      <h1 className="text-3xl font-bold mt-12">Today's Tasks</h1>
      <div className="flex gap-2 items-center mt-3 mb-10">
        {IconCheck}
        <p className="text-md">{tasks.length} tasks</p>
      </div>

      {error && <p className="self-center mb-6 text-red-500">{error}</p>}

      <Tasks tasks={tasks} onDeleteTask={handleDeleteTask} />

      <Modal title="Add Task" buttonTitle="Add Task" onAddTask={handleAddTask} />
    </div>
  );
}
