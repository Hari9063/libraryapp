import React, { useEffect, useState } from "react";
import API_BASE_URL from "../api";
import "../Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/books`);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // Fetch all members
  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/members`);
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
  }, []);

  return (
    <div className="home-container">
      <h1>Library Dashboard</h1>

      {/* Books Section */}
      <section className="section">
        <h2>All Books</h2>
        <div className="cards-container">
          {books.length > 0 ? (
            books.map((book) => (
              <div className="card" key={book.id}>
                <p><strong>ID:</strong> {book.id}</p>
                <h4>{book.title}</h4>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Total Copies:</strong> {book.totalCopies}</p>
                <p><strong>Available Copies:</strong> {book.availableCopies}</p>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      </section>

      {/* Members Section */}
      <section className="section">
        <h2>All Members</h2>
        <div className="cards-container">
          {members.length > 0 ? (
            members.map((member) => (
              <div className="card" key={member.id}>
                <p><strong>ID:</strong> {member.id}</p>
                <h4>{member.name}</h4>
                <p><strong>Email:</strong> {member.email}</p>
              </div>
            ))
          ) : (
            <p>No members available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
