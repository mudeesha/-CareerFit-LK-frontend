import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
export function PublicNavbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
  {
    name: 'Jobs',
    path: '/jobs'
  },
  {
    name: 'Categories',
    path: '/categories'
  },
  {
    name: 'Companies',
    path: '/companies'
  },
  {
    name: 'For Employers',
    path: '/employer/dashboard'
  }];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="font-bold text-xl text-gray-900 hidden sm:block">
            CareerFit LK
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              'text-sm font-medium transition-colors hover:text-purple-600',
              location.pathname === link.path ?
              'text-purple-600' :
              'text-gray-600'
            )}>
            
              {link.name}
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-purple-600">
            
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium text-gray-600 hover:text-purple-600">
            
            Register
          </Link>
          <Link
            to="/employer/jobs/new"
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            
            Post a Job
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          
          {isMobileMenuOpen ?
          <X className="w-6 h-6" /> :

          <Menu className="w-6 h-6" />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen &&
      <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) =>
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'text-base font-medium',
            location.pathname === link.path ?
            'text-purple-600' :
            'text-gray-600'
          )}
          onClick={() => setIsMobileMenuOpen(false)}>
          
              {link.name}
            </Link>
        )}
          <hr className="border-gray-200" />
          <Link
          to="/login"
          className="text-base font-medium text-gray-600"
          onClick={() => setIsMobileMenuOpen(false)}>
          
            Sign in
          </Link>
          <Link
          to="/register"
          className="text-base font-medium text-gray-600"
          onClick={() => setIsMobileMenuOpen(false)}>
          
            Register
          </Link>
          <Link
          to="/employer/jobs/new"
          className="bg-purple-600 text-white text-center text-base font-medium px-4 py-2 rounded-lg mt-2"
          onClick={() => setIsMobileMenuOpen(false)}>
          
            Post a Job
          </Link>
        </div>
      }
    </nav>);

}