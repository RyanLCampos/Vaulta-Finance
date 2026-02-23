import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

/* Styles */
import "./index.css";
import Global from "./styles/Global";

/* Context */
import { AuthProvider } from "./context/AuthContext";

/* Routes */
import AppRoutes from "./routes/AppRoutes";

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Global />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}