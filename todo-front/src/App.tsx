import { IconCheck } from "./icons";
import Tasks from "./components/Tasks";
import Modal from "./components/Modal";
import Task from "./model/Task";
import useError from "./hooks/useError";
import { api } from "./api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function App() {
  const { error, handleError: setError } = useError("")
  const queryClient = useQueryClient()

  // GET COM REACT QUERY
  const { data, isLoading, isError } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: api.getTasks
  })

  // DELETE COM REACT QUERY
  const deleteTaskMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: (_, id) => {
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks) =>
        oldTasks?.filter((task) => task.id !== id)
      );
      setError("");
    },
    onError: () => {
      setError("Failed to delete task.");
    },
  });

  function handleDeleteTask(id: number) {
    deleteTaskMutation.mutate(id);
  }

  return (
    <div className={`flex flex-col items-center justify-center px-24
    md:items-start md:justify-start md:min-h-screen md:px-32
    lg:px-60 2xl:px-96`}>
      <h1 className="text-3xl font-bold mt-12">Today's Tasks</h1>
      <div className="flex gap-2 items-center mt-3 mb-10">
        {IconCheck}
        <p className="text-md">{data?.length} tasks</p>
      </div>

      {error && <p className="self-center mb-6 text-red-500">{error}</p>}

      <Tasks tasks={data ?? []} onDeleteTask={handleDeleteTask} />
      <Modal title="Add Task" buttonTitle="Add Task" />
    </div>
  );
}
