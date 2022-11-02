import { useEffect } from "react";
import { useAppDispatch } from "../../redux-store";
import { setDarkTheme } from "./darkThemeSlice";

function useDarkTheme() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const savedIsDark = localStorage.getItem("darkTheme");
    let html = document.querySelector("html");
    if (html) {
      if (savedIsDark === "false") {
        dispatch(setDarkTheme(false));
        html.dataset.theme = "light";
        html.classList.remove("dark");
      } else {
        dispatch(setDarkTheme(true));
        html.dataset.theme = "dark";
      }
    }
  }, [dispatch]);
}

export default useDarkTheme;
