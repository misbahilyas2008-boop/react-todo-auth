import React from "react";

const TodoList = ({ todos, toggleComplete, deleteTodo, onEdit }) => {
  if (!todos.length) {
    return (
      <div className="text-center text-gray-400 mt-6">
        No todos found. Add your first task!
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 w-200 m-auto">
      {todos.map((todo) => {
        const id = todo._id || todo.id;
        return (
          <div
            key={id}
            className={`bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center transition-all ${
              todo.completed ? "opacity-70" : ""
            }`}
          >
            {/* Left side: Task info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2
                  className={`text-lg font-semibold ${
                    todo.completed ? "line-through text-gray-400" : "text-white"
                  }`}
                >
                  {todo.text}
                </h2>

                {/* Priority badge vertically centered with text */}
                <span
                  className={`mr-2 flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                    todo.priority === "High"
                      ? "bg-red-500 text-white"
                      : todo.priority === "Medium"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {todo.priority}
                </span>
              </div>

              <p className="text-xs text-gray-400 mb-1">
                Category: {todo.category || "General"}
              </p>
              <p className="text-xs text-gray-400 mb-1">
                Due:{" "}
                {todo.dueDate
                  ? new Date(todo.dueDate).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "No due date"}
              </p>

              {todo.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 mb-1">
                  {todo.tags.map((tag) => (
                    <span
                      key={tag + id}
                      className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Buttons vertical stack */}
            <div className="flex flex-col gap-2 mt-3 md:mt-0 md:justify-center">
              <button
                onClick={() => toggleComplete(id)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  todo.completed
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {todo.completed ? "Done" : "Mark"}
              </button>
              <button
                onClick={() => onEdit(todo)}
                className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(id)}
                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
