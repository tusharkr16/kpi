import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
