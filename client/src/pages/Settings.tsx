import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, LanguageCode } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { fadeIn, slideInUp } from '@/lib/animations';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export default function Settings() {
  const { user } = useAuth();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    courseUpdates: true,
    quizReminders: true,
    newContent: false,
    achievements: true,
    communityMessages: false,
  });

  // Accessibility settings
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    textToSpeech: false,
    highContrast: false,
    largerText: false,
  });

  // Handle notification toggle
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      // Show toast
      toast({
        title: t('profile.settingsUpdated'),
        description: newSettings[setting] 
          ? t('profile.notificationEnabled') 
          : t('profile.notificationDisabled'),
        variant: 'default',
      });
      
      return newSettings;
    });
  };

  // Handle accessibility toggle
  const handleAccessibilityToggle = (setting: keyof typeof accessibilitySettings) => {
    setAccessibilitySettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      // Show toast
      toast({
        title: t('profile.settingsUpdated'),
        description: `${t('profile.' + setting)} ${newSettings[setting] ? 'enabled' : 'disabled'}.`,
        variant: 'default',
      });
      
      return newSettings;
    });
  };

  // Handle language change
  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    
    toast({
      title: t('profile.settingsUpdated'),
      description: `Language changed to ${availableLanguages.find(l => l.code === lang)?.name}.`,
      variant: 'default',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-8"
      >
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          {t('profile.settings')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {t('profile.editYourProfile')}
        </p>
      </motion.div>
      
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-primary-100 dark:bg-primary-900 border-0 p-1">
          <TabsTrigger value="notifications" className="text-sm font-medium">
            {t('profile.notificationSettings')}
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="text-sm font-medium">
            {t('profile.accessibilitySettings')}
          </TabsTrigger>
          <TabsTrigger value="account" className="text-sm font-medium">
            {t('profile.accountSettings')}
          </TabsTrigger>
        </TabsList>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideInUp}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  {t('profile.notificationSettings')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('profile.courseUpdates')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('profile.courseUpdatesDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.courseUpdates}
                    onCheckedChange={() => handleNotificationToggle('courseUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('profile.quizReminders')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('profile.quizRemindersDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.quizReminders}
                    onCheckedChange={() => handleNotificationToggle('quizReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('profile.newContent')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('profile.newContentDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newContent}
                    onCheckedChange={() => handleNotificationToggle('newContent')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('profile.achievements')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('profile.achievementsDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.achievements}
                    onCheckedChange={() => handleNotificationToggle('achievements')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('profile.communityMessages')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('profile.communityMessagesDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.communityMessages}
                    onCheckedChange={() => handleNotificationToggle('communityMessages')}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Accessibility Tab */}
        <TabsContent value="accessibility">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideInUp}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  {t('profile.accessibilitySettings')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('profile.textToSpeech')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('profile.textToSpeechDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={accessibilitySettings.textToSpeech}
                    onCheckedChange={() => handleAccessibilityToggle('textToSpeech')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('profile.highContrast')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('profile.highContrastDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={accessibilitySettings.highContrast}
                    onCheckedChange={() => handleAccessibilityToggle('highContrast')}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('profile.largerText')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('profile.largerTextDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={accessibilitySettings.largerText}
                    onCheckedChange={() => handleAccessibilityToggle('largerText')}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  {t('profile.changeLanguage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Choose your preferred language for the application interface:
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {availableLanguages.map((lang) => (
                      <div
                        key={lang.code} 
                        className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border transition-all ${
                          language === lang.code 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                        onClick={() => handleLanguageChange(lang.code)}
                      >
                        <div className="flex-shrink-0 text-2xl">
                          {lang.code === 'en' ? '🇺🇸' : '🇮🇳'}
                        </div>
                        <div>
                          <h4 className="font-medium">{lang.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {lang.code === 'en' ? 'English' : 
                             lang.code === 'hi' ? 'हिंदी (Hindi)' : 
                             lang.code === 'te' ? 'తెలుగు (Telugu)' : 
                             lang.code === 'ta' ? 'தமிழ் (Tamil)' : 
                             'मराठी (Marathi)'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideInUp}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  {t('profile.accountSettings')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                    {t('profile.changePassword')}
                  </h3>
                  
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <InputOTP maxLength={6} className="gap-2">
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <InputOTP maxLength={6} className="gap-2">
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    <Button className="mt-2">
                      {t('profile.changePassword')}
                    </Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                    {t('profile.downloadData')}
                  </h3>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    You can download all your data including your profile, course progress, and quiz results.
                  </p>
                  
                  <Button variant="outline">
                    {t('profile.downloadData')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}