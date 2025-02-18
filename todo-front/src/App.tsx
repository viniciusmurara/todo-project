import Tasks from "./components/Tasks";
import Task from "./model/Task";
import useError from "./hooks/useError";
import { api } from "./api/api";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoading from "./components/SkeletonLoading";
import { IconPlus, IconList } from "./icons";
import { useState } from "react";
import Modal from "./components/Modal";

export default function App() {
  const { error, handleError: setError } = useError("");
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const { data, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: api.getTasks,
  });

  function handleOpenModal(task: Task | null) {
    setEditingTask(task);
    setShowModal(true);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center px-24 pb-12
      md:items-start md:justify-start md:px-32 min-h-screen
      lg:px-60 2xl:px-96`}
    >
      {isLoading ? (
        <SkeletonLoading className="mt-12" />
      ) : (
        <>
          <h1 className="text-3xl font-bold mt-12">Today's Tasks</h1>
          <div className="flex gap-2 items-center mt-3 mb-10">
            {IconList}
            <p className="text-md">{data ? data.length : 0} tasks</p>
          </div>

          {error && <p className="self-center mb-6 text-red-500">{error}</p>}

          <Tasks 
            tasks={data ?? []} 
            onError={setError}
            onEditTask={handleOpenModal}
          />

          <button className="flex gap-2 items-center hover:text-red-500" onClick={() => handleOpenModal(null)}>
            {IconPlus}
            <p className="text-md">Add Task</p>
          </button>

          {showModal && (
            <Modal 
              title={editingTask ? "Edit Task" : "Add Task"} 
              onClose={() => setShowModal(false)}
              task={editingTask}
            />
          )}
        </>
      )}
    </div>
  );
}