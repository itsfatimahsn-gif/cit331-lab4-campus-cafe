// Save Campus Café orders in localStorage.
const STORAGE_KEY = "cafeOrders";

const form = document.querySelector("#order-form");
const ordersList = document.querySelector("#orders-list");
const message = document.querySelector("#order-message");
const clearButton = document.querySelector("#clear-orders");

// Load saved orders safely.
function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

// Save orders in the browser.
function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

// Display saved orders safely.
function renderOrders() {
  const orders = loadOrders();
  ordersList.replaceChildren();

  if (orders.length === 0) {
    message.textContent = "No orders saved yet.";
    return;
  }

  orders.forEach(function (order) {
    const li = document.createElement("li");

    li.textContent =
      order.name + " | " +
      order.item + " | Quantity: " +
      order.quantity + " | Pickup: " +
      order.pickup + " | Milk: " +
      order.milk;

    if (order.notes) {
      li.textContent += " | Notes: " + order.notes;
    }

    ordersList.appendChild(li);
  });

  message.textContent = orders.length + " order(s) saved.";
}

// Save a new order when the form is submitted.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = new FormData(form);

  const order = {
    name: data.get("name").trim(),
    phone: data.get("phone"),
    item: data.get("item"),
    quantity: Number(data.get("quantity")),
    pickup: data.get("pickup"),
    milk: data.get("milk"),
    notes: data.get("notes").trim()
  };

  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);

  renderOrders();
  form.reset();
});

// Clear all saved orders.
clearButton.addEventListener("click", function () {
  localStorage.removeItem(STORAGE_KEY);
  renderOrders();
  message.textContent = "All saved orders cleared.";
});

// Show existing orders when the page opens.
renderOrders();