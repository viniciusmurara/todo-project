export enum TaskStatus {
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed",
}

export default interface Task {
    id?: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: number;
}