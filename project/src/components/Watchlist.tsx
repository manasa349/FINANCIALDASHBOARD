import React from 'react';
import { Eye, Star, TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  isFavorite: boolean;
}

interface WatchlistProps {
  watchlist: WatchlistItem[];
  onToggleFavorite: (symbol: string) => void;
}

export const Watchlist: React.FC<WatchlistProps> = ({ watchlist, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Eye className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
      </div>
      
      <div className="space-y-3">
        {watchlist.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onToggleFavorite(item.symbol)}
                className={`p-1 rounded ${item.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-current' : ''}`} />
              </button>
              <div>
                <div className="font-medium text-gray-900">{item.symbol}</div>
                <div className="text-sm text-gray-500">{item.name}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-medium text-gray-900">${item.price.toFixed(2)}</div>
              <div className={`text-sm font-medium flex items-center ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.change >= 0 ? 
                  <TrendingUp className="h-3 w-3 mr-1" /> : 
                  <TrendingDown className="h-3 w-3 mr-1" />
                }
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};