import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout() {
  return (
    <article>
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-12 bg-gray-100 items-baseline">
        <div className="col-span-2 h-screen sticky top-0 hidden lg:flex">
          <SideMenu />
        </div>
        <Outlet />
      </div>
    </article>
  );
}

export default Layout;
