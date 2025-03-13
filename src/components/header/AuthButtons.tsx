
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Settings } from 'lucide-react';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { t } = useLanguage();

  const goToProfile = () => {
    navigate('/profile');
  };

  if (isSignedIn) {
    if (isMobile) {
      return (
        <div className="flex items-center gap-3 px-3 py-2">
          <Button 
            onClick={goToProfile} 
            variant="ghost" 
            className="flex items-center gap-2 w-full justify-start"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">{t('profile.dashboard')}</span>
          </Button>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
              }
            }}
          />
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToProfile}
          className="flex items-center gap-1.5"
        >
          <Settings className="h-4 w-4" />
          <span>{t('profile.dashboard')}</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonBox: "h-10 w-10",
                    userButtonTrigger: "h-10 w-10 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    userButtonAvatarBox: "h-9 w-9",
                  }
                }}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={goToProfile}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t('profile.dashboard')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-1.5"
          onClick={() => navigate('/auth?tab=signin')}
        >
          <LogIn className="h-4 w-4" />
          {t('auth.signIn')}
        </Button>
        <Button 
          className="w-full justify-start gap-1.5 button-gradient text-white"
          onClick={() => navigate('/auth?tab=signup')}
        >
          <User className="h-4 w-4" />
          {t('auth.signUp')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="gap-1.5 font-medium"
        onClick={() => navigate('/auth?tab=signin')}
      >
        <LogIn className="h-4 w-4" />
        {t('auth.signIn')}
      </Button>
      <Button 
        className="gap-1.5 button-gradient text-white"
        size="sm"
        onClick={() => navigate('/auth?tab=signup')}
      >
        <User className="h-4 w-4" />
        {t('auth.signUp')}
      </Button>
    </div>
  );
};

export default AuthButtons;
