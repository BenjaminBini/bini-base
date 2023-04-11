const MobileMenuSubNav = ({ children }) => {
  return (
    <li>
      <div className="text-xs font-semibold leading-6 text-gray-400">
        Your teams
      </div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {children}
      </ul>
    </li>
  );
};

export default MobileMenuSubNav;
