
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Bot, 
  WandSparkles, 
  Package, 
  PenTool, 
  Eraser, 
  DollarSign, 
  HelpCircle 
} from 'lucide-react';

interface ProfileServiceMenuProps {
  activePage?: string;
}

const ProfileServiceMenu: React.FC<ProfileServiceMenuProps> = ({ activePage }) => {
  const { t } = useLanguage();

  // Service menu items with icons
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

  return (
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
  );
};

export default ProfileServiceMenu;
