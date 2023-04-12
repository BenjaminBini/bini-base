import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

import Menu from "../main-menu/Menu";
import MainWrapper from "./MainWrapper";
import MobileNavBar from "./MobileNavBar";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Users", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

const subNavigations = [
  {
    name: "Teams",
    items: [
      { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
      { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
      { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
    ],
  },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Menu
          navigation={navigation}
          subNavigations={subNavigations}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        ></Menu>
        <MobileNavBar setSidebarOpen={setSidebarOpen}></MobileNavBar>
        <MainWrapper>{children}</MainWrapper>
      </div>
    </>
  );
};

export default Layout;
