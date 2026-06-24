let tickets = JSON.parse(localStorage.getItem("tickets")) || [
  {
    customer: "Maria Lopez",
    issue: "Login Problem",
    status: "Open",
    notes: "Unable to access account."
  },
  {
    customer: "James Carter",
    issue: "Order Tracking",
    status: "In Progress",
    notes: "Customer waiting for shipping update."
  },
  {
    customer: "Sofia Ramirez",
    issue: "Refund Request",
    status: "Closed",
    notes: "Refund processed successfully."
  }
];

let editIndex = null;

const ticketTable = document.getElementById("ticketTable");
const searchInput = document.getElementById("searchInput");
const submitButton = document.getElementById("submitButton");

function saveTickets() {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function displayTickets(data) {
  ticketTable.innerHTML = "";

  data.forEach((ticket, index) => {
    let statusClass = "";

    if (ticket.status === "Open") statusClass = "status-open";
    if (ticket.status === "In Progress") statusClass = "status-progress";
    if (ticket.status === "Closed") statusClass = "status-closed";

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${ticket.customer}</td>
      <td>${ticket.issue}</td>
      <td class="${statusClass}">${ticket.status}</td>
      <td>${ticket.notes}</td>
      <td>
        <button onclick="editTicket(${index})">Edit</button>
        <button onclick="deleteTicket(${index})">Delete</button>
      </td>
    `;

    ticketTable.appendChild(row);
  });

  updateMetrics();
}

function saveTicket() {
  const customer = document.getElementById("customerName").value.trim();
  const issue = document.getElementById("issueTitle").value.trim();
  const status = document.getElementById("ticketStatus").value;
  const notes = document.getElementById("ticketNotes").value.trim();

  if (customer === "" || issue === "") {
    alert("Please complete required fields.");
    return;
  }

  const ticketData = {
    customer,
    issue,
    status,
    notes
  };

  if (editIndex === null) {
    tickets.push(ticketData);
  } else {
    tickets[editIndex] = ticketData;
    editIndex = null;
    submitButton.textContent = "Create Ticket";
  }

  saveTickets();
  clearForm();
  displayTickets(tickets);
}

function editTicket(index) {
  const ticket = tickets[index];

  document.getElementById("customerName").value = ticket.customer;
  document.getElementById("issueTitle").value = ticket.issue;
  document.getElementById("ticketStatus").value = ticket.status;
  document.getElementById("ticketNotes").value = ticket.notes;

  editIndex = index;
  submitButton.textContent = "Update Ticket";
}

function deleteTicket(index) {
  tickets.splice(index, 1);
  saveTickets();
  displayTickets(tickets);
}

function clearForm() {
  document.getElementById("customerName").value = "";
  document.getElementById("issueTitle").value = "";
  document.getElementById("ticketNotes").value = "";
  document.getElementById("ticketStatus").value = "Open";
}

function updateMetrics() {
  document.getElementById("totalTickets").textContent = tickets.length;
  document.getElementById("openTickets").textContent =
    tickets.filter(t => t.status === "Open").length;
  document.getElementById("progressTickets").textContent =
    tickets.filter(t => t.status === "In Progress").length;
  document.getElementById("closedTickets").textContent =
    tickets.filter(t => t.status === "Closed").length;
}

searchInput.addEventListener("input", function () {
  const search = this.value.toLowerCase();

  const filtered = tickets.filter(ticket =>
    ticket.customer.toLowerCase().includes(search) ||
    ticket.issue.toLowerCase().includes(search) ||
    ticket.status.toLowerCase().includes(search) ||
    ticket.notes.toLowerCase().includes(search)
  );

  displayTickets(filtered);
});

displayTickets(tickets);