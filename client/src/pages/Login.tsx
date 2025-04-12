import React, { useState } from 'react';
import { Link } from 'wouter';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { FaGoogle, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Login() {
  const { login, register, loginWithProvider } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form validation schema
  const loginSchema = z.object({
    username: z.string().min(1, t('login.validation.username')),
    password: z.string().min(1, t('login.validation.password')),
    rememberMe: z.boolean().optional(),
  });

  // Register form validation schema
  const registerSchema = z.object({
    fullName: z.string().min(1, t('register.validation.fullName')),
    username: z.string().min(3, t('register.validation.username')),
    email: z.string().email(t('register.validation.email')),
    password: z.string().min(6, t('register.validation.password')),
    gradeLevel: z.number().min(1).max(12).optional(),
  });

  // Create form hooks
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      gradeLevel: 5,
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    await login(values.username, values.password);
  };

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    await register(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {availableLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          <span className="material-icons-round text-gray-800 dark:hidden">dark_mode</span>
          <span className="material-icons-round text-gray-200 hidden dark:block">light_mode</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Left side - Educational image */}
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
          <div className="relative z-20 flex flex-col h-full justify-center items-center p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Empower your education journey</h2>
            <p className="text-lg mb-8 text-white/90">A personalized learning experience with AI assistance in your preferred language.</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">12+</div>
                <div className="text-sm">Languages</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Courses</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">100K+</div>
                <div className="text-sm">Students</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Auth forms */}
        <div className="w-full p-6">
          <div className="max-w-md mx-auto">
            <div className="pt-10 pb-4 text-center">
              <h1 className="text-3xl font-heading font-bold text-gray-900 flex items-center justify-center">
                <span className="material-icons-round text-4xl mr-2 text-primary-600">school</span>
                VidyAI++
              </h1>
              <p className="text-gray-600 mt-2">Multilingual AI Tutoring Platform</p>
            </div>
            
            <Card className="border-0 shadow-none bg-white">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">{t('login.signIn')}</TabsTrigger>
                    <TabsTrigger value="register">{t('login.signUp')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('login.username')}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t('login.usernamePlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('login.password')}</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder={t('login.passwordPlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center justify-between">
                          <FormField
                            control={loginForm.control}
                            name="rememberMe"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm cursor-pointer">
                                  {t('login.rememberMe')}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          <Button variant="link" className="p-0 h-auto text-sm font-medium text-primary-600">
                            {t('login.forgotPassword')}
                          </Button>
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                          {loginForm.formState.isSubmitting ? t('login.signingIn') : t('login.signIn')}
                        </Button>
                      </form>
                    </Form>
                    
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            {t('login.orContinueWith')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <Button
                          variant="outline"
                          onClick={() => loginWithProvider('google')}
                          type="button"
                        >
                          <FaGoogle className="mr-2" />
                          Google
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => loginWithProvider('twitter')}
                          type="button"
                        >
                          <FaTwitter className="mr-2" />
                          Twitter
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => loginWithProvider('facebook')}
                          type="button"
                        >
                          <FaFacebook className="mr-2" />
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('register.fullName')}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t('register.fullNamePlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('register.username')}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t('register.usernamePlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('register.email')}</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder={t('register.emailPlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('register.password')}</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder={t('register.passwordPlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="gradeLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('register.gradeLevel')}</FormLabel>
                              <FormControl>
                                <select
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={field.value}
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                >
                                  {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                                    <option key={grade} value={grade}>{t('register.grade')} {grade}</option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full mt-6" disabled={registerForm.formState.isSubmitting}>
                          {registerForm.formState.isSubmitting ? t('register.creatingAccount') : t('register.createAccount')}
                        </Button>
                      </form>
                    </Form>
                    
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            {t('register.orContinueWith')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <Button
                          variant="outline"
                          onClick={() => loginWithProvider('google')}
                          type="button"
                        >
                          <FaGoogle className="mr-2" />
                          Google
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => loginWithProvider('twitter')}
                          type="button"
                        >
                          <FaTwitter className="mr-2" />
                          Twitter
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => loginWithProvider('facebook')}
                          type="button"
                        >
                          <FaFacebook className="mr-2" />
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}