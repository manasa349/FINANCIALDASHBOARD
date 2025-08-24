import React from 'react';
import { Header } from './components/Header';
import { PortfolioOverview } from './components/PortfolioOverview';
import { MarketTrends } from './components/MarketTrends';
import { Watchlist } from './components/Watchlist';
import { NewsSection } from './components/NewsSection';
import { ChartSection } from './components/ChartSection';
import { useFinancialData } from './hooks/useFinancialData';

function App() {
  const { 
    holdings, 
    indices, 
    watchlist, 
    news, 
    portfolioAllocation, 
    performanceData, 
    toggleFavorite,
    lastUpdate 
  } = useFinancialData();

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const dailyChange = holdings.reduce((sum, holding) => sum + (holding.change * holding.shares), 0);
  const dailyChangePercent = (dailyChange / (totalValue - dailyChange)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        totalValue={totalValue}
        dailyChange={dailyChange}
        dailyChangePercent={dailyChangePercent}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-sm text-gray-500">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PortfolioOverview holdings={holdings} />
            <ChartSection 
              portfolioAllocation={portfolioAllocation}
              performanceData={performanceData}
            />
            <MarketTrends indices={indices} />
          </div>
          
          <div className="space-y-8">
            <Watchlist 
              watchlist={watchlist}
              onToggleFavorite={toggleFavorite}
            />
            <NewsSection news={news} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;