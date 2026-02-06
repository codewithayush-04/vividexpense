import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import Layout from "./components/Layout";
import axios from "axios";
import "@/App.css";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://vividexpense-7.onrender.com");
const API = `${BACKEND_URL}/api`;

// Set up axios defaults
axios.defaults.baseURL = API;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token, fetchUser]);

  const handleLogin = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748B]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          ) : (
            <Route element={<Layout user={user} onLogout={handleLogout} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
