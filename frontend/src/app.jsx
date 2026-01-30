import { ThemeProvider } from "@material-tailwind/react";

/* Styles */
import "./index.css";
import Global from "./styles/Global";

/* Layout */
import MainLayout from "./layouts/MainLayout";

/* Pages */
import Dashboard from "./pages/Dashboard.jsx";

export function App() {
  return (
    <ThemeProvider>
      <Global />
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </ThemeProvider>
  );
}
