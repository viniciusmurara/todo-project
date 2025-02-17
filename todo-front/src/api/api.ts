import Task from "../model/Task";

export const api = {
    getTasks: async (): Promise<Task[]> => {
      const resp = await fetch("http://localhost:8081/todo");
      return resp.json();
    },

    deleteTask: async (id: number): Promise<Response> => {
        const resp = await fetch(`http://localhost:8081/todo/${id}`, { method: "DELETE" });
        return resp.json()
    },
    
    addTask: async (task: Task): Promise<Task> => {
      const resp = await fetch("http://localhost:8081/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
      });
      return resp.json();
    }
  };