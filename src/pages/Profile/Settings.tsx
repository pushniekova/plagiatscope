
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'uk', name: t('language.uk') },
    { code: 'en', name: t('language.en') },
    { code: 'cs', name: t('language.cs') }
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <ProfileLayout activePage="settings">
      <ProfilePageLayout
        titleKey="profile.settings.title"
        cardTitleKey="profile.settings.accountSettings"
        cardDescriptionKey="profile.settings.accountSettingsDesc"
        showEmptyState={false}
      >
        <div className="space-y-6">
          {/* Language settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>{t('profile.settings.language.title')}</CardTitle>
              </div>
              <CardDescription>{t('profile.settings.language.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={language} 
                onValueChange={handleLanguageChange}
                className="space-y-3"
              >
                {languages.map((lang) => (
                  <div key={lang.code} className="flex items-center space-x-2">
                    <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                    <Label htmlFor={`lang-${lang.code}`}>{lang.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('profile.settings.notifications')}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">{t('profile.settings.emailNotifications')}</Label>
                  <p className="text-sm text-muted-foreground">{t('profile.settings.emailNotificationsDesc')}</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing">{t('profile.settings.marketingEmails')}</Label>
                  <p className="text-sm text-muted-foreground">{t('profile.settings.marketingEmailsDesc')}</p>
                </div>
                <Switch id="marketing" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('profile.settings.security')}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">{t('profile.settings.twoFactor')}</Label>
                  <p className="text-sm text-muted-foreground">{t('profile.settings.twoFactorDesc')}</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </div>
          </div>
        </div>
      </ProfilePageLayout>
    </ProfileLayout>
  );
};

export default SettingsPage;
