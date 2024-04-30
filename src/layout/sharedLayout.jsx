import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const SharedLayout = () => {
  return (
    <>
      <NavBar />
      <div className="mt-5 mx-[100px]"> {/* Shifts the main content to the right */}
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
