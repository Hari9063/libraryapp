import React, { useState, useEffect } from "react";
import API_BASE_URL from "../api";
import "../Books.css"; // Add card styles here

function Books() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    totalCopies: "",
    availableCopies: "",
  });
  const [editingBook, setEditingBook] = useState(null);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  // Fetch all books
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Add a new book
  const handleAdd = () => {
    fetch(`${API_BASE_URL}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks([...books, data]);
        setNewBook({ title: "", author: "", totalCopies: "", availableCopies: "" });
      });
  };

  // Update a book
  const handleUpdate = () => {
    fetch(`${API_BASE_URL}/api/books/${editingBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingBook),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(books.map((b) => (b.id === data.id ? data : b)));
        setEditingBook(null);
      });
  };

  // Delete a book
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/api/books/${id}`, { method: "DELETE" })
      .then(() => setBooks(books.filter((b) => b.id !== id)));
  };

  // Filter books based on search
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      b.author.toLowerCase().includes(searchAuthor.toLowerCase())
  );

  return (
    <div className="books-container">
      <h2>Books Management</h2>

      {/* Search */}
      <div className="search">
        <input
          placeholder="Search by Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          placeholder="Search by Author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
      </div>

      {/* Add New Book */}
      <div className="form">
        <h3>Add Book</h3>
        <input
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Copies"
          value={newBook.totalCopies}
          onChange={(e) => setNewBook({ ...newBook, totalCopies: e.target.value })}
        />
        <input
          type="number"
          placeholder="Available Copies"
          value={newBook.availableCopies}
          onChange={(e) => setNewBook({ ...newBook, availableCopies: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Book */}
      {editingBook && (
        <div className="form">
          <h3>Edit Book</h3>
          <input
            placeholder="Title"
            value={editingBook.title}
            onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
          />
          <input
            placeholder="Author"
            value={editingBook.author}
            onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Copies"
            value={editingBook.totalCopies}
            onChange={(e) => setEditingBook({ ...editingBook, totalCopies: e.target.value })}
          />
          <input
            type="number"
            placeholder="Available Copies"
            value={editingBook.availableCopies}
            onChange={(e) =>
              setEditingBook({ ...editingBook, availableCopies: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingBook(null)}>Cancel</button>
        </div>
      )}

      {/* Book Cards */}
      <div className="cards-container">
        {filteredBooks.map((b) => (
          <div className="book-card" key={b.id}>
            <h5>Id : {b.id}</h5>

            <h4>{b.title}</h4>
            <p><strong>Author:</strong> {b.author}</p>
            <p><strong>Total Copies:</strong> {b.totalCopies}</p>
            <p><strong>Available Copies:</strong> {b.availableCopies}</p>
            <div className="card-actions">
              <button onClick={() => setEditingBook(b)}>Edit</button>
              <button onClick={() => handleDelete(b.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
