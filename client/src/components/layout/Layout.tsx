import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Chatbot } from '@/components/ui/chatbot';
import { FeedbackButton } from '@/components/shared/Feedback';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Floating UI Elements */}
      <FeedbackButton />
      <Chatbot />
    </div>
  );
}
