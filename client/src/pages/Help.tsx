import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { fadeIn, slideInUp } from '@/lib/animations';

export default function Help() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample FAQs
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click on 'Forgot Password'. Enter your email address, and we'll send you a password reset link."
    },
    {
      question: "How can I change my language settings?",
      answer: "You can change your language by clicking on the language selector in the header or by going to Settings > Accessibility > Change Language."
    },
    {
      question: "Can I download content for offline learning?",
      answer: "Yes, on any course page, look for the download icon next to the lessons you want to save for offline access."
    },
    {
      question: "How does the voice assistant work?",
      answer: "The voice assistant can be activated from the dashboard. It allows you to navigate the platform, search for courses, and get answers to your questions using voice commands."
    },
    {
      question: "What do I do if a course video isn't playing?",
      answer: "First, check your internet connection. If the problem persists, try refreshing the page or using a different browser. You can also report the issue through the feedback form."
    },
    {
      question: "How are achievements earned?",
      answer: "Achievements are awarded for completing courses, maintaining study streaks, scoring well on quizzes, and other learning milestones."
    },
  ];
  
  // Filter FAQs based on search query
  const filteredFAQs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : faqs;
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Handle contact form changes
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle contact form submission
  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to a backend API
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message (would use toast in real app)
    alert('Your message has been sent. We will get back to you soon!');
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
          {t('profile.help')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions or contact our support team.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideInUp}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  {t('profile.faq')}
                </CardTitle>
                <div className="mt-4">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search FAQs..."
                    className="w-full"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 dark:border-gray-700 rounded-lg px-4">
                        <AccordionTrigger className="text-base font-medium py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
                      <p className="text-sm mt-2">Try different keywords or contact support for assistance.</p>
                    </div>
                  )}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideInUp}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading">
                  {t('profile.contactSupport')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitContactForm} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactFormChange}
                      placeholder="Enter subject"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      placeholder="How can we help you?"
                      required
                      className="resize-none"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Other Ways to Reach Us</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="material-icons-round text-primary-600 dark:text-primary-400 mr-3">email</span>
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">support@vidyai.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="material-icons-round text-primary-600 dark:text-primary-400 mr-3">phone</span>
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">+91 800-123-4567 (Mon-Fri, 9am-5pm)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="material-icons-round text-primary-600 dark:text-primary-400 mr-3">chat</span>
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Available in the app (Click the chat icon)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}