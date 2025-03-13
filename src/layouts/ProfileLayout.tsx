
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import ProfileSidebar from '@/components/profile/sidebar/ProfileSidebar';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

interface ProfileLayoutProps {
  children: React.ReactNode;
  activePage?: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, activePage = 'profile' }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ParticlesBackground />
      
      <div className="pt-4 md:pt-6 flex-1 flex w-full">
        <SidebarProvider>
          <ProfileSidebar activePage={activePage} />
          
          <SidebarInset className="py-6 px-4 md:px-6">
            {children}
          </SidebarInset>
        </SidebarProvider>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfileLayout;
