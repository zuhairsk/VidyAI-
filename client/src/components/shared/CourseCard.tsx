import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Course } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  inProgress?: boolean;
  percentComplete?: number;
  compact?: boolean;
  studentsCount?: number;
}

export function CourseCard({ 
  course, 
  inProgress = false, 
  percentComplete = 0, 
  compact = false, 
  studentsCount 
}: CourseCardProps) {
  const { t } = useLanguage();

  // Subject code to icon and color mapping
  const subjectIcons: Record<string, { icon: string, colorClass: string }> = {
    'math': { icon: 'calculate', colorClass: 'bg-blue-500' },
    'science': { icon: 'science', colorClass: 'bg-green-500' },
    'social': { icon: 'public', colorClass: 'bg-yellow-500' },
    'hindi': { icon: 'translate', colorClass: 'bg-red-500' },
    'english': { icon: 'auto_stories', colorClass: 'bg-purple-500' },
    'history': { icon: 'history_edu', colorClass: 'bg-yellow-500' },
    'geography': { icon: 'terrain', colorClass: 'bg-emerald-500' },
    'civics': { icon: 'account_balance', colorClass: 'bg-teal-500' },
    'economics': { icon: 'attach_money', colorClass: 'bg-amber-500' },
  };

  // Default fallback if subject not found
  const subjectInfo = subjectIcons[course.subjectId.toString()] || { 
    icon: 'school', 
    colorClass: 'bg-primary-500' 
  };

  // Generate status based on progress
  const getStatusInfo = () => {
    if (!inProgress) {
      return {
        text: t('courses.notStarted'),
        bgClass: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
        icon: 'bookmark'
      };
    } else if (percentComplete === 100) {
      return {
        text: t('courses.completed'),
        bgClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        icon: 'check_circle'
      };
    } else {
      return {
        text: t('courses.inProgress'),
        bgClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        icon: 'play_circle'
      };
    }
  };

  const status = getStatusInfo();

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          {course.imageUrl && (
            <div className="h-32 w-full">
              <img 
                className="h-full w-full object-cover" 
                src={course.imageUrl} 
                alt={course.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
            </div>
          )}
          <div className={cn("absolute top-2 right-2 text-xs rounded-full px-2 py-1 flex items-center gap-1", status.bgClass)}>
            <span className="material-icons-round text-xs">{status.icon}</span>
            {status.text}
          </div>
          {course.imageUrl ? (
            <div className="absolute bottom-0 left-0 p-4">
              <Badge className={subjectInfo.colorClass}>{t(`subjects.${course.subjectId}`)}</Badge>
              <h4 className="mt-1 text-white font-medium">{course.title}</h4>
            </div>
          ) : (
            <div className="p-4">
              <Badge className={subjectInfo.colorClass}>{t(`subjects.${course.subjectId}`)}</Badge>
              <h4 className="mt-1 text-gray-900 dark:text-white font-medium">{course.title}</h4>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="material-icons-round text-xs mr-1">schedule</span>
            <span>{course.totalLessons} {t('courses.lessons')}</span>
            <span className="mx-2">•</span>
            <span className="material-icons-round text-xs mr-1">grade</span>
            <span>{t('courses.grade')} {course.gradeLevel}</span>
          </div>
          
          {inProgress && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-300">
                  {percentComplete}% {t('courses.complete')}
                </span>
                <span className={percentComplete === 100 ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}>
                  {Math.round(course.totalLessons * percentComplete / 100)}/{course.totalLessons}
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                <div 
                  className={cn(
                    "h-1.5 rounded-full",
                    percentComplete === 100 ? "bg-green-600" : "bg-blue-600"
                  )} 
                  style={{ width: `${percentComplete}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <Button 
            className="mt-4 w-full"
            variant="default"
            asChild
          >
            <Link href={`/course/${course.id}`}>
              {inProgress 
                ? percentComplete === 100 
                  ? t('courses.review') 
                  : t('courses.continue') 
                : t('courses.start')
              }
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Full (non-compact) version
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-36">
        {course.imageUrl ? (
          <img 
            className="h-full w-full object-cover" 
            src={course.imageUrl} 
            alt={course.title} 
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-primary-600 to-secondary-500 flex items-center justify-center">
            <span className="material-icons-round text-white text-5xl">{subjectInfo.icon}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <Badge className={subjectInfo.colorClass}>{t(`subjects.${course.subjectId}`)}</Badge>
          <h4 className="mt-1 text-white font-medium">{course.title}</h4>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="material-icons-round text-xs mr-1">schedule</span>
          <span>{course.totalLessons} {t('courses.lessons')}</span>
          <span className="mx-2">•</span>
          <span className="material-icons-round text-xs mr-1">grade</span>
          <span>{t('courses.grade')} {course.gradeLevel}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {course.description || t('courses.noDescription')}
        </p>
        <div className="mt-4 flex items-center justify-between">
          {studentsCount !== undefined && (
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs text-white">S</div>
                <div className="h-6 w-6 rounded-full bg-gray-400 dark:bg-gray-500 flex items-center justify-center text-xs text-white">T</div>
              </div>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                {studentsCount} {t('courses.students')}
              </span>
            </div>
          )}
          <Button 
            variant="link" 
            className="text-primary-600 dark:text-primary-400 hover:text-primary-500 p-0"
            asChild
          >
            <Link href={`/course/${course.id}`}>
              {t('courses.start')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
