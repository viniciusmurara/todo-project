import Task from "../model/Task";

export const api = {
    getTasks: async (): Promise<Task[]> => {
      const resp = await fetch("http://localhost:8081/todo");
      return resp.json();
    },

    getTaskLength: async (): Promise<number> => {
      const resp = await fetch("http://localhost:8081/todo");
      const tasks = await resp.json();
      return tasks.length; 
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
    },

    updateTask: async (task: Task): Promise<Task> => {
      const resp = await fetch(`http://localhost:8081/todo/${task.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
      });
      return resp.json();
    }
  };