import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  value: number;
}

interface PortfolioOverviewProps {
  holdings: Holding[];
}

export const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ holdings }) => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalChange = holdings.reduce((sum, holding) => sum + (holding.change * holding.shares), 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm text-blue-600">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">${totalValue.toLocaleString()}</div>
        </div>
        
        <div className={`${totalChange >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-4`}>
          <div className="flex items-center">
            {totalChange >= 0 ? 
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" /> : 
              <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
            }
            <span className={`text-sm ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Today's Change
            </span>
          </div>
          <div className={`text-2xl font-bold ${totalChange >= 0 ? 'text-green-900' : 'text-red-900'}`}>
            {totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}
          </div>
        </div>
        
        <div className={`${totalChangePercent >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-4`}>
          <div className="flex items-center">
            <Percent className={`h-5 w-5 ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'} mr-2`} />
            <span className={`text-sm ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Percentage Change
            </span>
          </div>
          <div className={`text-2xl font-bold ${totalChangePercent >= 0 ? 'text-green-900' : 'text-red-900'}`}>
            {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 border-b">
              <th className="pb-2">Symbol</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Shares</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">Change</th>
              <th className="pb-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 font-medium text-gray-900">{holding.symbol}</td>
                <td className="py-3 text-gray-600">{holding.name}</td>
                <td className="py-3 text-gray-600">{holding.shares}</td>
                <td className="py-3 text-gray-900">${holding.currentPrice.toFixed(2)}</td>
                <td className={`py-3 font-medium ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {holding.change >= 0 ? '+' : ''}${holding.change.toFixed(2)} ({holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%)
                </td>
                <td className="py-3 font-medium text-gray-900">${holding.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};