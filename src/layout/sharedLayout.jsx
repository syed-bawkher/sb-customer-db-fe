import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const SharedLayout = () => {
  return (
    <div className="">
      <NavBar />
      <div className="mt-5 mx-[100px]"> {/* Shifts the main content to the right */}
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
