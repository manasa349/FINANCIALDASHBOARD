import React from 'react';
import { Newspaper, Clock, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Newspaper className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Financial News</h2>
      </div>
      
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{item.publishedAt}</span>
                    <span className="mx-2">•</span>
                    <span>{item.source}</span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    Read more <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};