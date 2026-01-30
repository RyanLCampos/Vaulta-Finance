import LayoutSideBar from "../components/SideBar/Sidebar.jsx";
import Global from "../styles/Global";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
        <LayoutSideBar />
      <main className="flex-1 p-6 bg-transparent">
        {children}
      </main>
    </div>
  );
}