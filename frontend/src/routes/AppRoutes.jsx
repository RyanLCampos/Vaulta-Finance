import { Routes, Route } from "react-router-dom"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Dashboard from "../pages/Dashboard"
import PrivateRoute from "./PrivateRoute"
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout>
                <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}