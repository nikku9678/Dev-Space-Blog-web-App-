"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import UserNavbar from "@/components/user-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} /> */}

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <UserNavbar/>

        <main className="flex-1 p-6 rounded-t-3xl overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
