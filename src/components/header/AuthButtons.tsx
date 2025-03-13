
import { useNavigate } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { t } = useLanguage();

  if (isSignedIn) {
    if (isMobile) {
      return (
        <div className="flex items-center gap-3 px-3 py-2">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
              }
            }}
          />
          <span className="text-sm font-medium">{t('auth.account')}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center">
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
