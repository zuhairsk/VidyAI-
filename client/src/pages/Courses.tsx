import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseCard } from '@/components/shared/CourseCard';

export default function Courses() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [gradeFilter, setGradeFilter] = useState<number | ''>('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Fetch courses
  const { data: courses, isLoading } = useQuery({
    queryKey: ['/api/courses'],
  });
  
  // Sample data for courses (in a real app, this would come from the API)
  const sampleCourses = [
    {
      id: 1,
      title: 'Introduction to Fractions',
      description: 'Learn the basics of fractions and how to work with them.',
      subjectId: 1, // Mathematics
      gradeLevel: 5,
      imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80',
      totalLessons: 8,
      durationMinutes: 240,
    },
    {
      id: 2,
      title: 'Our Solar System',
      description: 'Explore the planets, moons, and other objects in our solar system.',
      subjectId: 2, // Science
      gradeLevel: 5,
      imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80',
      totalLessons: 10,
      durationMinutes: 300,
    },
    {
      id: 3,
      title: 'Hindi Grammar Essentials',
      description: 'Master the fundamentals of Hindi grammar rules and usage.',
      subjectId: 4, // Hindi
      gradeLevel: 5,
      imageUrl: 'https://images.unsplash.com/photo-1582921221088-a57ced19c708?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80',
      totalLessons: 12,
      durationMinutes: 360,
    },
    {
      id: 4,
      title: 'Algebra Fundamentals',
      description: 'Learn the basics of algebra with interactive lessons.',
      subjectId: 1, // Mathematics
      gradeLevel: 6,
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350&q=80',
      totalLessons: 10,
      durationMinutes: 300,
    },
    {
      id: 5,
      title: 'Human Body Systems',
      description: 'Explore the amazing systems of the human body.',
      subjectId: 2, // Science
      gradeLevel: 6,
      imageUrl: 'https://images.unsplash.com/photo-1536094908688-b3d7ea7d064e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350&q=80',
      totalLessons: 8,
      durationMinutes: 240,
    },
    {
      id: 6,
      title: 'Ancient Indian Civilizations',
      description: 'Journey through the rich history of ancient Indian civilizations.',
      subjectId: 6, // History
      gradeLevel: 7,
      imageUrl: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80',
      totalLessons: 12,
      durationMinutes: 360,
    },
  ];
  
  // User progress data (in a real app, this would come from the API)
  const userProgress = [
    { courseId: 1, percentComplete: 25, lessonsCompleted: 2 },
    { courseId: 2, percentComplete: 60, lessonsCompleted: 6 },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search API call
    console.log('Searching for:', searchQuery);
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSubjectFilter('');
    setGradeFilter('');
  };
  
  // Filter and display courses based on search, subject, grade, and tab
  const filteredCourses = sampleCourses.filter(course => {
    // Search filter
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Subject filter
    if (subjectFilter && course.subjectId.toString() !== subjectFilter) {
      return false;
    }
    
    // Grade filter
    if (gradeFilter !== '' && course.gradeLevel !== gradeFilter) {
      return false;
    }
    
    // Tab filter
    if (activeTab === 'recommended') {
      // In a real app, this would check if course is recommended
      return [1, 4, 6].includes(course.id);
    } else if (activeTab === 'inProgress') {
      // Check if course is in progress
      return userProgress.some(progress => 
        progress.courseId === course.id && progress.percentComplete > 0 && progress.percentComplete < 100
      );
    } else if (activeTab === 'completed') {
      // Check if course is completed
      return userProgress.some(progress => 
        progress.courseId === course.id && progress.percentComplete === 100
      );
    }
    
    return true;
  });
  
  // Get progress for a course
  const getCourseProgress = (courseId: number) => {
    const progress = userProgress.find(p => p.courseId === courseId);
    return progress ? progress.percentComplete : 0;
  };
  
  // Subjects data for filter
  const subjects = [
    { id: 1, name: t('subjects.mathematics') },
    { id: 2, name: t('subjects.science') },
    { id: 3, name: t('subjects.socialStudies') },
    { id: 4, name: t('subjects.hindi') },
    { id: 5, name: t('subjects.english') },
    { id: 6, name: t('subjects.history') },
    { id: 7, name: t('subjects.geography') },
    { id: 8, name: t('subjects.civics') },
    { id: 9, name: t('subjects.economics') },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
          {t('courses.myCourses')}
        </h2>
        
        <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400 text-sm">search</span>
            </div>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2"
              placeholder={t('courses.searchPlaceholder')}
            />
          </form>
          
          <div className="relative">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">{t('courses.filterBySubject')}</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
            <span className="material-icons-round absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-sm">arrow_drop_down</span>
          </div>
          
          <div className="relative">
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value === '' ? '' : parseInt(e.target.value))}
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">{t('courses.gradeLevel')}</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                <option key={grade} value={grade}>{t('courses.grade')} {grade}</option>
              ))}
            </select>
            <span className="material-icons-round absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-sm">arrow_drop_down</span>
          </div>
          
          <Button
            onClick={resetFilters}
            variant="outline"
          >
            {t('courses.reset')}
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">{t('courses.allCourses')}</TabsTrigger>
                <TabsTrigger value="recommended">{t('courses.recommended')}</TabsTrigger>
                <TabsTrigger value="inProgress">{t('courses.inProgress')}</TabsTrigger>
                <TabsTrigger value="completed">{t('courses.completed')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredCourses.map((course) => {
                const progress = getCourseProgress(course.id);
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    inProgress={progress > 0}
                    percentComplete={progress}
                    compact={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <span className="material-icons-round text-gray-400 text-5xl mb-4">search_off</span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('courses.noCourses')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {t('courses.noCoursesDesc')}
              </p>
              <Button 
                variant="default"
                className="mt-4"
                onClick={resetFilters}
              >
                {t('courses.clearFilters')}
              </Button>
            </div>
          )}
          
          {filteredCourses.length > 0 && (
            <div className="py-3 px-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center">
              <Button variant="link" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 flex items-center justify-center mx-auto">
                <span className="material-icons-round mr-1">add</span>
                {t('courses.browseMore')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
