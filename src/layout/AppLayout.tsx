import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import UniversityHeader from "@/components/common/UniversityHeader";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Full-width university header */}
      <UniversityHeader />

      {/* Sidebar + content below header */}
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
