import LayoutSideBar from "../components/SideBar/Sidebar.jsx";
import Global from "../styles/Global";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row overflow-x-hidden">
        <LayoutSideBar />
      <main className="flex-1 p-6 transition-all duration-300 md:ml-16 md:group-hover:ml-64 h-screen">
        {children}
      </main>
    </div>
  );
}