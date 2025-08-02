import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  tasks: Task[];
  filter: "all" | "pending" | "in-progress" | "completed";
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "Setup React Project",
      description:
        "Initialize a new React project with TypeScript and Tailwind CSS",
      status: "completed",
      priority: "high",
      dueDate: "2025-01-15",
      createdAt: "2025-01-10T10:00:00Z",
      updatedAt: "2025-01-12T14:30:00Z",
    },
    {
      id: "2",
      title: "Implement Task Management",
      description:
        "Create a comprehensive task management system with CRUD operations",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-01-20",
      createdAt: "2025-01-12T09:00:00Z",
      updatedAt: "2025-01-12T16:45:00Z",
    },
    {
      id: "3",
      title: "Design User Interface",
      description:
        "Create modern and responsive UI components using Tailwind CSS",
      status: "pending",
      priority: "medium",
      dueDate: "2025-01-25",
      createdAt: "2025-01-12T11:00:00Z",
      updatedAt: "2025-01-12T11:00:00Z",
    },
    {
      id: "4",
      title: "Write Unit Tests",
      description:
        "Implement comprehensive unit tests for all components and functions",
      status: "pending",
      priority: "medium",
      dueDate: "2025-01-30",
      createdAt: "2025-01-12T13:00:00Z",
      updatedAt: "2025-01-12T13:00:00Z",
    },
    {
      id: "5",
      title: "Deploy to Production",
      description:
        "Configure CI/CD pipeline and deploy the application to production",
      status: "pending",
      priority: "low",
      dueDate: "2025-02-05",
      createdAt: "2025-01-12T15:00:00Z",
      updatedAt: "2025-01-12T15:00:00Z",
    },
  ],
  filter: "all",
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<Omit<Task, "id" | "createdAt" | "updatedAt">>
    ) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.unshift(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<Partial<Task> & { id: string }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TasksState["filter"]>) => {
      state.filter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setFilter,
  setLoading,
  setError,
} = tasksSlice.actions;
export default tasksSlice.reducer;
