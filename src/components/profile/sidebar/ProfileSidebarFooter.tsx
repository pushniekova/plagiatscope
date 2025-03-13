
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import { toast } from 'sonner';

const ProfileSidebarFooter: React.FC = () => {
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

  return (
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
  );
};

export default ProfileSidebarFooter;
