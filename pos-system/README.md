# POS System – Restaurant Point of Sale

A 3‑tier web‑based Point of Sale (POS) system for restaurants, supporting multiple user roles (guest, staff, admin, chef). Features include menu management, order processing, real‑time order updates, and an admin dashboard.

**My Role:** Project Leader, System Designer, Front‑End Developer (Vue.js), Report Author  
**Team:** 3 members (backend API & MongoDB by teammates; front‑end customization, localStorage logic, system design by me)

---

## Project Overview

The system allows:
- **Guests** to browse menu and place orders.
- **Chefs** to view incoming orders and mark them as completed.
- **Staff** to manage orders.
- **Admin** to add/update/delete menu items, manage staff accounts, and view dashboard statistics (number of customers, staff, chefs).

It follows a 3‑tier architecture:
1. **Front‑end**: HTML/CSS/JS with Vue.js (modified from an open‑source template).
2. **API Layer**: Node.js + Express (implemented by teammate).
3. **Back‑end**: MongoDB (schema designed by me, implemented by teammate).

---

## My Contributions

### 1. System Design & Leadership
- Proposed the concept and overall architecture of the POS system.
- Defined all user workflows (guest order → chef cooking → order completion → admin management).
- Designed the database schema (MongoDB collections: users, foods, bills – see ER diagram below).
- Led the team, assigned tasks, and integrated front‑end with backend API.

### 2. Front‑End Development (Vue.js Template Customization)
- Used an open‑source Vue.js template as the base.
- Customized the UI to match restaurant POS requirements:
  - Menu page with food items and order cart.
  - Chef order list with “complete” button.
  - Admin dashboard with menu management and staff management forms.
- Implemented **client‑side logic**:
  - Shopping cart using `localStorage` to persist orders before checkout.
  - API calls (using `fetch`) to login, place orders, update menu, etc.
  - Form validation and dynamic UI updates.

### 3. LocalStorage Cart Implementation
I wrote the JavaScript code that manages the user’s cart without requiring a server until final checkout.

```javascript
// Example: Add item to cart (simplified from my code)
function addToCart(foodId, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === foodId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id: foodId, name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;
  let html = '';
  cart.forEach(item => {
    html += `<div>${item.name} x${item.quantity} = $${item.price * item.quantity}</div>`;
    total += item.price * item.quantity;
  });
  document.getElementById('cart-items').innerHTML = html;
  document.getElementById('cart-total').innerText = total;
}
```

### 4. API Integration (Front‑End)

```javascript
async function placeOrder() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cart })
  });
  if (response.ok) {
    localStorage.removeItem('cart');
    alert('Order placed!');
  }
}
```

### 5. Database Schema
Below is the ER diagram I designed for the MongoDB database (implementation by teammate).
<img width="996" height="676" alt="image" src="https://github.com/user-attachments/assets/98ab1eac-b56a-4d62-b51e-3ba946d22566" />

### 6. System Screenshots
- Menu Page:
<img width="893" height="691" alt="image" src="https://github.com/user-attachments/assets/7fe4cd85-005c-484d-9cf0-3f51a7b5a83f" />

- Admin Dashboard:
<img width="943" height="715" alt="7" src="https://github.com/user-attachments/assets/9d96e557-9e82-4635-a998-2e78bbbb4705" />

- Orders:
<img width="1006" height="683" alt="23" src="https://github.com/user-attachments/assets/80f433e9-73fe-4f21-8fde-63ce69f6dbad" />

- Staffs:
<img width="980" height="536" alt="34" src="https://github.com/user-attachments/assets/0ed8766d-5f7a-40ae-9217-b5112edc2510" />

