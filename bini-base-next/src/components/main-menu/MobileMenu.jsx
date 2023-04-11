import MobileMenuMainNav from "./MobileMenuMainNav";
import MobileMenuMainNavItem from "./MobileMenuMainNavItem";
import MobileMenuSubNav from "./MobileMenuSubNav";
import MobileMenuSubNavItem from "./MobileMenuSubNavItem";
import MobileMenuWrapper from "./MobileMenuWrapper";

const MobileMenu = ({
  navigation,
  subNavigations,
  sidebarOpen,
  setSidebarOpen,
}) => (
  <MobileMenuWrapper sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
    <MobileMenuMainNav navigation={navigation}>
      {navigation.map((item, i) => (
        <MobileMenuMainNavItem item={item} key={i}></MobileMenuMainNavItem>
      ))}
    </MobileMenuMainNav>
    {subNavigations.map((navigation, i) => {
      <MobileMenuSubNav name={navigation.name}>
        {navigation.items.map((item, i) => (
          <MobileMenuSubNavItem item={item} key={i}></MobileMenuSubNavItem>
        ))}
      </MobileMenuSubNav>;
    })}
  </MobileMenuWrapper>
);

export default MobileMenu;
