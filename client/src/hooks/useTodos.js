import { useState, useEffect } from "react";
import API from "../api/axios";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await API.get("/todos");
      setTodos(res.data.data || []);
    } catch (err) {
      console.error("Fetch todos error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add todo
  const addTodo = async (payload) => {
    setLoading(true);
    try {
      const res = await API.post("/todos", payload);
      setTodos((prev) => [res.data.data, ...prev]);
    } catch (err) {
      console.error("Add todo error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    setLoading(true);
    try {
      const res = await API.put(`/todos/${id}`, updates);
      setTodos((prev) =>
        prev.map((t) => (t._id === id || t.id === id ? res.data.data : t))
      );
    } catch (err) {
      console.error("Update todo error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await API.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id && t.id !== id));
    } catch (err) {
      console.error("Delete todo error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete
  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t._id === id || t.id === id);
    if (!todo) return;
    try {
      const res = await API.put(`/todos/${id}`, { completed: !todo.completed });
      setTodos((prev) =>
        prev.map((t) => (t._id === id || t.id === id ? res.data.data : t))
      );
    } catch (err) {
      console.error(
        "Toggle complete error:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, addTodo, updateTodo, deleteTodo, toggleComplete };
}
