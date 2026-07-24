import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useBooks } from "../hooks/useBooks";

export default function Dashboard() {
  const { user, loading: userLoading } = useUser();
  const {
    books,
    loading: booksLoading,
    addBook,
    editBook,
    removeBook,
  } = useBooks();

  const [activePanel, setActivePanel] = useState("overview");
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
  });
  const [editingBookId, setEditingBookId] = useState(null);
  const [editingBook, setEditingBook] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
  });

  if (userLoading || booksLoading)
    return <p className="text-center mt-20 text-white">Loading...</p>;

  // ---------------- Handlers ----------------
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.price) return;
    const success = await addBook(newBook);
    if (success)
      setNewBook({ title: "", author: "", price: "", description: "" });
  };

  const handleEditBook = (book) => {
    setEditingBookId(book._id);
    setEditingBook({
      title: book.title,
      author: book.author,
      price: book.price,
      description: book.description || "",
    });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const success = await editBook(editingBookId, editingBook);
    if (success) setEditingBookId(null);
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?"))
      await removeBook(bookId);
  };

  // ---------------- Panels ----------------
  const OverviewPanel = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.name || "User"}
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded shadow">
          Total Books: {books.length}
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          Recently Added: {books[books.length - 1]?.title || "N/A"}
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">Favorites: 3</div>
      </div>
    </div>
  );

  const MyBooksPanel = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-2">My Books</h2>
      <table className="w-full table-auto border-collapse text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id} className="bg-gray-800">
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">${book.price}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const AddBookPanel = () => (
    <div className="bg-gray-800 p-4 rounded shadow w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-2">Add New Book</h2>
      <form className="flex flex-col space-y-2" onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          className="p-2 rounded"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          className="p-2 rounded"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="p-2 rounded"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="p-2 rounded"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Add Book
        </button>
      </form>
    </div>
  );

  const ProfilePanel = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-2">Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );

  const ActivityLogPanel = () => (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Activity Log</h2>
      <p>Coming soon...</p>
    </div>
  );

  const renderPanel = () => {
    switch (activePanel) {
      case "overview":
        return <OverviewPanel />;
      case "my-books":
        return <MyBooksPanel />;
      case "add-book":
        return <AddBookPanel />;
      case "profile":
        return <ProfilePanel />;
      case "activity-log":
        return <ActivityLogPanel />;
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#101828" }}>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="mb-6">Hello, {user?.name || "User"}</div>
        <nav className="flex flex-col space-y-3 flex-1">
          <button
            className="text-left hover:text-blue-400"
            onClick={() => setActivePanel("overview")}
          >
            Overview
          </button>
          <button
            className="text-left hover:text-blue-400"
            onClick={() => setActivePanel("my-books")}
          >
            My Books
          </button>
          <button
            className="text-left hover:text-blue-400"
            onClick={() => setActivePanel("add-book")}
          >
            Add Book
          </button>
          <button
            className="text-left hover:text-blue-400"
            onClick={() => setActivePanel("activity-log")}
          >
            Activity Log
          </button>
          <button
            className="text-left hover:text-blue-400"
            onClick={() => setActivePanel("profile")}
          >
            Profile
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 text-white">
        {renderPanel()}

        {/* Edit Book Modal */}
        {editingBookId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded w-96">
              <h2 className="text-2xl mb-4">Edit Book</h2>
              <form
                className="flex flex-col space-y-2"
                onSubmit={handleUpdateBook}
              >
                <input
                  type="text"
                  placeholder="Title"
                  className="p-2 rounded"
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Author"
                  className="p-2 rounded"
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="p-2 rounded"
                  value={editingBook.price}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, price: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className="p-2 rounded"
                  value={editingBook.description}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      description: e.target.value,
                    })
                  }
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-gray-500 px-4 py-2 rounded"
                    onClick={() => setEditingBookId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
