import { classNames } from "@/utils/classnames";

const MobileMenuSubNavItem = ({ item }) => {
  return (
    <li>
      <a
        href={item.href}
        className={classNames(
          item.current
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white",
          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
        )}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
          {item.initial}
        </span>
        <span className="truncate">{item.name}</span>
      </a>
    </li>
  );
};

export default MobileMenuSubNavItem;
