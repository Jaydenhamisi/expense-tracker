import "./styles.css";
import { useEffect, useState } from "react";

const API = "https://expense-tracker-y85w.onrender.com";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // New State for Editing
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  async function loadExpenses() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setExpenses(data);
  }

  async function addExpense() {
    const token = localStorage.getItem("token");

    await fetch(`${API}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, amount }),
    });

    setName("");
    setAmount("");
    loadExpenses();
  }

  async function deleteExpense(id) {
    const token = localStorage.getItem("token");

    await fetch(`${API}/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadExpenses();
  }

  // ✅ Start Editing
  function startEdit(expense) {
    setEditingId(expense.id);
    setEditName(expense.name);
    setEditAmount(expense.amount);
  }

  // ✅ Save Edit to Backend
  async function saveEdit(id) {
    const token = localStorage.getItem("token");

    await fetch(`${API}/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: editName, amount: editAmount }),
    });

    setEditingId(null);
    loadExpenses();
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="container">
      <h2>Your Expenses</h2>

      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {editingId === e.id ? (
              <>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />

                <button onClick={() => saveEdit(e.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {e.name}: £{e.amount}
                <button style={{ marginLeft: "10px" }} onClick={() => startEdit(e)}>Edit</button>
                <button style={{ marginLeft: "10px", background: "#e74c3c" }} onClick={() => deleteExpense(e.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Add Expense</h3>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={addExpense}>Add</button>

      <button onClick={() => { localStorage.removeItem("token"); window.location = "/" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
