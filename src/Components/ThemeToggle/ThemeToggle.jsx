import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  // Load saved theme from localStorage or default to light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "life_lessons_theme_light";
  });

  // Apply the theme and save to localStorage whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "life_lessons_theme_light"
        ? "life_lessons_theme_dark"
        : "life_lessons_theme_light"
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-primary btn-soft btn-circle"
    >
      {theme === "life_lessons_theme_light" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

export default ThemeToggle;
