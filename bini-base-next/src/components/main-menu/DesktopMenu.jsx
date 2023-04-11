import DesktopMenuMainNav from "./DesktopMenuMainNav";
import DesktopMenuMainNavItem from "./DesktopMenuMainNavItem";
import DesktopMenuProfile from "./DesktopMenuProfile";
import DesktopMenuSubNav from "./DesktopMenuSubNav";
import DesktopMenuSubNavItem from "./DesktopMenuSubNavItem";
import DesktopMenuWrapper from "./DesktopMenuWrapper";

const DesktopMenu = ({ navigation, subNavigations }) => {
  return (
    <DesktopMenuWrapper>
      <DesktopMenuMainNav>
        {navigation.map((item, i) => (
          <DesktopMenuMainNavItem item={item} key={i}></DesktopMenuMainNavItem>
        ))}
      </DesktopMenuMainNav>
      {subNavigations.map((subNavigation, i) => (
        <DesktopMenuSubNav name={subNavigation.name} key={i}>
          {subNavigation.items.map((item, i) => (
            <DesktopMenuSubNavItem key={i} item={item}></DesktopMenuSubNavItem>
          ))}
        </DesktopMenuSubNav>
      ))}

      <DesktopMenuProfile userFullName="Tim Cook"></DesktopMenuProfile>
    </DesktopMenuWrapper>
  );
};

export default DesktopMenu;
