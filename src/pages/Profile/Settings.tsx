
import React from 'react';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SettingsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <ProfileLayout activePage="settings">
      <ProfilePageLayout
        titleKey="profile.settings.title"
        cardTitleKey="profile.settings.accountSettings"
        cardDescriptionKey="profile.settings.accountSettingsDesc"
        showEmptyState={false}
      >
        <div className="space-y-6">
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
