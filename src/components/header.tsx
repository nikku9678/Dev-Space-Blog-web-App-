'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  PenTool, 
  User, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  BookOpen
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock auth state

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Dev Space</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900 transition-colors">
              Community
            </Link>
            <Link href="/trending" className="text-gray-600 hover:text-gray-900 transition-colors">
              Trending
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/create">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <PenTool className="mr-2 h-4 w-4" />
                    Write
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <PenTool className="mr-2 h-4 w-4" />
                        My Blogs
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/communities">
                        <Users className="mr-2 h-4 w-4" />
                        My Communities
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-600 hover:text-gray-900 px-2 py-1">
                Home
              </Link>
              <Link href="/communities" className="text-gray-600 hover:text-gray-900 px-2 py-1">
                Communities
              </Link>
              <Link href="/trending" className="text-gray-600 hover:text-gray-900 px-2 py-1">
                Trending
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/create" className="px-2 py-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <PenTool className="mr-2 h-4 w-4" />
                      Write
                    </Button>
                  </Link>
                  <Link href="/profile" className="text-gray-600 hover:text-gray-900 px-2 py-1">
                    Profile
                  </Link>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-2 py-1">
                    My Blogs
                  </Link>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}