
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Sample services data
  const services = [
    {
      id: 'service-1',
      title: t('profile.services.serviceTitle1'),
      description: t('profile.services.serviceDesc1'),
      status: 'active',
      usageCount: 15,
      usageLimit: 25,
      redirectTo: '/profile/services/text-check'
    },
    {
      id: 'service-2',
      title: t('profile.services.serviceTitle2'),
      description: t('profile.services.serviceDesc2'),
      status: 'inactive',
      usageCount: 0,
      usageLimit: 0,
      redirectTo: '/profile/services/text-check'
    },
    {
      id: 'service-3',
      title: t('profile.services.serviceTitle3'),
      description: t('profile.services.serviceDesc3'),
      status: 'active',
      usageCount: 5,
      usageLimit: 10,
      redirectTo: '/profile/services/text-check'
    }
  ];

  const handleServiceClick = (redirectTo: string) => {
    navigate(redirectTo);
  };

  return (
    <ProfileLayout activePage="services">
      <ProfilePageLayout
        titleKey="profile.services.title"
        cardTitleKey="profile.services.availableServices"
        cardDescriptionKey="profile.services.availableServicesDesc"
        showEmptyState={false}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <Badge variant={service.status === 'active' ? 'default' : 'outline'}>
                    {t(`profile.services.status.${service.status}`)}
                  </Badge>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                {service.status === 'active' && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{t('profile.services.usage')}</p>
                    <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${(service.usageCount / service.usageLimit) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {service.usageCount} / {service.usageLimit} {t('profile.services.usagesRemaining')}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant={service.status === 'active' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => handleServiceClick(service.redirectTo)}
                >
                  {service.status === 'active' 
                    ? t('profile.services.useService') 
                    : t('profile.services.activateService')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ProfilePageLayout>
    </ProfileLayout>
  );
};

export default ServicesPage;
