import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface ChartSectionProps {
  portfolioAllocation: ChartData[];
  performanceData: { date: string; value: number }[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({ portfolioAllocation, performanceData }) => {
  const maxValue = Math.max(...performanceData.map(d => d.value));
  const minValue = Math.min(...performanceData.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Portfolio Allocation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <PieChart className="h-5 w-5 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Portfolio Allocation</h2>
        </div>
        
        <div className="space-y-3">
          {portfolioAllocation.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-900">{item.label}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">${item.value.toLocaleString()}</span>
                <div className="text-xs text-gray-500">
                  {((item.value / portfolioAllocation.reduce((sum, a) => sum + a.value, 0)) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full flex">
            {portfolioAllocation.map((item, index) => (
              <div
                key={index}
                className="h-full"
                style={{
                  backgroundColor: item.color,
                  width: `${(item.value / portfolioAllocation.reduce((sum, a) => sum + a.value, 0)) * 100}%`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Performance (30 Days)</h2>
        </div>
        
        <div className="h-48 flex items-end space-x-1">
          {performanceData.map((point, index) => (
            <div
              key={index}
              className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer rounded-t"
              style={{
                height: `${((point.value - minValue) / range) * 100}%`,
                minHeight: '2px'
              }}
              title={`${point.date}: $${point.value.toLocaleString()}`}
            ></div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>{performanceData[0]?.date}</span>
          <span>{performanceData[performanceData.length - 1]?.date}</span>
        </div>
      </div>
    </div>
  );
};