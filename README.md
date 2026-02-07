# 💰 VividSpend — Expense Tracker App (MERN Stack)

A full-stack **Expense Tracker Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
VividSpend helps users track expenses, manage categories, and analyze spending patterns through a modern and responsive dashboard.

---

## 📸 Screenshots

### 🔐 Login Page
![Login Page](./screenshots/login.png)

### 📊 Dashboard
![Dashboard](./screenshots/dashboard.png)

---

## 📌 Features

✅ User authentication (Login & Sign Up)  
✅ Add and manage expenses  
✅ Category-wise expense tracking  
✅ Monthly expense overview  
✅ Total expense calculation  
✅ Clean & responsive UI  
✅ Secure REST APIs  
✅ MongoDB integration  

---

## 🛠️ Tech Stack

| Technology | Description |
|-----------|------------|
| MongoDB | Database |
| Express.js | Backend framework |
| React.js | Frontend library |
| Node.js | Runtime environment |
| JWT | Authentication |
| HTML5 | Markup |
| CSS3 / Tailwind | Styling |
| JavaScript (ES6+) | Logic |

---

## 🚀 Installation & Setup

### ✅ Prerequisites

- Node.js (v16+)
- npm
- MongoDB (local or Atlas)

---

### 🔥 Run Locally

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/codewithayush-04/ExpenseTracker-MERN.git
---

### 🔥 Steps to Run Locally

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/codewithayush-04/ExpenseTracker-MERN.git
```

#### 2️⃣ Navigate to Project Folder

```bash
cd ExpenseTracker-MERN
```

---

### 📦 Install Dependencies

#### Install Backend Dependencies

```bash
cd server
npm install
```

#### Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

### ▶️ Run the Project

#### Start Backend Server

```bash
cd server
npm start
```

#### Start React Frontend

```bash
cd client
npm run dev
```

---

### 🌐 Open in Browser

```
http://localhost:5173
```

(or your configured React/Vite port)

---

## 📂 Project Structure

```
ExpenseTracker-MERN/
│── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│── server/                  # Node.js + Express backend
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── controllers/
│   └── server.js
│── README.md
```

---

## ⚙️ Core Functionality

- Users can add income or expense entries.
- Backend API handles CRUD operations.
- MongoDB stores transaction data.
- React updates UI dynamically using state management.

Example API Route:

```javascript
router.post("/add-transaction", addTransactionController);
```

---

## ✨ Future Improvements

- User authentication (JWT)
- Expense categories
- Charts and analytics dashboard
- Export reports (PDF/CSV)
- Dark mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository  
2. Create a branch:

```bash
git checkout -b feature/new-feature
```

3. Commit changes:

```bash
git commit -m "Added new feature"
```

4. Push to branch:

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📝 License

This project is open-source and available under the MIT License.

---

## 📬 Contact

👨‍💻 Developer: Ayush Gupta  
💼 GitHub: https://github.com/codewithayush-04

---

⭐ If you like this project, consider giving it a star on GitHub!
