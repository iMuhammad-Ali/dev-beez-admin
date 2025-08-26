import React from "react";
import { useState } from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
// import { Avatar, Dropdown, DropdownItem } from "@windmill/react-ui";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { signOut } from "./../../store/authThunk";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // function handleProfileClick() {
  //   setIsProfileMenuOpen(!isProfileMenuOpen);
  // }
  const dispatch = useDispatch();
  return (
    <div className="py-4 h-full relative text-gray-500 dark:text-gray-400">
      <NavLink
        to="/app/dashboard"
        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
      >
        Dev Beez
      </NavLink>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      {/* <!-- Profile menu --> */}
      <div className="absolute bottom-0 w-full px-6 pb-4">
        <button
          className="rounded-md flex justify-center text-sm py-2 w-full mb-5 text-white bg-red-500 hover:bg-red-600"
          onClick={() => dispatch(signOut())}
          aria-label="Account"
          aria-haspopup="true"
        >
          <LogOut className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Log out</span>
        </button>
        {/* <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem onClick={() => {}}>
                <OutlinePersonIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem onClick={() => {}}>
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={() => alert("Log out!")}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown> */}
      </div>
    </div>
  );
}

export default SidebarContent;
