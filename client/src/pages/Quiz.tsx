import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { QuizOption } from '@/components/shared/QuizOption';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { speakText } from '@/utils/speechUtils';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, ChevronLeft, ChevronRight, Clock, Volume2 } from 'lucide-react';
import { fadeIn } from '@/lib/animations';

interface QuizProps {
  id: string;
}

export default function Quiz({ id }: QuizProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, string>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    correctAnswers: number[];
    incorrectAnswers: number[];
  } | null>(null);
  
  // Fetch quiz data
  const { data: quiz, isLoading, error } = useQuery({
    queryKey: [`/api/quizzes/${id}`],
  });
  
  // Sample quiz data (in a real app, this would come from the API)
  const sampleQuiz = {
    id: 1,
    title: 'Mathematics Quiz: Fractions',
    description: 'Test your understanding of fraction operations and concepts',
    subjectId: 1, // Mathematics
    gradeLevel: 5,
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
        explanation: 'When adding fractions with the same denominator, you simply add the numerators and keep the denominator the same. So 1/4 + 2/4 = (1+2)/4 = 3/4.',
      },
      {
        id: 2,
        text: 'Which fraction is equivalent to 0.5?',
        options: [
          { id: 'a', text: '1/5' },
          { id: 'b', text: '5/10' },
          { id: 'c', text: '1/2' },
          { id: 'd', text: '2/5' },
        ],
        correctOption: 'c',
        explanation: '0.5 is equal to 5/10, which simplifies to 1/2.',
      },
      {
        id: 3,
        text: 'What is 2/3 of 18?',
        options: [
          { id: 'a', text: '6' },
          { id: 'b', text: '9' },
          { id: 'c', text: '12' },
          { id: 'd', text: '13' },
        ],
        correctOption: 'c',
        explanation: 'To find 2/3 of 18, multiply 18 by 2/3. 18 × 2/3 = 12.',
      },
      {
        id: 4,
        text: 'Which fraction is greater than 3/4?',
        options: [
          { id: 'a', text: '5/8' },
          { id: 'b', text: '7/10' },
          { id: 'c', text: '4/5' },
          { id: 'd', text: '2/3' },
        ],
        correctOption: 'c',
        explanation: 'Converting to a common denominator of 20: 3/4 = 15/20, 5/8 = 12.5/20, 7/10 = 14/20, 4/5 = 16/20, 2/3 = 13.33/20. Therefore 4/5 is the greatest.',
      },
      {
        id: 5,
        text: 'What is the result of (1/2) ÷ (1/4)?',
        options: [
          { id: 'a', text: '1/8' },
          { id: 'b', text: '1/2' },
          { id: 'c', text: '2' },
          { id: 'd', text: '4' },
        ],
        correctOption: 'c',
        explanation: 'When dividing fractions, multiply by the reciprocal. So (1/2) ÷ (1/4) = (1/2) × (4/1) = 4/2 = 2.',
      },
    ],
  };
  
  // Timer effect
  useEffect(() => {
    if (quizComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizComplete]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setAnsweredQuestions({
      ...answeredQuestions,
      [currentQuestionIndex]: optionId,
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(answeredQuestions[currentQuestionIndex + 1] || null);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answeredQuestions[currentQuestionIndex - 1] || null);
    }
  };
  
  const readQuestionAloud = () => {
    const question = sampleQuiz.questions[currentQuestionIndex];
    const textToRead = `${question.text}. Options: ${question.options.map(opt => `${opt.id}, ${opt.text}`).join('. ')}`;
    speakText(textToRead);
    
    toast({
      title: t('quiz.textToSpeechActive'),
      description: t('quiz.listeningToQuestion'),
      duration: 3000,
    });
  };
  
  const handleSubmitQuiz = () => {
    setIsSubmitting(true);
    
    // In a real app, we would submit the answers to the API
    setTimeout(() => {
      const correctAnswers: number[] = [];
      const incorrectAnswers: number[] = [];
      
      // Calculate score
      let score = 0;
      sampleQuiz.questions.forEach((question, index) => {
        if (answeredQuestions[index] === question.correctOption) {
          score++;
          correctAnswers.push(index);
        } else {
          incorrectAnswers.push(index);
        }
      });
      
      const percentage = Math.round((score / sampleQuiz.questions.length) * 100);
      
      setResult({
        score,
        total: sampleQuiz.questions.length,
        percentage,
        correctAnswers,
        incorrectAnswers,
      });
      
      setQuizComplete(true);
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(answeredQuestions[index] || null);
  };
  
  const currentQuestion = sampleQuiz.questions[currentQuestionIndex];
  const progress = (Object.keys(answeredQuestions).length / sampleQuiz.questions.length) * 100;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">{t('quiz.loading')}</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          {t('quiz.errorLoading')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
          {t('quiz.errorDesc')}
        </p>
        <Button onClick={() => window.location.reload()}>
          {t('quiz.tryAgain')}
        </Button>
      </div>
    );
  }
  
  if (quizComplete && result) {
    return (
      <div className="max-w-3xl mx-auto" style={fadeIn}>
        <Card className="shadow-lg">
          <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
              {result.percentage >= 70 
                ? t('quiz.congratulations') 
                : t('quiz.quizCompleted')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {sampleQuiz.title}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className={`h-24 w-24 rounded-full flex items-center justify-center mb-4 ${
                result.percentage >= 70 
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                  : 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400'
              }`}>
                <span className="text-3xl font-bold">{result.percentage}%</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('quiz.yourScore')}: {result.score}/{result.total}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {result.percentage >= 70 
                  ? t('quiz.greatJob') 
                  : t('quiz.keepPracticing')}
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                {t('quiz.questionsSummary')}:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {t('quiz.correctAnswers')}
                    </h5>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {result.correctAnswers.length > 0 
                      ? result.correctAnswers.map(i => i + 1).join(', ') 
                      : t('quiz.none')}
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {t('quiz.incorrectAnswers')}
                    </h5>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {result.incorrectAnswers.length > 0 
                      ? result.incorrectAnswers.map(i => i + 1).join(', ') 
                      : t('quiz.none')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-200 dark:border-gray-700 flex justify-center p-4">
            <div className="space-x-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                {t('quiz.backToQuizzes')}
              </Button>
              <Button onClick={() => {
                setQuizComplete(false);
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                setAnsweredQuestions({});
                setResult(null);
                setTimeLeft(sampleQuiz.timeMinutes * 60);
              }}>
                {t('quiz.retakeQuiz')}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className="mb-2 bg-blue-500 hover:bg-blue-600">
                {t('subjects.mathematics')}
              </Badge>
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                {sampleQuiz.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {t('quiz.gradeLevel', { grade: sampleQuiz.gradeLevel })} • 
                {t('quiz.questions', { count: sampleQuiz.questions.length })}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <Button variant="ghost" size="sm" onClick={readQuestionAloud} className="mr-2">
                <Volume2 className="h-4 w-4 mr-1" />
                {t('quiz.readAloud')}
              </Button>
              <div className="flex items-center bg-amber-50 dark:bg-amber-900 dark:bg-opacity-20 px-3 py-1.5 rounded-lg">
                <Clock className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>{t('quiz.progress')}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sampleQuiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestionIndex === index ? "default" : 
                  answeredQuestions[index] ? "outline" : "ghost"}
                size="sm"
                className={`h-9 w-9 p-0 ${
                  answeredQuestions[index] && currentQuestionIndex !== index 
                    ? "border-primary-500 text-primary-600 dark:text-primary-400" 
                    : ""
                }`}
                onClick={() => handleJumpToQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          
          {/* Current Question */}
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 h-6 w-6 rounded-full flex items-center justify-center text-sm mr-2">
                  {currentQuestionIndex + 1}
                </span>
                {currentQuestion.text}
              </h3>
            </div>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <QuizOption
                  key={option.id}
                  id={`option-${currentQuestionIndex}-${option.id}`}
                  name={`question-${currentQuestionIndex}`}
                  value={option.id}
                  label={option.text}
                  selected={selectedOption === option.id}
                  onChange={handleOptionSelect}
                />
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-gray-200 dark:border-gray-700 flex justify-between p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('quiz.questionCounter', { 
              current: currentQuestionIndex + 1, 
              total: sampleQuiz.questions.length 
            })}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('quiz.previous')}
            </Button>
            
            {currentQuestionIndex === sampleQuiz.questions.length - 1 ? (
              <Button
                variant="default"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answeredQuestions).length !== sampleQuiz.questions.length || isSubmitting}
              >
                {isSubmitting ? t('quiz.submitting') : t('quiz.submitQuiz')}
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleNextQuestion}
              >
                {t('quiz.next')}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
