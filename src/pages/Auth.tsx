
import React, { useState, useEffect } from 'react';
import { 
  useSignIn, 
  useSignUp, 
  SignIn as ClerkSignIn, 
  SignUp as ClerkSignUp,
  useClerk
} from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Auth = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const clerk = useClerk();
  
  // Check for tab query parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'signin' || tab === 'signup') {
      setActiveTab(tab);
    }
  }, [location.search]);
  
  // Map our app language to Clerk locale
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'uk': 'uk-UA',
    'cs': 'cs-CZ'
  };
  
  const currentLocale = localeMap[language] || 'en-US';

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'signin' | 'signup');
  };

  if (!isSignInLoaded || !isSignUpLoaded) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="animate-pulse">
            <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Card className="backdrop-blur-sm bg-background/80 border shadow-lg w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">{t('auth.welcome')}</CardTitle>
            <CardDescription>
              {activeTab === 'signin' ? t('auth.signInDescription') : t('auth.signUpDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">{t('auth.signIn')}</TabsTrigger>
                <TabsTrigger value="signup">{t('auth.signUp')}</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-0">
                <ClerkSignIn 
                  signUpUrl="/auth?tab=signup"
                  redirectUrl="/"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "w-full shadow-none p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "button-gradient text-white font-medium",
                      formButtonPrimary: "button-gradient text-white font-medium",
                      footerAction: "text-primary",
                      dividerLine: "bg-border",
                      dividerText: "text-muted-foreground",
                      formFieldInput: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      formFieldLabel: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      identityPreviewText: "text-sm text-muted-foreground",
                      identityPreviewEditButton: "text-primary",
                      formFieldAction: "text-primary text-sm font-medium",
                      footerActionLink: "text-primary hover:text-primary/80",
                      navbar: "hidden",
                      main: "!p-0"
                    }
                  }}
                />
              </TabsContent>
              <TabsContent value="signup" className="mt-0">
                <ClerkSignUp 
                  signInUrl="/auth?tab=signin"
                  redirectUrl="/"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "w-full shadow-none p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "button-gradient text-white font-medium",
                      formButtonPrimary: "button-gradient text-white font-medium",
                      footerAction: "text-primary",
                      dividerLine: "bg-border",
                      dividerText: "text-muted-foreground",
                      formFieldInput: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      formFieldLabel: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      identityPreviewText: "text-sm text-muted-foreground",
                      identityPreviewEditButton: "text-primary",
                      otpCodeFieldInput: "flex h-10 w-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-center",
                      formFieldAction: "text-primary text-sm font-medium",
                      footerActionLink: "text-primary hover:text-primary/80",
                      navbar: "hidden",
                      main: "!p-0"
                    }
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              {t('common.back')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Auth;
