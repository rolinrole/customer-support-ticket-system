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

const ticketTable = document.getElementById("ticketTable");
const searchInput = document.getElementById("searchInput");

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
        <button onclick="deleteTicket(${index})">Delete</button>
      </td>
    `;

    ticketTable.appendChild(row);
  });

  updateMetrics();
}

function addTicket() {
  const customer = document.getElementById("customerName").value.trim();
  const issue = document.getElementById("issueTitle").value.trim();
  const status = document.getElementById("ticketStatus").value;
  const notes = document.getElementById("ticketNotes").value.trim();

  if (customer === "" || issue === "") {
    alert("Please complete required fields.");
    return;
  }

  tickets.push({
    customer,
    issue,
    status,
    notes
  });

  saveTickets();

  document.getElementById("customerName").value = "";
  document.getElementById("issueTitle").value = "";
  document.getElementById("ticketNotes").value = "";

  displayTickets(tickets);
}

function deleteTicket(index) {
  tickets.splice(index, 1);
  saveTickets();
  displayTickets(tickets);
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