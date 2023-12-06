import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import THEME from "../../../utils/constants/theme";
import { updateTheme } from "../../../store/slices/themeSlice";

function ThemeGuard({ children }) {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector((state) => state.theme);

  const updateRootClassname = () => {
    const className = `root_theme root_theme_${currentTheme}`;
    const root = document.querySelector("#root");

    root.className = className;
  };

  const initTheme = () => {
    const isPreferDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const lsTheme = localStorage.getItem(THEME.THEME_TYPE_KEY);

    const initialTheme = isPreferDark
      ? THEME.THEME_DARK_TYPE
      : THEME.THEME_LIGHT_TYPE;

    localStorage.setItem(THEME.THEME_TYPE_KEY, lsTheme || initialTheme);
    dispatch(updateTheme(lsTheme || initialTheme));
  };

  useEffect(() => {
    if (currentTheme) {
      updateRootClassname();
    }
  }, [currentTheme]);

  useEffect(initTheme, []);

  return children;
}

export default ThemeGuard;
