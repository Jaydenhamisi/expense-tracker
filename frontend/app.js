const API = "http://127.0.0.1:8000";

function toggleRegister() {
    document.getElementById("register-box").style.display =
      document.getElementById("register-box").style.display === "none" ? "block" : "none";
}

async function register() {
    const username = document.getElementById("new-username").value; 
    const password = document.getElementById("new-password").value; 

    await fetch(`${API}/auth/register?username=${username}&password=${password}`, { method: "POST"}, alert("Account created. Now login"));
}

async function login() {
    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    localStorage.setItem("token", data.access_token);

    window.location = "dashboard.html";
}

async function loadExpenses() {
    const res = await fetch(`${API}/expenses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });


    const expenses = await res.json();
    const list = document.getElementById("expense-list");
    list.innerHTML = "";

    expenses.forEach(x => {
        const li = document.createElement("li");

        li.innerHTML = `
      ${x.name}: £${x.amount}
      <button onclick="deleteExpense(${x.id})" class="delete-btn">Delete</button>
      <button onclick="editExpense(${x.id}, '${x.name}', ${x.amount})" class="edit-btn">Edit</button>
    `;

    list.appendChild(li);
        
    });
}


async function addExpense() {
    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;

    await fetch(`${API}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name, amount })
    });

    loadExpenses();
}

async function deleteExpense(id) {
  await fetch(`${API}/expenses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  loadExpenses();
}

function editExpense(id, oldName, oldAmount) {
  const name = prompt("New name:", oldName);
  const amount = prompt("New amount:", oldAmount);

  updateExpense(id, name, amount);
}

async function updateExpense(id, name, amount) {
  await fetch(`${API}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, amount })
  });

  loadExpenses();
}


function logout() {
    localStorage.removeItem("token");
    window.location = "index.html";
}

if (window.location.pathname.includes("dashboard.html")) {
    loadExpenses();
}