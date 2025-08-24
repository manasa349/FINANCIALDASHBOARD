import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketIndex {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface MarketTrendsProps {
  indices: MarketIndex[];
}

export const MarketTrends: React.FC<MarketTrendsProps> = ({ indices }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Activity className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Market Trends</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((index, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{index.name}</h3>
                <p className="text-sm text-gray-500">{index.symbol}</p>
              </div>
              {index.change >= 0 ? 
                <TrendingUp className="h-5 w-5 text-green-600" /> : 
                <TrendingDown className="h-5 w-5 text-red-600" />
              }
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {index.price.toLocaleString()}
            </div>
            <div className={`text-sm font-medium ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};