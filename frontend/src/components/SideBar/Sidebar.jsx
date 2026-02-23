import { useState } from "react";
import {
  Bars3Icon,
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";

import logoVertical from "../../assets/VaultaFinanceLogo.png";
import logoHorizontal from "../../assets/VaultaFinanceHorizontal.png";

export default function LayoutSideBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { label: "Relatórios", icon: ChartBarIcon, path: "/relatorios" },
    { label: "Configurações", icon: Cog6ToothIcon, path: "/configuracoes" },
    { label: "Sair", icon: PowerIcon, action: "logout" },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
      {/* ================= DESKTOP / NOTEBOOK SIDEBAR ================= */}
      <aside
        className="
          hidden md:flex
          fixed top-0 left-0
          h-screen
          w-16 hover:w-64
          flex-col
          bg-white text-primary
          rounded-r-[15px]
          shadow-lg cards
          transition-all duration-300
          group
          z-40
        "
      >
        {/* Logo */}
        <div className="h-[72px] mt-24 flex items-center justify-center group-hover:justify-start px-4">
          <img
            src={logoVertical}
            alt="Logo Vaulta Finance"
            className="
              h-24 w-auto
              mx-auto
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
          />
        </div>

        {/* Menu */}
        <nav className="mt-20 px-2 space-y-6">
          {menu.map(({ label, icon: Icon, path, action }) => (
            <button
              key={label}
              title={label}
              onClick={() => {
                if (action === "logout") {
                  handleLogout();
                } else if (path) {
                  navigate(path);
                }
              }}
              className="
      w-full flex items-center
      justify-center group-hover:justify-start
      gap-3
      p-3 rounded-lg
      font-medium
      text-primary
      hover:bg-primary hover:text-white
      transition-all duration-300
      mt-20
      md:mt-5
    "
            >
              <Icon className="h-6 w-6 shrink-0" />

              <span
                className="
                  overflow-hidden whitespace-nowrap
                  max-w-0 opacity-0
                  group-hover:max-w-[160px]
                  group-hover:opacity-100
                  transition-all duration-300
                "
              >
                {label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ================= MOBILE TOP BAR ================= */}
      <header className="md:hidden sticky top-0 z-30 bg-white shadow-lg rounded-b-2xl">
        <div className="flex items-center p-4 relative">
          <button
            onClick={() => setOpen(true)}
            className="absolute left-4"
          >
            <Bars3Icon className="h-6 w-6 text-primary" />
          </button>

          <img
            src={logoHorizontal}
            alt="Logo Vaulta Finance"
            className="h-10 mx-auto"
          />
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-white text-primary shadow-lg
          transform transition-transform duration-300 md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4">
          <img
            src={logoVertical}
            alt="Logo Vaulta Finance"
            className="mx-auto"
          />
        </div>

        <nav className="p-3 space-y-2">
          {menu.map(({ label, icon: Icon, path, action }) => (
            <button
              key={label}
              onClick={() => {
                setOpen(false);

                if (action === "logout") {
                  handleLogout();
                } else if (path) {
                  navigate(path);
                }
              }}
              className="
                w-full flex items-center gap-3
                p-3 rounded-lg
                font-medium
                text-primary
                hover:bg-primary hover:text-white
                transition-colors
              "
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
