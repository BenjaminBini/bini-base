import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

import MainWrapper from "./layout/MainWrapper";
import MobileNavBar from "./layout/MobileNavBar";
import Menu from "./main-menu/menu";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
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

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Menu
          navigation={navigation}
          subNavigations={subNavigations}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        ></Menu>
        <MobileNavBar setSidebarOpen={setSidebarOpen}></MobileNavBar>
        <MainWrapper>Toto</MainWrapper>
      </div>
    </>
  );
}
