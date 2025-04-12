import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ThumbsUp, Heart, Share2, Users, Globe, BookOpen, Award, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, slideInUp } from '@/lib/animations';

// Mock community posts
const communityPosts = [
  {
    id: 1,
    author: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/150?img=29',
    content: 'Just finished my math exam with 92% score! Thank you VidyaAI++ for all the help with algebra problems!',
    likes: 24,
    comments: 5,
    timeAgo: '2h',
    subject: 'Mathematics',
    grade: '10',
  },
  {
    id: 2,
    author: 'Rahul Singh',
    avatar: 'https://i.pravatar.cc/150?img=12',
    content: 'Can someone help me understand photosynthesis better? I\'m struggling with the light-dependent reactions.',
    likes: 8,
    comments: 12,
    timeAgo: '5h',
    subject: 'Science',
    grade: '9',
  },
  {
    id: 3,
    author: 'Ananya Patel',
    avatar: 'https://i.pravatar.cc/150?img=37',
    content: 'Just earned the "Science Expert" badge after completing all biology quizzes! So happy with my progress.',
    likes: 36,
    comments: 8,
    timeAgo: '1d',
    subject: 'Science',
    grade: '11',
  },
  {
    id: 4,
    author: 'Vikram Mishra',
    avatar: 'https://i.pravatar.cc/150?img=15',
    content: 'Anyone else studying for the history exam next week? I\'ve created a study group meeting online tomorrow at 5pm.',
    likes: 15,
    comments: 20,
    timeAgo: '1d',
    subject: 'History',
    grade: '8',
  },
];

// Mock study groups
const studyGroups = [
  {
    id: 1,
    name: 'Algebra Masters',
    members: 32,
    subject: 'Mathematics',
    recentActivity: 'Active 2h ago',
    description: 'For students looking to master algebra concepts from grades 8-10',
  },
  {
    id: 2,
    name: 'Science Explorers',
    members: 48,
    subject: 'Science',
    recentActivity: 'Active 30m ago',
    description: 'Discussing concepts in biology, chemistry, and physics',
  },
  {
    id: 3,
    name: 'History Buffs',
    members: 18,
    subject: 'History',
    recentActivity: 'Active 5h ago',
    description: 'Deep discussions about historical events and their impact',
  },
  {
    id: 4,
    name: 'Language Arts Circle',
    members: 24,
    subject: 'English',
    recentActivity: 'Active 1d ago',
    description: 'Improving writing skills and literary analysis',
  },
];

// Community Post Component
const CommunityPost = ({ post }: { post: typeof communityPosts[0] }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.avatar} alt={post.author} />
            <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author}</div>
            <div className="text-sm text-muted-foreground">{post.timeAgo}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3">{post.content}</p>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/10">{post.subject}</Badge>
          <Badge variant="outline">Grade {post.grade}</Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0 border-t px-6 py-3">
        <div className="flex items-center gap-4 w-full">
          <Button variant="ghost" size="sm" className="flex gap-1 items-center">
            <ThumbsUp className="h-4 w-4" /> {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex gap-1 items-center">
            <MessageCircle className="h-4 w-4" /> {post.comments}
          </Button>
          <Button variant="ghost" size="sm" className="flex gap-1 items-center ml-auto">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Study Group Component
const StudyGroup = ({ group }: { group: typeof studyGroups[0] }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{group.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center text-sm gap-1">
            <Users className="h-4 w-4" /> {group.members} members
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{group.description}</p>
        <Badge variant="outline" className="bg-primary/10">{group.subject}</Badge>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-xs text-muted-foreground">{group.recentActivity}</div>
        <Button size="sm">Join Group</Button>
      </CardFooter>
    </Card>
  );
};

export default function Community() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [postContent, setPostContent] = useState('');
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would handle posting to the server
    setPostContent('');
    // For now, just clear the textarea
  };
  
  return (
    <motion.div 
      className="container max-w-6xl py-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Community</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User & Quick Actions */}
        <div className="hidden md:block">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.avatar || 'https://i.pravatar.cc/150?img=33'} />
                <AvatarFallback>{user?.fullName?.substring(0, 2) || 'U'}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-medium mb-1">{user?.fullName || "Student"}</h3>
              <p className="text-muted-foreground mb-4">Grade {user?.gradeLevel || 8} Student</p>
              
              <div className="grid grid-cols-3 w-full text-center gap-2 mb-4">
                <div className="p-2 border rounded-lg">
                  <div className="font-bold">12</div>
                  <div className="text-xs">Posts</div>
                </div>
                <div className="p-2 border rounded-lg">
                  <div className="font-bold">54</div>
                  <div className="text-xs">Friends</div>
                </div>
                <div className="p-2 border rounded-lg">
                  <div className="font-bold">3</div>
                  <div className="text-xs">Groups</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" /> Discover
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" /> My Groups
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" /> Study Resources
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Award className="mr-2 h-4 w-4" /> Achievements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Center Column - Feed */}
        <div className="md:col-span-2">
          <motion.div variants={slideInUp} className="mb-6">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handlePostSubmit}>
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={user?.avatar || 'https://i.pravatar.cc/150?img=33'} />
                      <AvatarFallback>{user?.fullName?.substring(0, 2) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Share something with the community..." 
                        className="mb-2 resize-none"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button type="button" size="sm" variant="outline">
                            Add Photo
                          </Button>
                          <Button type="button" size="sm" variant="outline">
                            Tag Subject
                          </Button>
                        </div>
                        <Button type="submit" size="sm" disabled={!postContent.trim()}>
                          <Send className="h-4 w-4 mr-1" /> Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          <Tabs defaultValue="feed">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="feed" className="flex-1">Feed</TabsTrigger>
              <TabsTrigger value="groups" className="flex-1">Study Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed">
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <motion.div key={post.id} variants={slideInUp}>
                    <CommunityPost post={post} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="groups">
              <div className="space-y-4">
                {studyGroups.map((group) => (
                  <motion.div key={group.id} variants={slideInUp}>
                    <StudyGroup group={group} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}