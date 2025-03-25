import Task from "../model/Task";

export const todo = {
    getTasks: async (): Promise<Task[]> => {
      const resp = await fetch("http://localhost:8082/todo");
      return resp.json();
    },

    getTaskLength: async (): Promise<number> => {
      const resp = await fetch("http://localhost:8082/todo");
      const tasks = await resp.json();
      return tasks.length; 
  },

    deleteTask: async (id: number): Promise<void> => {
        await fetch(`http://localhost:8082/todo/${id}`, { method: "DELETE" });
    },
    
    addTask: async (task: Task): Promise<Task> => {
      const resp = await fetch("http://localhost:8082/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
      });
      return resp.json();
    },

    updateTask: async (task: Task): Promise<Task> => {
      const resp = await fetch(`http://localhost:8082/todo/${task.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
      });
      return resp.json();
    },

    updateTaskStatus: async (task: Task): Promise<Task> => {
      const resp = await fetch(`http://localhost:8082/todo/${task.id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: task.status })
      });
      return resp.json();
    },

    getTaskById: async (id: number): Promise<Task> => {
      const resp = await fetch(`http://localhost:8082/${id}`);
      return resp.json();
    }
  };