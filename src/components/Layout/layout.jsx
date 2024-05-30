import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div>
      <Header/>
      <main className="p-2 md:px-16 sm:px-6  bg-gray-950 text-white">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
