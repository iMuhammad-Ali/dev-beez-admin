import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../store/sidebarSlice";
import { toggleTheme } from "../store/themeSlice";
import { MoonIcon, SunIcon, MenuIcon } from "../icons";

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>

        <ul className="flex ml-auto mr-4">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md right-0 focus:outline-none focus:shadow-outline-purple"
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle color mode"
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
