import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addTask,
  updateTask,
  deleteTask,
  setFilter,
  Task,
} from "../store/features/tasks/tasksSlice";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import {
  PlusIcon,
  PencilIcon,
  TrashBinIcon,
  CheckCircleIcon,
  TimeIcon,
} from "../icons";

const TaskManagement = () => {
  const dispatch = useAppDispatch();
  const { tasks, filter } = useAppSelector((state) => state.tasks);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending" as Task["status"],
    priority: "medium" as Task["priority"],
    dueDate: "",
  });

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      dueDate: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTask) {
      dispatch(updateTask({ ...formData, id: editingTask.id }));
      setIsEditModalOpen(false);
      setEditingTask(null);
    } else {
      dispatch(addTask(formData));
      setIsAddModalOpen(false);
    }

    resetForm();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  const handleStatusChange = (task: Task, newStatus: Task["status"]) => {
    dispatch(updateTask({ ...task, status: newStatus }));
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-task-completed text-white";
      case "in-progress":
        return "bg-task-pending text-white";
      case "pending":
        return "bg-task-overdue text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-error-500 text-white";
      case "medium":
        return "bg-warning-500 text-white";
      case "low":
        return "bg-success-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  return (
    <>
      <PageMeta
        title="Task Management Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="Comprehensive task management system with CRUD operations powered by Redux Toolkit"
      />
      <PageBreadcrumb pageTitle="Task Management" />

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {taskStats.total}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Tasks
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-500/20">
              <CheckCircleIcon className="h-6 w-6 text-brand-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {taskStats.completed}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completed
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-100 dark:bg-success-500/20">
              <CheckCircleIcon className="h-6 w-6 text-success-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {taskStats.inProgress}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                In Progress
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-100 dark:bg-warning-500/20">
              <TimeIcon className="h-6 w-6 text-warning-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {taskStats.pending}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-100 dark:bg-error-500/20">
              <TimeIcon className="h-6 w-6 text-error-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 dark:border-gray-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Task Management
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage and track your tasks efficiently
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter Buttons */}
              <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                {(["all", "pending", "in-progress", "completed"] as const).map(
                  (filterOption) => (
                    <button
                      key={filterOption}
                      onClick={() => dispatch(setFilter(filterOption))}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        filter === filterOption
                          ? "bg-white text-brand-500 shadow-sm dark:bg-gray-700 dark:text-brand-400"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      }`}
                    >
                      {filterOption.charAt(0).toUpperCase() +
                        filterOption.slice(1).replace("-", " ")}
                    </button>
                  )
                )}
              </div>

              {/* Add Task Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircleIcon className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                {filter === "all"
                  ? "You haven't created any tasks yet. Click 'Add Task' to get started."
                  : `No ${filter.replace(
                      "-",
                      " "
                    )} tasks found. Try a different filter.`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                        {task.title}
                      </h4>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status.replace("-", " ")}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      <span>
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        Updated: {new Date(task.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {/* Status Change Dropdown */}
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(
                          task,
                          e.target.value as Task["status"]
                        )
                      }
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(task)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    >
                      <TrashBinIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Task Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-gray-900">
            <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as Task["status"],
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as Task["priority"],
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setEditingTask(null);
                    resetForm();
                  }}
                  className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-brand-500 py-2 text-sm font-medium text-white hover:bg-brand-600"
                >
                  {editingTask ? "Update" : "Create"} Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskManagement;
