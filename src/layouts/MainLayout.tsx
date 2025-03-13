
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import ColorfulMascot from '@/components/ColorfulMascot';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ParticlesBackground />
      <Header />
      <main className="flex-grow relative">
        {children}
        <div className="fixed bottom-4 right-4 z-10">
          <ColorfulMascot size="md" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
