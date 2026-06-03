import React from 'react';

export function HeroVisual() {
  return (
    <div className="hidden lg:block relative w-[560px] h-[500px]">
      <div className="absolute inset-6 bg-gradient-to-tr from-purple-600/10 to-blue-600/10 rounded-[3rem] rotate-3" />

      <div className="absolute inset-6 rounded-[3rem] shadow-xl -rotate-2 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90"
          alt="Professional job seeker"
          className="w-full h-full object-cover object-[center_35%]"
        />
      </div>

      <div
        className="absolute top-16 left-0 bg-white p-4 rounded-2xl shadow-xl border border-gray-200 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
            <span className="text-green-600 font-bold text-lg">78%</span>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">CV Match Score</p>
            <p className="text-sm font-bold text-gray-900">Good Match</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-28 right-0 bg-white p-4 rounded-2xl shadow-xl border border-gray-200">
        <p className="text-2xl font-bold text-purple-600">12,840+</p>
        <p className="text-sm font-medium text-gray-900">Jobs in Sri Lanka</p>
        <p className="text-xs text-gray-500 mt-1">Updated daily</p>
      </div>

      <div className="absolute bottom-4 left-14 bg-white p-4 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-4">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/100?img=${i + 10}`}
              alt="Company avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          ))}
        </div>

        <div>
          <p className="text-sm font-bold text-gray-900">500+ Companies</p>
          <p className="text-xs text-gray-500">Hiring now</p>
        </div>
      </div>
    </div>
  );
}