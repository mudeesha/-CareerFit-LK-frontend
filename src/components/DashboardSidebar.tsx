import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  Bookmark,
  Settings,
  LogOut,
  PlusCircle,
  Users,
  Building,
  ShieldCheck,
  Activity } from
'lucide-react';
import { cn } from '../lib/utils';
interface DashboardSidebarProps {
  role: 'candidate' | 'employer' | 'admin';
}
export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const location = useLocation();
  const candidateLinks = [
  {
    name: 'Dashboard',
    path: '/candidate/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Profile',
    path: '/candidate/profile',
    icon: User
  },
  {
    name: 'My CV',
    path: '/candidate/cv',
    icon: FileText
  },
  {
    name: 'Applications',
    path: '/candidate/applications',
    icon: Briefcase
  },
  {
    name: 'Saved Jobs',
    path: '/candidate/saved',
    icon: Bookmark
  },
  {
    name: 'Settings',
    path: '/candidate/settings',
    icon: Settings
  }];

  const employerLinks = [
  {
    name: 'Dashboard',
    path: '/employer/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'My Jobs',
    path: '/employer/jobs',
    icon: Briefcase
  },
  {
    name: 'Post New Job',
    path: '/employer/jobs/new',
    icon: PlusCircle
  },
  {
    name: 'Company Profile',
    path: '/employer/company',
    icon: Building
  },
  {
    name: 'Settings',
    path: '/employer/settings',
    icon: Settings
  }];

  const adminLinks = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: Activity
  },
  {
    name: 'Employers',
    path: '/admin/employers',
    icon: Building
  },
  {
    name: 'Jobs',
    path: '/admin/jobs',
    icon: Briefcase
  },
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: Settings
  }];

  const links =
  role === 'candidate' ?
  candidateLinks :
  role === 'employer' ?
  employerLinks :
  adminLinks;
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="font-bold text-lg text-gray-900">CareerFit LK</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive ?
                'bg-purple-50 text-purple-700' :
                'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}>
              
              <Icon
                className={cn(
                  'w-5 h-5',
                  isActive ? 'text-purple-700' : 'text-gray-400'
                )} />
              
              {link.name}
            </Link>);

        })}
      </div>

      <div className="p-4 border-t border-gray-200 shrink-0">
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          
          <LogOut className="w-5 h-5 text-gray-400" />
          Logout
        </Link>
      </div>
    </aside>);

}