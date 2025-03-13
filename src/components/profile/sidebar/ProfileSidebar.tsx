
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel 
} from '@/components/ui/sidebar';

import ProfileSidebarHeader from './ProfileSidebarHeader';
import ProfileServiceMenu from './ProfileServiceMenu';
import ProfileAccountMenu from './ProfileAccountMenu';
import ProfileSidebarFooter from './ProfileSidebarFooter';

interface ProfileSidebarProps {
  activePage?: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activePage }) => {
  const { t } = useLanguage();

  return (
    <Sidebar>
      <ProfileSidebarHeader />
      
      <SidebarContent>
        {/* Main service menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <ProfileServiceMenu activePage={activePage} />
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* User account menu */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('profile.menu.title')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <ProfileAccountMenu activePage={activePage} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <ProfileSidebarFooter />
    </Sidebar>
  );
};

export default ProfileSidebar;
