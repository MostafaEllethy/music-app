import { logo } from "assets";
import NavLink from "./NavLink";
import { memo, ReactNode, useCallback } from "react";
import { IoMdHome, IoMdTrendingUp, IoMdStar, IoMdGlobe } from "react-icons/io";
import { Link as RLink } from "react-router-dom";

const Link = memo(function DrawerLinkMemo({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  const onClick = useCallback(() => {
    const AppDrawer: HTMLInputElement | null =
      document.querySelector("#app-drawer");
    if (AppDrawer) {
      AppDrawer.checked = false;
    }
  }, []);

  return (
    <li>
      <NavLink
        onClick={onClick}
        to={to}
        className="flex items-center gap-2 cursor-pointer"
      >
        {children}
      </NavLink>
    </li>
  );
});

export default memo(function Drawer() {
  return (
    <aside className="drawer-side">
      <label htmlFor="app-drawer" className="drawer-overlay"></label>
      <div className="w-64 bg-base-100 border-r dark:border-transparent border-r-slate-900/10 px-4">
        <RLink to="/">
          <img
            src={logo}
            alt="logo"
            width={92}
            className="mt-10 mx-auto mb-10 select-none"
          />
        </RLink>

        <ul className="flex flex-col gap-7">
          <Link to="/">
            <IoMdHome className="text-2xl" /> Discover
          </Link>
          <Link to="/around-you">
            <IoMdGlobe className="text-2xl" /> Around You
          </Link>
          <Link to="/top-artists">
            <IoMdStar className="text-2xl" /> Top Artists
          </Link>
          <Link to="/top-charts">
            <IoMdTrendingUp className="text-2xl" /> Top Charts
          </Link>
        </ul>
      </div>
    </aside>
  );
});
