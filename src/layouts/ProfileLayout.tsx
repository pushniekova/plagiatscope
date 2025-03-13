
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Settings, CreditCard, DollarSign, List, History, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { useClerk } from '@clerk/clerk-react';
import { toast } from 'sonner';

interface ProfileLayoutProps {
  children: React.ReactNode;
  activePage?: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, activePage = 'profile' }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(t('auth.signOutSuccess'));
      navigate('/');
    } catch (error) {
      toast.error(t('auth.signOutError'));
    }
  };

  const menuItems = [
    { id: 'profile', title: t('profile.menu.profile'), icon: User, path: '/profile' },
    { id: 'settings', title: t('profile.menu.settings'), icon: Settings, path: '/profile/settings' },
    { id: 'billing', title: t('profile.menu.billing'), icon: CreditCard, path: '/profile/billing' },
    { id: 'payments', title: t('profile.menu.payments'), icon: DollarSign, path: '/profile/payments' },
    { id: 'services', title: t('profile.menu.services'), icon: List, path: '/profile/services' },
    { id: 'history', title: t('profile.menu.history'), icon: History, path: '/profile/history' },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ParticlesBackground />
      <Header />
      
      <SidebarProvider>
        <div className="flex-1 flex w-full">
          <Sidebar>
            <SidebarHeader className="border-b border-border">
              <div className="px-3 py-2">
                <h2 className="text-lg font-semibold">{t('profile.dashboard')}</h2>
                <p className="text-sm text-muted-foreground">{t('profile.welcomeMessage')}</p>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>{t('profile.menu.title')}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={activePage === item.id}
                          tooltip={item.title}
                        >
                          <a href={item.path}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="border-t border-border">
              <div className="px-3 py-2">
                <SidebarMenuButton onClick={handleSignOut} className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 w-full">
                  <LogOut className="h-4 w-4" />
                  <span>{t('auth.signOut')}</span>
                </SidebarMenuButton>
              </div>
            </SidebarFooter>
          </Sidebar>
          
          <SidebarInset className="py-6 px-4 md:px-6">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <Footer />
    </div>
  );
};

export default ProfileLayout;
