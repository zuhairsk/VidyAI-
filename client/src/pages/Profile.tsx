import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { fadeIn } from '@/lib/animations';

export default function Profile() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    grade: user?.gradeLevel || 5,
    language: user?.preferredLanguage || 'en',
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    quizReminders: true,
    newContent: true,
    achievements: true,
    communityMessages: false,
  });
  
  // Fetch user stats
  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/user/stats'],
  });
  
  // Sample user stats (in a real app, this would come from the API)
  const sampleStats = {
    quizzesCompleted: 12,
    coursesCompleted: 5,
    coursesInProgress: 3,
    totalLessonTime: 1240, // in minutes
    longestStreak: 14, // days
    currentStreak: 7, // days
  };
  
  // Sample progress data
  const sampleProgress = [
    { subject: 'Mathematics', icon: 'calculate', color: 'blue', progress: 75 },
    { subject: 'Science', icon: 'science', color: 'green', progress: 60 },
    { subject: 'Social Studies', icon: 'public', color: 'yellow', progress: 45 },
    { subject: 'Hindi', icon: 'translate', color: 'red', progress: 90 },
  ];
  
  // Sample achievements
  const sampleAchievements = [
    {
      id: 1,
      title: 'First Quiz',
      description: 'Completed your first quiz',
      dateEarned: '2023-10-15',
      icon: 'emoji_events',
      color: 'gold',
    },
    {
      id: 2,
      title: 'Knowledge Seeker',
      description: 'Completed 5 courses',
      dateEarned: '2023-11-02',
      icon: 'school',
      color: 'silver',
    },
    {
      id: 3,
      title: 'Perfect Score',
      description: 'Got 100% on a quiz',
      dateEarned: '2023-11-10',
      icon: 'stars',
      color: 'bronze',
    },
    {
      id: 4,
      title: 'Week Warrior',
      description: 'Studied for 7 days in a row',
      dateEarned: '2023-11-20',
      icon: 'local_fire_department',
      color: 'red',
    },
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would update the user profile
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: t('profile.profileUpdated'),
        description: t('profile.profileUpdatedDesc'),
      });
    }, 1000);
  };
  
  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
    
    toast({
      title: t('profile.settingsUpdated'),
      description: notifications[key] 
        ? t('profile.notificationDisabled') 
        : t('profile.notificationEnabled'),
    });
  };
  
  // Format minutes as hours and minutes
  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div style={fadeIn}>
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap -mb-px">
            <TabsTrigger value="profile" className="mr-8 py-4 px-1">
              {t('profile.profile')}
            </TabsTrigger>
            <TabsTrigger value="progress" className="mr-8 py-4 px-1">
              {t('profile.progress')}
            </TabsTrigger>
            <TabsTrigger value="achievements" className="mr-8 py-4 px-1">
              {t('profile.achievements')}
            </TabsTrigger>
            <TabsTrigger value="settings" className="mr-8 py-4 px-1">
              {t('profile.settings')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="profile" className={activeTab === 'profile' ? '' : 'hidden'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user?.avatarUrl || ''} alt={user?.fullName || ''} />
                    <AvatarFallback className="text-xl bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                      {getInitials(user?.fullName || user?.username || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user?.fullName || user?.username}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {t('profile.grade')} {user?.gradeLevel || 5}
                  </p>
                  
                  <div className="flex items-center mt-3">
                    <Badge
                      variant="secondary"
                      className="mr-2 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                    >
                      <span className="material-icons-round text-sm mr-1">school</span>
                      {t('profile.student')}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      <span className="material-icons-round text-sm mr-1">local_fire_department</span>
                      {sampleStats.currentStreak} {t('profile.dayStreak')}
                    </Badge>
                  </div>
                  
                  {!isEditing && (
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full"
                      onClick={() => setIsEditing(true)}
                    >
                      <span className="material-icons-round text-sm mr-1">edit</span>
                      {t('profile.editProfile')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-md font-medium text-gray-900 dark:text-white">
                  {t('profile.stats')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('profile.coursesCompleted')}
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {sampleStats.coursesCompleted}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('profile.quizzesCompleted')}
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {sampleStats.quizzesCompleted}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('profile.totalStudyTime')}
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatStudyTime(sampleStats.totalLessonTime)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('profile.longestStreak')}
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {sampleStats.longestStreak} {t('profile.days')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {isEditing ? t('profile.editYourProfile') : t('profile.profileInformation')}
                </h3>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">{t('profile.fullName')}</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">{t('profile.email')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="grade">{t('profile.gradeLevel')}</Label>
                        <select
                          id="grade"
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900 dark:text-gray-100 sm:text-sm"
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                            <option key={grade} value={grade}>{t('profile.grade')} {grade}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="language">{t('profile.preferredLanguage')}</Label>
                        <select
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900 dark:text-gray-100 sm:text-sm"
                        >
                          <option value="en">English</option>
                          <option value="hi">हिंदी</option>
                          <option value="te">తెలుగు</option>
                          <option value="ta">தமிழ்</option>
                          <option value="mr">मराठी</option>
                        </select>
                      </div>
                      
                      <div className="flex space-x-3 pt-4">
                        <Button type="submit">
                          {t('profile.saveChanges')}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          {t('profile.cancel')}
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('profile.fullName')}
                      </h4>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {user?.fullName || t('profile.notProvided')}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('profile.email')}
                      </h4>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {user?.email || t('profile.notProvided')}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('profile.username')}
                      </h4>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {user?.username}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('profile.gradeLevel')}
                      </h4>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {t('profile.grade')} {user?.gradeLevel || 5}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('profile.preferredLanguage')}
                      </h4>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {user?.preferredLanguage === 'en' ? 'English' :
                         user?.preferredLanguage === 'hi' ? 'हिंदी' :
                         user?.preferredLanguage === 'te' ? 'తెలుగు' :
                         user?.preferredLanguage === 'ta' ? 'தமிழ்' :
                         user?.preferredLanguage === 'mr' ? 'मराठी' : 'English'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('profile.accountCreated')}
                      </h4>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="progress" className={activeTab === 'progress' ? '' : 'hidden'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('profile.subjectProgress')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {sampleProgress.map((item, index) => (
                    <ProgressBar
                      key={index}
                      value={item.progress}
                      label={t(`subjects.${item.subject.toLowerCase()}`)}
                      color={item.color as any}
                      icon={item.icon}
                      size="lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('profile.currentCourses')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
                          {t('subjects.mathematics')}
                        </Badge>
                        <h4 className="text-gray-900 dark:text-white font-medium">
                          Introduction to Fractions
                        </h4>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-2">
                          {t('subjects.science')}
                        </Badge>
                        <h4 className="text-gray-900 dark:text-white font-medium">
                          Our Solar System
                        </h4>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mb-2">
                          {t('subjects.hindi')}
                        </Badge>
                        <h4 className="text-gray-900 dark:text-white font-medium">
                          Hindi Grammar Essentials
                        </h4>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">0%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('profile.studyStats')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="material-icons-round text-primary-500 mr-2">timer</span>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.totalStudyTime')}
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatStudyTime(sampleStats.totalLessonTime)}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="material-icons-round text-primary-500 mr-2">calendar_today</span>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.studyStreak')}
                      </h4>
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons-round text-yellow-500 text-2xl">local_fire_department</span>
                      <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {sampleStats.currentStreak} {t('profile.days')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t('profile.longestStreak')}: {sampleStats.longestStreak} {t('profile.days')}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="material-icons-round text-primary-500 mr-2">insights</span>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.completionStats')}
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {sampleStats.coursesCompleted}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {t('profile.coursesCompleted')}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {sampleStats.quizzesCompleted}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {t('profile.quizzesCompleted')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="achievements" className={activeTab === 'achievements' ? '' : 'hidden'}>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('profile.yourAchievements')}
              </h3>
              <Badge variant="outline" className="bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                {sampleAchievements.length} {t('profile.earned')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleAchievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start"
                >
                  <div className={`flex-shrink-0 rounded-full p-3 bg-${achievement.color}-100 dark:bg-${achievement.color}-900`}>
                    <span className={`material-icons-round text-${achievement.color}-600 dark:text-${achievement.color}-400`}>
                      {achievement.icon}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-gray-900 dark:text-white font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {t('profile.earnedOn')} {new Date(achievement.dateEarned).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="settings" className={activeTab === 'settings' ? '' : 'hidden'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('profile.notificationSettings')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.courseUpdates')}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('profile.courseUpdatesDesc')}
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.courseUpdates}
                      onCheckedChange={() => handleToggleNotification('courseUpdates')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.quizReminders')}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('profile.quizRemindersDesc')}
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.quizReminders}
                      onCheckedChange={() => handleToggleNotification('quizReminders')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.newContent')}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('profile.newContentDesc')}
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.newContent}
                      onCheckedChange={() => handleToggleNotification('newContent')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.achievements')}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('profile.achievementsDesc')}
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.achievements}
                      onCheckedChange={() => handleToggleNotification('achievements')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.communityMessages')}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('profile.communityMessagesDesc')}
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.communityMessages}
                      onCheckedChange={() => handleToggleNotification('communityMessages')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('profile.accessibilitySettings')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.textToSpeech')}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('profile.textToSpeechDesc')}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.highContrast')}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('profile.highContrastDesc')}
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">
                        {t('profile.largerText')}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('profile.largerTextDesc')}
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('profile.accountSettings')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsEditing(true)}
                  >
                    <span className="material-icons-round text-gray-500 mr-2">edit</span>
                    {t('profile.editProfile')}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <span className="material-icons-round text-gray-500 mr-2">lock</span>
                    {t('profile.changePassword')}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <span className="material-icons-round text-gray-500 mr-2">language</span>
                    {t('profile.changeLanguage')}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <span className="material-icons-round text-gray-500 mr-2">download</span>
                    {t('profile.downloadData')}
                  </Button>
                  
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                    >
                      <span className="material-icons-round mr-2">logout</span>
                      {t('profile.logout')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('profile.help')}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="material-icons-round text-gray-500 mr-2">help_outline</span>
                    {t('profile.helpCenter')}
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="material-icons-round text-gray-500 mr-2">help</span>
                    {t('profile.faq')}
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="material-icons-round text-gray-500 mr-2">contact_support</span>
                    {t('profile.contactSupport')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </div>
  );
}
