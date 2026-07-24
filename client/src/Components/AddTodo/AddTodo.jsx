import { useState } from "react";
import DueDateModal from "../DueDateModal/DueDateModal";
import Button from "../Button/Button";
import { FiPlus } from "react-icons/fi";

export default function AddTodo({
  onAddTodo,
  loading = false,
  initialTodo = null,
}) {
  const [text, setText] = useState(initialTodo?.text || "");
  const [dueDate, setDueDate] = useState(initialTodo?.dueDate || "");
  const [tags, setTags] = useState(initialTodo?.tags || []);
  const [isDueModalOpen, setIsDueModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter a task name for creating.");
      return;
    }

    setError("");

    if (!dueDate) {
      setIsDueModalOpen(true);
      return;
    }

    createTask(dueDate, tags);
  };

  const createTask = ({ dueAt, tags: selectedTags, priority }) => {
    if (!onAddTodo) return;

    const payload = {
      text: text.trim(),
      dueDate: dueAt,
      tags: selectedTags,
      priority,
    };

    console.log("📝 Sending payload:", payload);
    onAddTodo(payload);
    resetForm();
  };

  const resetForm = () => {
    setText("");
    setDueDate("");
    setTags([]);
    setError("");
  };

  const handleSaveModal = (isoWithPriority, selectedTags = []) => {
    setDueDate(isoWithPriority.dueAt);
    setTags(selectedTags);

    if (text.trim()) {
      createTask(isoWithPriority);
    }

    setIsDueModalOpen(false);
  };

  return (
    <div className="mb-6 w-full max-w-xl mx-auto">
      <form
        className="flex items-center gap-2 bg-gray-800 p-4 rounded-2xl shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={text}
          placeholder="✨ What's your next task?"
          onChange={(e) => setText(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border border-red-500" : ""
          }`}
        />

        <Button
          type="submit"
          variant="filled"
          leftIcon={<FiPlus />}
          disabled={loading}
          className="px-4 py-2 text-sm whitespace-nowrap"
        >
          🚀 Create
        </Button>
      </form>

      {/* Error message below form, full width */}
      {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}

      <DueDateModal
        isOpen={isDueModalOpen}
        initialValue={dueDate}
        initialTags={tags}
        onSave={handleSaveModal}
        onCancel={() => setIsDueModalOpen(false)}
      />
    </div>
  );
}
