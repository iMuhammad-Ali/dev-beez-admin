import React from "react";

import routes from "../../routes/sidebar";
import { NavLink, Route, useHistory } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
// import { Avatar, Dropdown, DropdownItem } from "@windmill/react-ui";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { signOut } from "./../../store/authThunk";
import logo from "../../assets/img/logo.svg";
import lightlogo from "../../assets/img/light-logo.svg";

function SidebarContent() {
  // const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // function handleProfileClick() {
  //   setIsProfileMenuOpen(!isProfileMenuOpen);
  // }
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await dispatch(signOut()).unwrap();
      // history.push("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="py-4 h-full relative text-gray-500 dark:text-gray-400">
      <NavLink
        to="/app/dashboard"
        className="w-full flex justify-center text-lg font-bold text-gray-800 dark:text-gray-200"
      >
        <img src={logo} alt="Logo" className="w-8 h-8 hidden dark:block" />
        <img src={lightlogo} alt="Logo" className="w-8 h-8 dark:hidden block" />
        <span>Dev Beez</span>
      </NavLink>
      <ul className="mt-6 gap-5">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative h-12" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center h-full w-full text-sm font-semibold transition-colors hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 bg-purple-400 bg-opacity-25 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-2 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <div className="ml-5 inline-flex items-center">
                  <route.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="ml-4">{route.name}</span>
                </div>
              </NavLink>
            </li>
          )
        )}
      </ul>
      {/* <!-- Profile menu --> */}
      <div className="absolute bottom-0 w-full px-6 pb-4">
        <button
          className="rounded-md flex justify-center text-sm py-2 w-full mb-5 text-white bg-red-500 hover:bg-red-600"
          onClick={() => handleSignOut()}
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
