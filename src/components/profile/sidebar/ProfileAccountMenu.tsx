
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { User, Settings, Globe } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

interface ProfileAccountMenuProps {
  activePage?: string;
}

const ProfileAccountMenu: React.FC<ProfileAccountMenuProps> = ({ activePage }) => {
  const { t } = useLanguage();

  // Account menu items
  const accountMenuItems = [
    { id: 'profile', title: t('profile.menu.profile'), icon: User, path: '/profile' },
    { id: 'settings', title: t('profile.menu.settings'), icon: Settings, path: '/profile/settings' },
  ];

  return (
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
  );
};

export default ProfileAccountMenu;
