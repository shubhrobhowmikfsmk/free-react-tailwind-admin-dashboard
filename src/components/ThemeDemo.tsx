import React from "react";

const ThemeDemo = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white">
        Custom Theme Demonstration
      </h3>

      <div className="space-y-6">
        {/* Task Management Colors */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Management Theme
          </h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-task-primary mb-2"></div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Primary
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-task-completed mb-2"></div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Completed
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-task-pending mb-2"></div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Pending
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-task-overdue mb-2"></div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Overdue
              </p>
            </div>
          </div>
        </div>

        {/* Post Colors */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Posts Theme
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-post-primary mb-2"></div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Primary
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-post-secondary mb-2"></div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Secondary
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-post-accent mb-2"></div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Accent</p>
            </div>
          </div>
        </div>

        {/* Example Usage */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Example Components
          </h4>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-task-primary px-4 py-2 text-white hover:bg-task-primary/90 transition-colors">
              Task Primary Button
            </button>
            <button className="w-full rounded-lg bg-post-accent px-4 py-2 text-white hover:bg-post-accent/90 transition-colors">
              Post Accent Button
            </button>
            <div className="rounded-lg border-2 border-task-completed bg-task-completed/10 p-3">
              <p className="text-task-completed font-medium">
                Task Completed State
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Usage Examples
          </h4>
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {`<!-- Task Management Colors -->
<div className="bg-task-primary text-white">Primary</div>
<div className="bg-task-completed text-white">Completed</div>
<div className="bg-task-pending text-white">Pending</div>

<!-- Post Colors -->
<div className="bg-post-primary text-white">Primary</div>
<div className="bg-post-accent text-white">Accent</div>

<!-- Brand Colors (Default) -->
<div className="bg-brand-500 text-white">Brand</div>
<div className="bg-success-500 text-white">Success</div>`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;
