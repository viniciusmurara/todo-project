import { IconCheck } from "./icons";
import Tasks from "./components/Tasks";
import Modal from "./components/Modal";
import Task from "./model/Task";
import useError from "./hooks/useError";
import { api } from "./api/api";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const { error, handleError: setError } = useError("")

  // GET COM REACT QUERY
  const { data, isLoading, isError } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: api.getTasks
  })

  return (
    <div className={`flex flex-col items-center justify-center px-24
    md:items-start md:justify-start md:min-h-screen md:px-32
    lg:px-60 2xl:px-96`}>
      <h1 className="text-3xl font-bold mt-12">Today's Tasks</h1>
      <div className="flex gap-2 items-center mt-3 mb-10">
        {IconCheck}
        <p className="text-md">{data ? data.length : 0} tasks</p>
      </div>

      {error && <p className="self-center mb-6 text-red-500">{error}</p>}

      <Tasks tasks={data ?? []} onError={setError}/>
      <Modal title="Add Task" buttonTitle="Add Task" />
    </div>
  );
}
