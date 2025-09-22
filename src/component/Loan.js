import React, { useState, useEffect } from "react";
import API_BASE_URL from "../api";
import "../Loan.css";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState({
    bookId: "",
    memberId: "",
    loanDays: "",
  });

  // Fetch all loans
  const fetchLoans = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/loans`);
      if (!res.ok) throw new Error("Failed to fetch loans");
      const data = await res.json();
      setLoans(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Borrow a book
  const handleAdd = async () => {
    if (!newLoan.bookId || !newLoan.memberId || !newLoan.loanDays) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/loans?bookId=${newLoan.bookId}&memberId=${newLoan.memberId}&loanDays=${newLoan.loanDays}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to add loan");
      await res.json();
      fetchLoans(); // refresh loans
      setNewLoan({ bookId: "", memberId: "", loanDays: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Return a book
  const handleReturn = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/loans/return/${id}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to return book");
      await res.json();
      fetchLoans(); // refresh loans
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a loan
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/loans/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete loan");
      setLoans(loans.filter((l) => l.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to calculate due date
  const calculateDueDate = (loanDate, loanDays) => {
    const date = new Date(loanDate);
    date.setDate(date.getDate() + loanDays);
    return date.toLocaleDateString();
  };

  return (
    <div className="loans-container">
      <h2>Loans Management</h2>

      {/* Borrow Book Form */}
      <div className="form">
        <h3>Borrow Book</h3>
        <input
          type="number"
          placeholder="Book ID"
          value={newLoan.bookId}
          onChange={(e) => setNewLoan({ ...newLoan, bookId: e.target.value })}
        />
        <input
          type="number"
          placeholder="Member ID"
          value={newLoan.memberId}
          onChange={(e) =>
            setNewLoan({ ...newLoan, memberId: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Loan Days"
          value={newLoan.loanDays}
          onChange={(e) =>
            setNewLoan({ ...newLoan, loanDays: e.target.value })
          }
        />
        <button onClick={handleAdd}>Borrow</button>
      </div>

      {/* Loan Cards */}
      <div className="cards-container">
        {loans?.length > 0 ? (
          loans.map((l) => {
            const loanDate = l.loanDate
              ? new Date(l.loanDate).toLocaleDateString()
              : "N/A";
            const dueDate =
              l.loanDate && l.loanDays
                ? calculateDueDate(l.loanDate, l.loanDays)
                : "N/A";
            const returnDate = l.returnDate
              ? new Date(l.returnDate).toLocaleDateString()
              : "Not returned";
            const status = l.returnDate
              ? "Returned"
              : new Date() > new Date(dueDate)
              ? "Overdue"
              : "Borrowed";

            return (
              <div className="loan-card" key={l.id}>
                <h4>Loan ID: {l.id}</h4>
                <p>
                  <strong>Book ID:</strong> {l.book?.id ?? l.bookId ?? "N/A"}
                </p>
                <p>
                  <strong>Member ID:</strong> {l.member?.id ?? l.memberId ?? "N/A"}
                </p>
              
                <p>
                  <strong>Loan Date:</strong> {l.borrowDate}
                </p>
                <p>
                  <strong>Due Date:</strong> {l.dueDate}
                </p>
                <p>
                  <strong>Return Date:</strong> {l.returnDate}
                </p>
                <p>
                  <strong>Status:</strong> {l.status}
                </p>
                <div className="card-actions">
                  {!l.returnDate && (
                    <button onClick={() => handleReturn(l.id)}>Return</button>
                  )}
                  <button onClick={() => handleDelete(l.id)}>Delete</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No loans available.</p>
        )}
      </div>
    </div>
  );
}

export default Loans;
