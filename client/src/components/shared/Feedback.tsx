import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type FeedbackType = 'issue' | 'suggestion' | 'question' | 'praise';

export function FeedbackButton() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg"
        >
          <span className="material-icons-round text-primary-600 mr-2">feedback</span>
          {t('feedback.giveFeedback')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('feedback.title')}</DialogTitle>
        </DialogHeader>
        <FeedbackForm onSubmitSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

interface FeedbackFormProps {
  onSubmitSuccess?: () => void;
}

export function FeedbackForm({ onSubmitSuccess }: FeedbackFormProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('suggestion');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSubmitting(true);

    try {
      // In a real app, this would submit to an API endpoint
      // await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     text: feedbackText,
      //     type: feedbackType,
      //     userId: user?.id
      //   })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('feedback.thankYou'),
        description: t('feedback.submitted'),
      });
      
      setFeedbackText('');
      setFeedbackType('suggestion');
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: t('feedback.error'),
        description: t('feedback.errorSubmitting'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>{t('feedback.feedbackType')}</Label>
          <RadioGroup value={feedbackType} onValueChange={(value) => setFeedbackType(value as FeedbackType)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="issue" id="issue" />
              <Label htmlFor="issue" className="text-sm font-normal">
                {t('feedback.issue')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="suggestion" id="suggestion" />
              <Label htmlFor="suggestion" className="text-sm font-normal">
                {t('feedback.suggestion')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="question" id="question" />
              <Label htmlFor="question" className="text-sm font-normal">
                {t('feedback.question')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="praise" id="praise" />
              <Label htmlFor="praise" className="text-sm font-normal">
                {t('feedback.praise')}
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="feedback">{t('feedback.yourFeedback')}</Label>
          <Textarea
            id="feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder={t('feedback.feedbackPlaceholder')}
            className="min-h-[100px]"
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="material-icons-round animate-spin mr-2">refresh</span>
              {t('feedback.submitting')}
            </>
          ) : (
            t('feedback.submit')
          )}
        </Button>
      </div>
    </form>
  );
}

export function FeedbackCard() {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <h3 className="text-lg font-medium">{t('feedback.helpUsImprove')}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {t('feedback.shareYourThoughts')}
        </p>
        <FeedbackForm />
      </CardContent>
    </Card>
  );
}