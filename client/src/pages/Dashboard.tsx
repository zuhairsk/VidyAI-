import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseCard } from '@/components/shared/CourseCard';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { AchievementCard } from '@/components/shared/AchievementCard';
import { startSpeechRecognition } from '@/utils/speechUtils';

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  // Fetch user progress
  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/progress'],
  });
  
  // Fetch recommended courses
  const { data: recommendedCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ['/api/courses/recommended'],
  });
  
  // Fetch recent achievements
  const { data: achievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ['/api/achievements/recent'],
  });
  
  // Sample data for progress (in a real app, this would come from the API)
  const sampleProgress = [
    { subject: 'Mathematics', icon: 'calculate', color: 'blue', progress: 75 },
    { subject: 'Science', icon: 'science', color: 'green', progress: 60 },
    { subject: 'Social Studies', icon: 'public', color: 'yellow', progress: 45 },
    { subject: 'Hindi', icon: 'translate', color: 'red', progress: 90 },
  ];
  
  // Sample data for achievements (in a real app, this would come from the API)
  const sampleAchievements = [
    { 
      title: 'Science Explorer', 
      description: 'Completed 5 science lessons', 
      iconName: 'emoji_events', 
      colorClass: 'yellow' 
    },
    { 
      title: 'Quiz Champion', 
      description: 'Scored 90% on 3 consecutive quizzes', 
      iconName: 'auto_awesome', 
      colorClass: 'green' 
    },
    { 
      title: 'Consistent Learner', 
      description: 'Studied for 7 days in a row', 
      iconName: 'mood', 
      colorClass: 'blue' 
    },
  ];
  
  // Sample data for recommended courses (in a real app, this would come from the API)
  const sampleCourses = [
    {
      id: 1,
      title: 'Algebra Fundamentals',
      description: 'Master the basics of algebra with interactive lessons and practice problems.',
      subjectId: 1, // Mathematics
      gradeLevel: 5,
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350&q=80',
      totalLessons: 10,
      durationMinutes: 300,
    },
    {
      id: 2,
      title: 'Human Body Systems',
      description: 'Explore the amazing systems of the human body through interactive 3D models.',
      subjectId: 2, // Science
      gradeLevel: 6,
      imageUrl: 'https://images.unsplash.com/photo-1536094908688-b3d7ea7d064e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350&q=80',
      totalLessons: 8,
      durationMinutes: 240,
    },
    {
      id: 3,
      title: 'Ancient Indian Civilizations',
      description: 'Journey through the rich history of ancient Indian civilizations with virtual tours.',
      subjectId: 6, // History
      gradeLevel: 7,
      imageUrl: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80',
      totalLessons: 12,
      durationMinutes: 360,
    },
    {
      id: 4,
      title: 'Creative Hindi Writing',
      description: 'Enhance your Hindi writing skills through creative storytelling and poetry.',
      subjectId: 4, // Hindi
      gradeLevel: 4,
      imageUrl: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80',
      totalLessons: 6,
      durationMinutes: 180,
    },
  ];
  
  const startVoiceAssistant = () => {
    startSpeechRecognition((transcript) => {
      // In a real app, this would send the transcript to an AI for processing
      console.log('Voice command detected:', transcript);
    });
  };

  return (
    <div>
      {/* Dashboard Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="flex flex-wrap -mb-px">
            <TabsTrigger value="dashboard" className="mr-8 py-4 px-1">
              {t('dashboard.dashboard')}
            </TabsTrigger>
            <TabsTrigger value="courses" className="mr-8 py-4 px-1">
              {t('dashboard.myCourses')}
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="mr-8 py-4 px-1">
              {t('dashboard.quizzes')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute top-0 right-0 -mt-4 -mr-16 w-40 h-40 bg-white dark:bg-gray-800 opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 h-24 bg-white dark:bg-gray-800 opacity-10 rounded-full"></div>
        
        <div className="px-6 py-8 md:py-10 md:px-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="material-icons-round text-white text-3xl animate-bounce">assistant</span>
              <h2 className="ml-2 text-white text-lg md:text-2xl font-heading font-bold">
                {t('dashboard.welcomeBack', { name: user?.fullName || user?.username || 'Student' })}
              </h2>
            </div>
            <p className="mt-2 text-primary-100 max-w-xl">
              {t('dashboard.continueJourney')} {user?.gradeLevel ? `${t('courses.gradeText')} ${user?.gradeLevel}` : ''}
            </p>
            
            <div className="mt-4 flex space-x-3">
              <Button 
                variant="secondary" 
                className="bg-white text-primary-700 hover:bg-primary-50"
                asChild
              >
                <Link href="/courses">
                  <span className="material-icons-round mr-1 text-sm">play_arrow</span>
                  {t('dashboard.resumeLearning')}
                </Link>
              </Button>
              <Button 
                variant="outline"
                className="bg-primary-700 bg-opacity-30 hover:bg-opacity-40 text-white border-transparent"
                onClick={startVoiceAssistant}
              >
                <span className="material-icons-round mr-1 text-sm">headphones</span>
                {t('dashboard.voiceAssistant')}
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block h-40 w-auto rounded-lg shadow-md ml-6 transform rotate-3 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=250&q=80" 
              alt="Student studying" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Your Progress Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-white">
                  {t('dashboard.yourProgress')}
                </h3>
                <Link href="/progress">
                  <a className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    {t('dashboard.viewAll')}
                  </a>
                </Link>
              </div>
              
              <div className="space-y-5">
                {sampleProgress.map((item, index) => (
                  <ProgressBar
                    key={index}
                    value={item.progress}
                    label={t(`subjects.${item.subject.toLowerCase()}`)}
                    color={item.color as any}
                    icon={item.icon}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Achievements Section */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-white">
                  {t('dashboard.recentAchievements')}
                </h3>
                <Link href="/achievements">
                  <a className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    {t('dashboard.viewAll')}
                  </a>
                </Link>
              </div>
              
              <div className="space-y-4">
                {sampleAchievements.map((achievement, index) => (
                  <AchievementCard
                    key={index}
                    title={achievement.title}
                    description={achievement.description}
                    iconName={achievement.iconName}
                    colorClass={achievement.colorClass as any}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recommended Courses */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-white">
            {t('dashboard.recommendedCourses')}
          </h3>
          <Link href="/courses">
            <a className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              {t('dashboard.viewAll')}
            </a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sampleCourses.map((course) => {
            // Add missing properties required by the Course type
            const courseWithDefaults = {
              ...course,
              createdAt: new Date(),
              featured: false
            };
            
            return (
              <CourseCard
                key={course.id}
                course={courseWithDefaults}
                studentsCount={Math.floor(Math.random() * 400) + 100}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
