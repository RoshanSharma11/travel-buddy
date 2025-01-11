import { Menu } from "lucide-react";
import React from "react";
const Topbar = ({
  setSidebarHidden,
}: {
  setSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-between pt-5  pl-4 pr-10">
      <button
        className="hover:bg-slate-50 p-2 rounded-full"
        onClick={() => setSidebarHidden((prev) => !prev)}
      >
        <Menu />
      </button>
    </div>
  );
};

export default Topbar;