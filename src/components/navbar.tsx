"use client";

import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <header className="flex items-center justify-between bg-white border-b px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        {/* Hamburger (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Links (desktop only) */}
      <nav className="hidden lg:flex gap-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/features" className="hover:text-blue-600">Features</Link>
        <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
      </nav>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
