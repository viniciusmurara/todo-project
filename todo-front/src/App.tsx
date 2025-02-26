import Tasks from "./components/Tasks";
import Task from "./model/Task";
import useError from "./hooks/useError";
import { api } from "./api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SkeletonLoading from "./components/SkeletonLoading";
import { IconPlus, IconList } from "./icons";
import { useState } from "react";
import Modal from "./components/Modal";

export default function App() {
  const { error, handleError: setError } = useError("")
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: api.getTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setShowModal(false);
    },
    onError: () => setError("Failed to delete task")
  });

  const handleConfirmDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  function handleOpenAddModal() {
    setModalType("add");
    setSelectedTask(null);
    setShowModal(true);
  }

  function handleOpenEditModal(task: Task) {
    setModalType("edit");
    setSelectedTask(task);
    setShowModal(true);
  }

  function handleOpenDeleteModal(task: Task) {
    setModalType("delete");
    setSelectedTask(task);
    setShowModal(true);
  }

  return (
    <div
      className={`flex flex-col items-center px-24 pb-12 min-h-screen
      md:items-start md:px-32 lg:px-60 2xl:px-96`}
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
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />

          <button className="flex gap-2 items-center hover:text-red-500" onClick={handleOpenAddModal}>
            {IconPlus}
            <p className="text-md">Add Task</p>
          </button>

          {showModal && (
            <Modal 
              type={modalType}
              onClose={() => setShowModal(false)}
              task={selectedTask}
              onDelete={handleConfirmDelete}
            />
          )}
        </>
      )}
    </div>
  );
}