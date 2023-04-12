const DesktopMenuMainNav = ({ children }) => {
  return (
    <li>
      <ul role="list" className="-mx-2 space-y-1">
        {children}
      </ul>
    </li>
  );
};

export default DesktopMenuMainNav;
