import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Menu = ({ navigation, subNavigations, sidebarOpen, setSidebarOpen }) => (
  <>
    <MobileMenu
      navigation={navigation}
      subNavigations={subNavigations}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    ></MobileMenu>
    <DesktopMenu
      navigation={navigation}
      subNavigations={subNavigations}
    ></DesktopMenu>
  </>
);

export default Menu;
