import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PowerIcon
} from "@heroicons/react/24/outline";

import logoVertical from "../../assets/VaultaFinanceLogo.png"
import logoHorizontal from "../../assets/VaultaFinanceHorizontal.png"

export default function LayoutSideBar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { label: "Dashboard", icon: HomeIcon },
    { label: "Relatórios", icon: ChartBarIcon },
    { label: "Configurações", icon: Cog6ToothIcon },
    { label: "Sair", icon: PowerIcon },
  ];

  const MobileMenu = () => (
    <nav className="p-3 space-y-3 mt-10">
      {menu.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="
          w-full flex items-center gap-3
          font-bold
          p-3 rounded-lg
          text-left text-primary
          hover:bg-primary hover:text-white
          transition-colors
        "
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </nav>
  );


  const DesktopMenu = () => (
    <nav className="p-2 space-y-7 mt-32">
      {menu.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="
          w-full flex items-center
          justify-center group-hover:justify-start
          gap-3
          p-3
          rounded-lg
          font-medium
          text-[20px]
          text-primary
          hover:bg-primary hover:text-white
          transition-all duration-200
        "
        >
          <Icon className="h-6 w-6 shrink-0" />

          <span
            className="
            overflow-hidden
            whitespace-nowrap
            max-w-0
            opacity-0
            group-hover:max-w-[200px]
            group-hover:opacity-100
            transition-all duration-300
          "
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );

  return (
    <div className="bg-transparent">
      {/* Desktop sidebar */}
      <aside
        className="
          hidden md:flex
          h-screen
          w-14 hover:w-64
          flex-col
          bg-white
          text-primary
          rounded-r-[15px]
          shadow-lg
          cards
          transition-all duration-300
          group
        "
      >
        {/* Logo */}
        <div className="h-[64px] flex items-center justify-center group-hover:justify-start px-4 mt-20">
          <span className="text-[25px] font-bold overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-[200px] transition-all duration-300">
            <img src={logoVertical} alt="Logo Vaulta Finance" />
          </span>
        </div>

        <DesktopMenu />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center bg-transparent p-4 pt-5 pb-5 bg-white w-[98%] mx-auto rounded-b-2xl rounded-t-none text-primary shadow-lg relative">

        {/* Botão / ícone à esquerda */}
        <button
          onClick={() => setOpen(true)}
          className="absolute left-4"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Título centralizado */}
        <span className="mx-auto">
          <img src={logoHorizontal} alt="Logo Vaulta Finance" className="h-10 w-auto"/>
        </span>
      </div>


      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden shadow-lg"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-white text-primary
          rounded-r-[15px]
          transform transition-transform duration-300 md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 pt-5">
          <span className="font-bold text-[20px]">
            <img src={logoVertical} alt="Logo Vaulta Finance" className="size-auto"/>
          </span>
        </div>

        <MobileMenu />
      </aside>
    </div>
  );
}
