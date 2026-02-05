# 💰 Expense Tracker App — MERN Stack

A full-stack **Expense Tracker Application** built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This application helps users manage their income and expenses, track financial activities, and visualize spending habits through a clean and responsive interface.

---

## 📌 Features

✅ Add, edit, and delete expenses  
✅ Track income and expense transactions  
✅ Real-time balance calculation  
✅ MERN Stack full-stack architecture  
✅ REST API with Express & Node.js  
✅ MongoDB database integration  
✅ Responsive and modern UI  
✅ Dynamic state management with React  

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| MongoDB | Database for storing transactions |
| Express.js | Backend API framework |
| React.js | Frontend UI development |
| Node.js | Server-side runtime environment |
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript (ES6+) | Logic and interactivity |

---

## 🚀 Installation & Setup

### ✅ Prerequisites

Make sure you have installed:

- Node.js (v16+)
- npm
- MongoDB (local or cloud like MongoDB Atlas)

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
