import { useState } from "react";
import AddTodo from "../Components/AddTodo/AddTodo";
import TodoList from "../Components/TodoList/TodoList";
import DueDateModal from "../Components/DueDateModal/DueDateModal";
import useTodos from "../hooks/useTodos";

export default function TodosPage() {
  const { todos, loading, addTodo, updateTodo, deleteTodo, toggleComplete } =
    useTodos();

  // ----- Edit modal state -----
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal for editing
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  // Save after edit
  const handleSave = ({ dueAt, tags, priority }, text) => {
    if (!editingTodo) return;
    const id = editingTodo._id || editingTodo.id;

    updateTodo(id, {
      text,
      dueDate: dueAt,
      tags,
      priority,
    });

    setEditingTodo(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      {/* Add New Task Form */}
      <AddTodo onAddTodo={addTodo} loading={loading} />

      {/* Todos List */}
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        onEdit={handleEdit} // open modal for editing
      />

      {/* Edit Task Modal */}
      {isModalOpen && editingTodo && (
        <DueDateModal
          isOpen={isModalOpen}
          initialValue={editingTodo.dueDate}
          initialTags={editingTodo.tags}
          initialPriority={editingTodo.priority}
          initialText={editingTodo.text}
          onSave={(dueData) => handleSave(dueData, editingTodo.text)}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
