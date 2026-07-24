import { useState, useEffect } from "react";
import { getUserBooks, createBook, updateBook, deleteBook } from "../api/axios";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await getUserBooks();
      setBooks(res.data.data || res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new book
  const addBook = async (data) => {
    try {
      const res = await createBook(data);
      setBooks((prev) => [...prev, res.data.data || res.data]);
      return true;
    } catch (err) {
      console.error("Failed to add book:", err);
      setError(err);
      return false;
    }
  };

  // Update existing book
  const editBook = async (bookId, data) => {
    try {
      const res = await updateBook(bookId, data);
      setBooks((prev) =>
        prev.map((b) => (b._id === bookId ? res.data.data || res.data : b))
      );
      return true;
    } catch (err) {
      console.error("Failed to update book:", err);
      setError(err);
      return false;
    }
  };

  // Delete a book
  const removeBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
      return true;
    } catch (err) {
      console.error("Failed to delete book:", err);
      setError(err);
      return false;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, error, fetchBooks, addBook, editBook, removeBook };
};
