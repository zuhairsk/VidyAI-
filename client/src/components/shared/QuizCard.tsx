import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  id: number;
  title: string;
  subjectId: number;
  gradeLevel: number;
  questionCount: number;
  durationMinutes: number;
  isCompleted?: boolean;
  score?: number;
  compact?: boolean;
}

export function QuizCard({
  id,
  title,
  subjectId,
  gradeLevel,
  questionCount,
  durationMinutes,
  isCompleted = false,
  score,
  compact = false,
}: QuizCardProps) {
  const { t } = useLanguage();

  // Subject code to icon and color mapping
  const subjectIcons: Record<string, { icon: string, color: string }> = {
    '1': { icon: 'calculate', color: 'blue' },
    '2': { icon: 'science', color: 'green' },
    '3': { icon: 'public', color: 'yellow' },
    '4': { icon: 'translate', color: 'red' },
    '5': { icon: 'auto_stories', color: 'purple' },
    '6': { icon: 'history_edu', color: 'yellow' },
    '7': { icon: 'terrain', color: 'emerald' },
    '8': { icon: 'account_balance', color: 'teal' },
    '9': { icon: 'attach_money', color: 'amber' },
  };

  const { icon, color } = subjectIcons[subjectId.toString()] || { icon: 'quiz', color: 'primary' };

  if (compact) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className={`flex-shrink-0 h-10 w-10 rounded-full bg-${color}-100 dark:bg-${color}-900 flex items-center justify-center`}>
              <span className={`material-icons-round text-${color}-600 dark:text-${color}-400`}>{icon}</span>
            </span>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('quizzes.grade')} {gradeLevel} • {questionCount} {t('quizzes.questions')} • {durationMinutes} {t('quizzes.minutes')}
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="px-3 py-1.5 h-auto"
            asChild
          >
            <Link href={`/quiz/${id}`}>
              {isCompleted ? t('quizzes.retake') : t('quizzes.start')}
            </Link>
          </Button>
        </div>
        {isCompleted && score !== undefined && (
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{t('quizzes.yourScore')}</span>
            <Badge variant={score >= 70 ? "success" : score >= 50 ? "warning" : "destructive"}>
              {score}%
            </Badge>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <div className={`h-12 w-12 rounded-lg bg-${color}-100 dark:bg-${color}-900 flex items-center justify-center mr-4`}>
          <span className={`material-icons-round text-${color}-600 dark:text-${color}-400 text-xl`}>{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('quizzes.subject')}: {t(`subjects.${subjectId}`)} • {t('quizzes.grade')} {gradeLevel}
          </p>
        </div>
        {isCompleted && score !== undefined && (
          <Badge 
            className="ml-auto" 
            variant={score >= 70 ? "success" : score >= 50 ? "warning" : "destructive"}
          >
            {score}%
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 flex items-center">
          <span className="material-icons-round text-gray-500 dark:text-gray-400 mr-2">quiz</span>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('quizzes.questions')}</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{questionCount}</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 flex items-center">
          <span className="material-icons-round text-gray-500 dark:text-gray-400 mr-2">timer</span>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('quizzes.duration')}</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{durationMinutes} {t('quizzes.minutes')}</p>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full"
        asChild
      >
        <Link href={`/quiz/${id}`}>
          {isCompleted 
            ? (score !== undefined && score >= 70) 
              ? t('quizzes.reviewQuiz') 
              : t('quizzes.retakeQuiz') 
            : t('quizzes.startQuiz')
          }
        </Link>
      </Button>
    </div>
  );
}
