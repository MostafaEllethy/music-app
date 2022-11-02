import { memo, useCallback } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "redux-store";
import { selectIsDark, setDarkTheme } from "./darkThemeSlice";

export default memo(function DarkThemeToggler() {
  const isDark = useAppSelector(selectIsDark);
  const dispatch = useAppDispatch();

  const toggle = useCallback(() => {
    const html = document.querySelector("html");
    if (html) {
      if (isDark) {
        html.dataset.theme = "light";
      } else {
        html.dataset.theme = "dark";
      }
      html.classList.toggle("dark");
      localStorage.setItem("darkTheme", String(!isDark));
      dispatch(setDarkTheme(!isDark));
    }
  }, [isDark, dispatch]);

  return isDark === undefined ? null : (
    <label className="swap swap-rotate text-[26px] opacity-80 hover:opacity-100">
      <input type="checkbox" checked={isDark} onChange={toggle} />

      <IoMdSunny className="swap-on" />

      <IoMdMoon className="swap-off" />
    </label>
  );
});
