import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import UniversityHeader from "@/components/common/UniversityHeader";

const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-muted/30">
      {/* Full-width university header — fixed height */}
      <UniversityHeader />

      {/* Sidebar + content — fills remaining height, no overflow on this row */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
