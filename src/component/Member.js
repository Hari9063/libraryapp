import React, { useState, useEffect } from "react";
import API_BASE_URL from "../api"; // Make sure api.js has: const API_BASE_URL = "http://localhost:8080/api";

function Members() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", email: "" });
  const [editingMember, setEditingMember] = useState(null);

  // Fetch all members
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/members`)
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error("Error fetching members:", err));
  }, []);

  // Add a new member
  const handleAdd = () => {
    fetch(`${API_BASE_URL}/api/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMember),
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers([...members, data]);
        setNewMember({ name: "", email: "" });
      });
  };

  // Update a member
  const handleUpdate = () => {
    fetch(`${API_BASE_URL}/api/members/${editingMember.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingMember),
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(members.map((m) => (m.id === data.id ? data : m)));
        setEditingMember(null);
      });
  };

  // Delete a member
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/api/members/${id}`, { method: "DELETE" })
      .then(() => setMembers(members.filter((m) => m.id !== id)));
  };

  return (
    <div className="members-container">
      <h2>Members Management</h2>

      {/* Add New Member */}
      <div className="form">
        <h3>Add Member</h3>
        <input
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={newMember.email}
          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Edit Member */}
      {editingMember && (
        <div className="form">
          <h3>Edit Member</h3>
          <input
            placeholder="Name"
            value={editingMember.name}
            onChange={(e) =>
              setEditingMember({ ...editingMember, name: e.target.value })
            }
          />
          <input
            placeholder="Email"
            value={editingMember.email}
            onChange={(e) =>
              setEditingMember({ ...editingMember, email: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingMember(null)}>Cancel</button>
        </div>
      )}

      {/* Members Table */}
      <h3>All Members</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>
                <button onClick={() => setEditingMember(m)}>Edit</button>
                <button onClick={() => handleDelete(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Members;
