import Task from "../model/Task";

export const api = {
    getTasks: async (): Promise<Task[]> => {
      // simulando delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const resp = await fetch("http://localhost:8081/todo");
      return resp.json();
    },

    deleteTask: async (id: number): Promise<void> => {
        await fetch(`http://localhost:8081/todo/${id}`, { method: "DELETE" });
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