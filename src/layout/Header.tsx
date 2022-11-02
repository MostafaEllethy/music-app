import { logo } from "assets";
import DarkThemeToggler from "features/dark-theme/DarkThemeToggler";
import { memo } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default memo(function Header() {
  return (
    <header className="sticky min-h-[56px] flex items-center justify-between px-2 top-0 w-full border-b dark:border-0 border-b-slate-900/10 z-10 gap-3 sm:px-5 bg-base-100/90 dark:bg-base-200/70 backdrop-blur">
      <Link to="/" className="min-w-[40px] lg:hidden">
        <img src={logo} className="h-10 sm:h-12 object-contain" alt="logo" />
      </Link>
      <SearchBar />
      <div className="flex items-center gap-3 sm:gap-5">
        <DarkThemeToggler />
        <label
          htmlFor="app-drawer"
          className="lg:hidden swap swap-rotate opacity-75 hover:opacity-100"
        >
          <IoMdMenu className="text-3xl" />
        </label>
      </div>
    </header>
  );
});
