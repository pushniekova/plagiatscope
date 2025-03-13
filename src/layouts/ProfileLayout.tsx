
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
import { 
  User, 
  Settings, 
  CreditCard, 
  DollarSign, 
  List, 
  History, 
  LogOut, 
  Home,
  FileText,
  Bot,
  WandSparkles,
  Package,
  PenTool,
  Eraser,
  HelpCircle,
  Globe 
} from 'lucide-react';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { useClerk } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import { Badge } from '@/components/ui/badge';

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

  const goToHomePage = () => {
    navigate('/');
  };

  // New service menu items with icons based on the image
  const serviceMenuItems = [
    { 
      id: 'plagiarism-check', 
      title: t('profile.sidebarMenu.plagiarismCheck'), 
      icon: FileText,
      path: '/check', 
      badge: false 
    },
    { 
      id: 'ai-content-check', 
      title: t('profile.sidebarMenu.aiContentCheck'), 
      icon: Bot, 
      path: '/ai-check', 
      badge: true 
    },
    { 
      id: 'ai-humanization', 
      title: t('profile.sidebarMenu.aiTextHumanization'), 
      icon: WandSparkles, 
      path: '/ai-humanization', 
      badge: true 
    },
    { 
      id: 'my-orders', 
      title: t('profile.sidebarMenu.myOrders'), 
      icon: Package, 
      path: '/profile/orders', 
      badge: false 
    },
    { 
      id: 'proofreading', 
      title: t('profile.sidebarMenu.proofreading'), 
      icon: PenTool, 
      path: '/proofreading', 
      badge: false 
    },
    { 
      id: 'plagiarism-removal', 
      title: t('profile.sidebarMenu.plagiarismRemoval'), 
      icon: Eraser, 
      path: '/plagiarism-removal', 
      badge: false 
    },
    { 
      id: 'payments', 
      title: t('profile.sidebarMenu.payments'), 
      icon: DollarSign, 
      path: '/profile/payments', 
      badge: false 
    },
    { 
      id: 'helpdesk', 
      title: t('profile.sidebarMenu.helpdesk'), 
      icon: HelpCircle, 
      path: '/helpdesk', 
      badge: false 
    },
  ];

  // Define user account menu items
  const accountMenuItems = [
    { id: 'profile', title: t('profile.menu.profile'), icon: User, path: '/profile' },
    { id: 'settings', title: t('profile.menu.settings'), icon: Settings, path: '/profile/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ParticlesBackground />
      
      <div className="pt-4 md:pt-6 flex-1 flex w-full">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="border-b border-border">
              <div className="px-3 py-2">
                <h2 className="text-lg font-semibold">{t('profile.dashboard')}</h2>
                <p className="text-sm text-muted-foreground">{t('profile.welcomeMessage')}</p>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              {/* Main service menu */}
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {serviceMenuItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={activePage === item.id}
                          tooltip={item.title}
                        >
                          <a href={item.path} className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5 text-primary" />
                              <span>{item.title}</span>
                            </div>
                            {item.badge && (
                              <Badge className="ml-auto bg-red-500 hover:bg-red-600 text-[10px] px-1.5 py-0" variant="outline">
                                {t('profile.sidebarMenu.new')}
                              </Badge>
                            )}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              {/* User account menu */}
              <SidebarGroup>
                <SidebarGroupLabel>{t('profile.menu.title')}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {accountMenuItems.map((item) => (
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
                    
                    {/* Language selector in sidebar */}
                    <SidebarMenuItem key="language">
                      <SidebarMenuButton 
                        tooltip={t('profile.sidebarMenu.language')}
                      >
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4" />
                          <LanguageSelector />
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="border-t border-border">
              <div className="px-3 py-2 space-y-2">
                <Button 
                  variant="outline" 
                  onClick={goToHomePage} 
                  className="w-full"
                >
                  <Home className="h-4 w-4 mr-2" />
                  <span>{t('common.home')}</span>
                </Button>
                <Button 
                  onClick={handleSignOut} 
                  variant="destructive" 
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>{t('auth.signOut')}</span>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          
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
