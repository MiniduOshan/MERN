import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/home.jsx";
import Form from "./pages/form.jsx";
import Product from "./pages/product.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import Profile from "./pages/profile.jsx";
import { RequireAdmin, RequireAuth } from "./components/RequireAdmin";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">

      {!isAdminRoute && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User profile (must be logged in) */}
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          {/* Admin dashboard */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
