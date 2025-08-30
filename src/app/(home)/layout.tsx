"use client";

import { useState } from "react";

import Header  from "@/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="">
      {/* Sidebar */}
      {/* <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} /> */}

      {/* Main content */}
      <div className="">
        <Header/>

        <main className="flex-1 p-6 rounded-t-3xl overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
