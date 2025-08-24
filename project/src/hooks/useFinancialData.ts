import { useState, useEffect } from 'react';

// Mock data generator for demonstration
const generateMockData = () => {
  const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, currentPrice: 175.20, change: 2.30, changePercent: 1.33 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, currentPrice: 142.50, change: -1.80, changePercent: -1.25 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, currentPrice: 378.90, change: 5.20, changePercent: 1.39 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 20, currentPrice: 248.50, change: -3.40, changePercent: -1.35 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 15, currentPrice: 155.30, change: 1.20, changePercent: 0.78 },
  ].map(holding => ({
    ...holding,
    value: holding.shares * holding.currentPrice
  }));

  const indices = [
    { name: 'S&P 500', symbol: 'SPX', price: 4567.89, change: 12.34, changePercent: 0.27 },
    { name: 'Dow Jones', symbol: 'DJI', price: 35234.56, change: -45.67, changePercent: -0.13 },
    { name: 'NASDAQ', symbol: 'IXIC', price: 14567.23, change: 23.45, changePercent: 0.16 },
  ];

  const watchlist = [
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.30, change: 15.20, changePercent: 1.77, volume: 24567890, isFavorite: true },
    { symbol: 'META', name: 'Meta Platforms', price: 325.40, change: -2.80, changePercent: -0.85, volume: 18234567, isFavorite: false },
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: 142.80, change: 3.40, changePercent: 2.44, volume: 32456789, isFavorite: true },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 456.20, change: -5.60, changePercent: -1.21, volume: 12345678, isFavorite: false },
  ];

  const news = [
    {
      id: '1',
      title: 'Tech Stocks Rally on Strong Earnings Reports',
      summary: 'Major technology companies reported better-than-expected earnings, driving market optimism.',
      source: 'Financial Times',
      publishedAt: '2 hours ago',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Federal Reserve Hints at Rate Cut Possibility',
      summary: 'Fed officials suggest potential monetary policy adjustments in upcoming meetings.',
      source: 'Bloomberg',
      publishedAt: '4 hours ago',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Renewable Energy Sector Sees Strong Growth',
      summary: 'Clean energy investments continue to attract institutional and retail investors.',
      source: 'Wall Street Journal',
      publishedAt: '6 hours ago',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const portfolioAllocation = [
    { label: 'Technology', value: 45000, color: '#3B82F6' },
    { label: 'Healthcare', value: 25000, color: '#10B981' },
    { label: 'Finance', value: 20000, color: '#F59E0B' },
    { label: 'Energy', value: 15000, color: '#EF4444' },
    { label: 'Consumer Goods', value: 10000, color: '#8B5CF6' },
  ];

  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: 115000 + Math.random() * 10000 - 5000
  }));

  return { holdings, indices, watchlist, news, portfolioAllocation, performanceData };
};

export const useFinancialData = () => {
  const [data, setData] = useState(generateMockData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = { ...prevData };
        
        // Update holdings with small random changes
        newData.holdings = newData.holdings.map(holding => ({
          ...holding,
          change: holding.change + (Math.random() - 0.5) * 0.5,
          changePercent: holding.changePercent + (Math.random() - 0.5) * 0.2,
        }));

        // Update indices
        newData.indices = newData.indices.map(index => ({
          ...index,
          change: index.change + (Math.random() - 0.5) * 2,
          changePercent: index.changePercent + (Math.random() - 0.5) * 0.1,
        }));

        // Update watchlist
        newData.watchlist = newData.watchlist.map(item => ({
          ...item,
          change: item.change + (Math.random() - 0.5) * 1,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.3,
        }));

        return newData;
      });
      
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (symbol: string) => {
    setData(prevData => ({
      ...prevData,
      watchlist: prevData.watchlist.map(item =>
        item.symbol === symbol ? { ...item, isFavorite: !item.isFavorite } : item
      )
    }));
  };

  return { ...data, toggleFavorite, lastUpdate };
};