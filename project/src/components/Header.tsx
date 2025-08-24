import React from 'react';
import { TrendingUp, User, Settings, Bell } from 'lucide-react';

interface HeaderProps {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
}

export const Header: React.FC<HeaderProps> = ({ totalValue, dailyChange, dailyChangePercent }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">FinanceTracker</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-sm text-gray-600">Total Portfolio</div>
              <div className="text-xl font-bold text-gray-900">
                ${totalValue.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Daily Change</div>
              <div className={`text-xl font-bold ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {dailyChange >= 0 ? '+' : ''}${dailyChange.toFixed(2)} ({dailyChangePercent >= 0 ? '+' : ''}{dailyChangePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <Settings className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <User className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};