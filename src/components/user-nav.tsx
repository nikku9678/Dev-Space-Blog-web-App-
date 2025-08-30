"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Simulating login state (replace with real auth state)
  const isLoggedIn = false;

  return (
    <nav className="bg-white border-b shadow-md fixed container px-12 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Left: Site Name */}
        <div className="text-xl font-bold">
          <Link href="/">Dev Space</Link>
        </div>

        {/* Center Nav Links (Desktop Only) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/user" className="hover:text-blue-600 transition">Services</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <Link href="/" className="hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/services" className="hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/contact" className="hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Contact</Link>
          {!isLoggedIn && (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
