import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="page-container content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
