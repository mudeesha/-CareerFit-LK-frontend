import React from 'react';
import { cn } from '../lib/utils';
import { Company } from '../lib/types';
interface CompanyLogoProps {
  company?: Company;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function CompanyLogo({
  company,
  size = 'md',
  className
}: CompanyLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm rounded-xl',
    md: 'w-12 h-12 text-base rounded-xl',
    lg: 'w-14 h-14 text-lg rounded-2xl'
  };
  if (!company) {
    return (
      <div
        className={cn(
          'bg-gray-100 flex items-center justify-center text-gray-400 font-bold',
          sizeClasses[size],
          className
        )}>
        
        ?
      </div>);

  }
  return (
    <div
      className={cn(
        'bg-white flex items-center justify-center font-bold shadow-sm border border-gray-100',
        sizeClasses[size],
        className
      )}
      style={{
        color: company.logoColor
      }}>
      
      {company.logoText}
    </div>);

}