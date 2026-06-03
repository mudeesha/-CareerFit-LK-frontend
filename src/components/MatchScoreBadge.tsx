import React from 'react';
import { cn } from '../lib/utils';
interface MatchScoreBadgeProps {
  score?: number;
  className?: string;
}
export function MatchScoreBadge({ score, className }: MatchScoreBadgeProps) {
  if (score === undefined) return null;
  let variant = 'low';
  let label = 'Low Match';
  if (score >= 80) {
    variant = 'great';
    label = 'Great Match';
  } else if (score >= 60) {
    variant = 'good';
    label = 'Good Match';
  }
  const variants = {
    great: 'bg-green-100 text-green-700 border-green-300',
    good: 'bg-orange-100 text-orange-700 border-orange-300',
    low: 'bg-red-100 text-red-700 border-red-300'
  };
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}>
      
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      {score}% {label}
    </div>);

}