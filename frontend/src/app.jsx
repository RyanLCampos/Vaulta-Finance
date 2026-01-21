import { ThemeProvider } from "@material-tailwind/react";

/* Styles */
import './index.css'
import Global from './styles/Global'

/* Components */
import { SidebarWithBurgerMenu } from './components/SideBar'

export function App() {

  return (
    <ThemeProvider>
      <SidebarWithBurgerMenu />
      <Global />
    </ThemeProvider>
  )
}
