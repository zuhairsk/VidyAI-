import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizCard } from '@/components/shared/QuizCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { QuizOption } from '@/components/shared/QuizOption';
import { speakText } from '@/utils/speechUtils';

export default function Quizzes() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Fetch quizzes
  const { data: quizzes, isLoading } = useQuery({
    queryKey: ['/api/quizzes']
  });
  
  // Sample quiz data (in a real app, this would come from the API)
  const sampleQuizzes = [
    {
      id: 1,
      title: 'Algebra Basics Quiz',
      subjectId: 1, // Mathematics
      gradeLevel: 6,
      questionCount: 15,
      durationMinutes: 20,
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Human Body Systems Quiz',
      subjectId: 2, // Science
      gradeLevel: 6,
      questionCount: 12,
      durationMinutes: 15,
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Ancient Indian Civilizations Quiz',
      subjectId: 6, // History
      gradeLevel: 7,
      questionCount: 10,
      durationMinutes: 15,
      isCompleted: true,
      score: 80,
    },
    {
      id: 4,
      title: 'Hindi Grammar Quiz',
      subjectId: 4, // Hindi
      gradeLevel: 5,
      questionCount: 15,
      durationMinutes: 25,
      isCompleted: true,
      score: 65,
    },
    {
      id: 5,
      title: 'English Comprehension Quiz',
      subjectId: 5, // English
      gradeLevel: 5,
      questionCount: 8,
      durationMinutes: 20,
      isCompleted: true,
      score: 92,
    },
  ];
  
  // Sample active quiz (for the top panel)
  const sampleActiveQuiz = {
    id: 1,
    title: 'Mathematics Quiz: Fractions',
    description: 'Test your understanding of fraction operations and concepts',
    timeMinutes: 10,
    questions: [
      {
        id: 1,
        text: 'What is the result of adding 1/4 and 2/4?',
        options: [
          { id: 'a', text: '1/2' },
          { id: 'b', text: '3/4' },
          { id: 'c', text: '3/8' },
          { id: 'd', text: '2/8' },
        ],
        correctOption: 'b',
      },
      // More questions would be here
    ],
  };
  
  const filteredQuizzes = sampleQuizzes.filter((quiz) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return !quiz.isCompleted;
    if (activeFilter === 'completed') return quiz.isCompleted;
    return true;
  });
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < sampleActiveQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };
  
  const readQuestionAloud = () => {
    const question = sampleActiveQuiz.questions[currentQuestion];
    const textToRead = `${question.text}. Options: ${question.options.map(opt => opt.text).join('. ')}`;
    speakText(textToRead);
  };
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
          {t('quizzes.title')}
        </h2>
        
        <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
          >
            {t('quizzes.all')}
          </Button>
          <Button
            variant={activeFilter === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('pending')}
          >
            {t('quizzes.pending')}
          </Button>
          <Button
            variant={activeFilter === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('completed')}
          >
            {t('quizzes.completed')}
          </Button>
        </div>
      </div>
      
      {/* Active Quiz Panel */}
      {activeQuiz ? (
        <Card className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-white">
                  {sampleActiveQuiz.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {sampleActiveQuiz.description}
                </p>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={readQuestionAloud}>
                  <span className="material-icons-round mr-1">volume_up</span>
                  {t('quizzes.readAloud')}
                </Button>
                <div className="ml-4 bg-primary-50 dark:bg-primary-900 px-3 py-1.5 rounded-lg flex items-center">
                  <span className="material-icons-round text-primary-600 dark:text-primary-400 mr-1">timer</span>
                  <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                    {sampleActiveQuiz.timeMinutes}:00 {t('quizzes.minutes')}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Current Question */}
            <div className="mb-8">
              <div className="mb-4">
                <h4 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 h-6 w-6 rounded-full flex items-center justify-center text-sm mr-2">
                    {currentQuestion + 1}
                  </span>
                  {sampleActiveQuiz.questions[currentQuestion].text}
                </h4>
              </div>
              
              <div className="space-y-3">
                {sampleActiveQuiz.questions[currentQuestion].options.map((option) => (
                  <QuizOption
                    key={option.id}
                    id={`option-${option.id}`}
                    name={`question-${sampleActiveQuiz.questions[currentQuestion].id}`}
                    value={option.id}
                    label={option.text}
                    selected={selectedOption === option.id}
                    onChange={handleOptionSelect}
                  />
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('quizzes.questionCounter', { 
                  current: currentQuestion + 1, 
                  total: sampleActiveQuiz.questions.length 
                })}
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  {t('quizzes.previous')}
                </Button>
                <Button
                  variant="default"
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                >
                  {t('quizzes.next')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
      
      {/* Quiz List */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-heading font-medium text-gray-900 dark:text-white">
            {t('quizzes.availableQuizzes')}
          </h3>
        </CardHeader>
        <CardContent>
          {filteredQuizzes.length > 0 ? (
            <div className="space-y-4">
              {filteredQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  title={quiz.title}
                  subjectId={quiz.subjectId}
                  gradeLevel={quiz.gradeLevel}
                  questionCount={quiz.questionCount}
                  durationMinutes={quiz.durationMinutes}
                  isCompleted={quiz.isCompleted}
                  score={quiz.score}
                  compact={true}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <span className="material-icons-round text-gray-400 text-5xl mb-4">quiz</span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('quizzes.noQuizzes')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {t('quizzes.noQuizzesDesc')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
