import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award, Star, TrendingUp, BookOpen, Brain, Zap, Medal, Clock, Target, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, slideInUp, scaleIn } from '@/lib/animations';
import { achievementsData, userAchievementsData } from '@/lib/data';

// Achievement Card Component
const AchievementCard = ({ 
  achievement, 
  earned = false, 
  progress = 0 
}: { 
  achievement: { 
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
    points: number;
  }; 
  earned?: boolean; 
  progress?: number;
}) => {
  // Map icons based on achievement icon string
  const iconMap: Record<string, React.ReactNode> = {
    'star': <Star className="h-5 w-5" />,
    'trending-up': <TrendingUp className="h-5 w-5" />,
    'book-open': <BookOpen className="h-5 w-5" />,
    'brain': <Brain className="h-5 w-5" />,
    'zap': <Zap className="h-5 w-5" />,
    'medal': <Medal className="h-5 w-5" />,
    'clock': <Clock className="h-5 w-5" />,
    'target': <Target className="h-5 w-5" />,
    'lightbulb': <Lightbulb className="h-5 w-5" />,
    'award': <Award className="h-5 w-5" />,
  };
  
  return (
    <motion.div variants={earned ? scaleIn : {}} className="h-full">
      <Card className={`h-full ${earned ? 'border-primary' : 'opacity-70'}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className={`p-2 rounded-lg ${earned ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              {iconMap[achievement.icon] || <Award className="h-5 w-5" />}
            </div>
            <Badge variant={earned ? "default" : "outline"}>
              {earned ? 'Earned' : 'In Progress'}
            </Badge>
          </div>
          <CardTitle className="text-lg mt-2">{achievement.name}</CardTitle>
          <CardDescription>{achievement.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          {!earned && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex items-center justify-between w-full">
            <Badge variant="outline" className="bg-primary/10">
              {achievement.category}
            </Badge>
            <div className="text-sm font-medium text-primary">
              {achievement.points} pts
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function Achievements() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  // Get user's earned achievements
  const earnedAchievements = userAchievementsData.filter(ua => ua.userId === (user?.id || 1));
  const earnedIds = earnedAchievements.map(a => a.achievementId);
  
  // Calculate total points
  const totalPoints = earnedAchievements.reduce((sum, ua) => {
    const achievement = achievementsData.find(a => a.id === ua.achievementId);
    return sum + (achievement?.points || 0);
  }, 0);
  
  // Group achievements by category
  const categories = [...new Set(achievementsData.map(a => a.category))];
  
  return (
    <motion.div 
      className="container max-w-6xl py-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Track your learning milestones and earn rewards</p>
        </div>
        
        <Card className="md:w-72">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Points</div>
                <div className="text-2xl font-bold">{totalPoints}</div>
              </div>
            </div>
            <div className="text-lg font-medium border-l pl-3">
              {earnedAchievements.length}/{achievementsData.length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Achievement Level Progress */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Achievement Level</h2>
              <div className="flex justify-between text-sm mb-1">
                <span>Level {Math.floor(totalPoints / 500) + 1}</span>
                <span>
                  {totalPoints % 500} / 500 points to next level
                </span>
              </div>
              <Progress value={(totalPoints % 500) / 5} className="h-3" />
            </div>
            <div className="flex gap-3">
              <Button>View Leaderboard</Button>
              <Button variant="outline">Share Progress</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Achievements By Category */}
      <div className="space-y-8">
        {categories.map(category => (
          <motion.div key={category} variants={slideInUp}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5" /> {category} Achievements
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {achievementsData
                .filter(a => a.category === category)
                .map(achievement => {
                  const earned = earnedIds.includes(achievement.id);
                  // Calculate random progress for non-earned achievements
                  const progress = earned ? 100 : Math.floor(Math.random() * 85);
                  
                  return (
                    <AchievementCard 
                      key={achievement.id} 
                      achievement={achievement} 
                      earned={earned}
                      progress={progress}
                    />
                  );
                })
              }
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}