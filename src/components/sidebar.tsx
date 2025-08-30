"use client";

import Link from "next/link";
import { X, Home, User, Briefcase, Phone } from "lucide-react"; // icons
import { Button } from "./ui/button";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="p-4 relative h-full flex flex-col">
        {/* Close button (only on mobile) */}
        <Button
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setOpen(false)}
          variant="ghost"
          size="icon"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Logo */}
       <Link href={"/"}> <h2 className="text-xl font-bold mx-auto">Dev Space</h2></Link>

        {/* Nav Links */}
        <nav className="mt-6 space-y-2 flex-1">
          <Link
            href="/"
            className="flex text-sm items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 bg-red-600 text-white"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/user/profile"
            className="flex text-sm items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
            Admin
          </Link>
          <Link
            href="/services"
            className="flex text-sm items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <Briefcase className="h-5 w-5" />
            Services
          </Link>
          <Link
            href="/contact"
            className="flex text-sm items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <Phone className="h-5 w-5" />
            Contact
          </Link>
        </nav>
      </div>
    </aside>
  );
}
