import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertCourseSchema, insertLessonSchema, insertQuizSchema, insertQuizQuestionSchema, insertQuizResultSchema, insertUserProgressSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix with /api
  
  // Authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: 'Failed to create user' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // In a real app, you would set up a session here
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    // In a real app, you would destroy the session here
    res.status(200).json({ message: 'Logged out successfully' });
  });

  app.get('/api/auth/status', (req, res) => {
    // In a real app, you would check session here
    res.status(401).json({ message: 'Not authenticated' });
  });

  // Subjects
  app.get('/api/subjects', async (req, res) => {
    try {
      const subjects = await storage.getAllSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch subjects' });
    }
  });

  // Courses
  app.get('/api/courses', async (req, res) => {
    try {
      const { subjectId, gradeLevel } = req.query;
      let courses;
      
      if (subjectId && gradeLevel) {
        courses = await storage.getCoursesBySubjectAndGrade(Number(subjectId), Number(gradeLevel));
      } else if (subjectId) {
        courses = await storage.getCoursesBySubject(Number(subjectId));
      } else if (gradeLevel) {
        courses = await storage.getCoursesByGrade(Number(gradeLevel));
      } else {
        courses = await storage.getAllCourses();
      }
      
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch courses' });
    }
  });

  app.get('/api/courses/recommended', async (req, res) => {
    try {
      // In a real app, this would use user preferences and history
      const featuredCourses = await storage.getFeaturedCourses();
      res.json(featuredCourses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch recommended courses' });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourse(courseId);
      
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch course' });
    }
  });

  // Lessons
  app.get('/api/courses/:courseId/lessons', async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const lessons = await storage.getLessonsByCourse(courseId);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch lessons' });
    }
  });

  app.get('/api/lessons/:id', async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const lesson = await storage.getLesson(lessonId);
      
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch lesson' });
    }
  });

  // User Progress
  app.get('/api/progress', async (req, res) => {
    try {
      // In a real app, user would come from session/token
      const userId = 1; // Mock user ID
      const progress = await storage.getUserProgressByUser(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch progress' });
    }
  });

  app.post('/api/progress', async (req, res) => {
    try {
      const progressData = insertUserProgressSchema.parse(req.body);
      const progress = await storage.createOrUpdateUserProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: 'Failed to update progress' });
    }
  });

  // Quizzes
  app.get('/api/quizzes', async (req, res) => {
    try {
      const { subjectId, gradeLevel } = req.query;
      let quizzes;
      
      if (subjectId && gradeLevel) {
        quizzes = await storage.getQuizzesBySubjectAndGrade(Number(subjectId), Number(gradeLevel));
      } else if (subjectId) {
        quizzes = await storage.getQuizzesBySubject(Number(subjectId));
      } else if (gradeLevel) {
        quizzes = await storage.getQuizzesByGrade(Number(gradeLevel));
      } else {
        quizzes = await storage.getAllQuizzes();
      }
      
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quizzes' });
    }
  });

  app.get('/api/quizzes/:id', async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const quiz = await storage.getQuiz(quizId);
      
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      // Get questions for the quiz
      const questions = await storage.getQuizQuestions(quizId);
      
      res.json({
        ...quiz,
        questions
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quiz' });
    }
  });

  app.post('/api/quizzes/:id/submit', async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const { userId, answers } = req.body;
      
      // Validate the quiz submission data
      if (!userId || !Array.isArray(answers)) {
        return res.status(400).json({ message: 'Invalid submission data' });
      }
      
      // Get quiz questions to calculate score
      const questions = await storage.getQuizQuestions(quizId);
      
      if (!questions.length) {
        return res.status(404).json({ message: 'Quiz questions not found' });
      }
      
      // Calculate score
      let score = 0;
      const incorrectQuestions: number[] = [];
      
      answers.forEach((answer: any, index: number) => {
        const question = questions[index];
        if (question && answer.optionId === question.correctOptionIndex) {
          score++;
        } else if (question) {
          incorrectQuestions.push(question.id);
        }
      });
      
      const percentageScore = Math.round((score / questions.length) * 100);
      
      // Save quiz result
      const quizResult = await storage.createQuizResult({
        userId,
        quizId,
        score: percentageScore,
        incorrectQuestions: incorrectQuestions,
        timeTakenSeconds: req.body.timeTaken || 0
      });
      
      res.status(201).json({
        score: percentageScore,
        totalQuestions: questions.length,
        correctAnswers: score,
        incorrectQuestions,
        result: quizResult
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit quiz' });
    }
  });

  // Achievements
  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch achievements' });
    }
  });

  app.get('/api/achievements/recent', async (req, res) => {
    try {
      // In a real app, user would come from session/token
      const userId = 1; // Mock user ID
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch achievements' });
    }
  });

  // User stats
  app.get('/api/user/stats', async (req, res) => {
    try {
      // In a real app, user would come from session/token
      const userId = 1; // Mock user ID
      
      // Get user progress data
      const progress = await storage.getUserProgressByUser(userId);
      
      // Get quiz results
      const quizResults = await storage.getUserQuizResults(userId);
      
      // Calculate stats
      const coursesCompleted = progress.filter(p => p.completed).length;
      const coursesInProgress = progress.filter(p => !p.completed && p.percentComplete > 0).length;
      const quizzesCompleted = quizResults.length;
      
      // In a real app, these would be calculated from actual data
      const totalLessonTime = 1240; // in minutes
      const longestStreak = 14; // days
      const currentStreak = 7; // days
      
      res.json({
        quizzesCompleted,
        coursesCompleted,
        coursesInProgress,
        totalLessonTime,
        longestStreak,
        currentStreak
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user stats' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
